import { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import * as jose from 'jose'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, city, password } = req.body
    const errors: string[] = []
    const validationSchema = [
      {
        valid: validator.isLength(firstName, { min: 2, max: 15 }),
        errorMessage: 'First name must be between 3 and 15 characters',
      },
      {
        valid: validator.isLength(lastName, { min: 1, max: 15 }),
        errorMessage: 'Last name must be between 3 and 15 characters',
      },
      {
        valid: validator.isEmail(email),
        errorMessage: 'Email is invalid',
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: 'Phone number is invalid',
      },
      {
        valid: validator.isLength(city, { min: 2, max: 15 }),
        errorMessage: 'City is invalid',
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: 'Password is not strong enough',
      },
    ]
    validationSchema.forEach((item) => {
      if (!item.valid) {
        errors.push(item.errorMessage)
      }
    })
    if (errors.length > 0) {
      res.status(400).json({ errorMessage: errors[0] })
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (user) {
      return res
        .status(400)
        .json({ errorMessage: `User with email: ${user.email} already exists` })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        city,
        password: hashedPassword,
      },
    })
    const algorithm = 'HS256'
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const token = await new jose.SignJWT({ email: newUser.email })
      .setProtectedHeader({ alg: algorithm })
      .setExpirationTime('24h')
      .sign(secret)

    return res.status(200).json({ token })
  }
  return res.status(404).json({ errorMessage: 'Unknown endpoint' })
}
