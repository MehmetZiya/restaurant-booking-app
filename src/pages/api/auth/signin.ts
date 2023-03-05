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
    const errors: string[] = []
    const { email, password } = req.body

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: 'Email is invalid',
      },
      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: 'Password is invalid',
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
    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: `User with email: ${email} does not exist` })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ errorMessage: 'Password is incorrect' })
    }
    const algorithm = 'HS256'
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg: algorithm })
      .setExpirationTime('24h')
      .sign(secret)

    return res.status(200).json({ token })
  }
  return res.status(404).json({ errorMessage: 'Unknown endpoint' })
}
