'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import AuthModalInputs from './AuthModalInputs'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const renderContent = (signInContent: string, signUpContent: string) => {
    return isSignIn ? signInContent : signUpContent
  }
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
  }
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    password: '',
  })

  return (
    <div>
      <button
        className={`${renderContent('bg-blue-400 text-white', '')}
        border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {renderContent('Sign in', 'Sign up')}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='p-2'>
            <div className='uppercase font-bold text-center pb-2 border-b mb-2'>
              <p className='text-sm'>
                {renderContent('Sign In ', 'Create Account')}
              </p>
            </div>

            <AuthModalInputs
              isSignIn={isSignIn}
              inputs={inputs}
              handleChange={handleChangeInput}
            />
            <button className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'>
              {renderContent('Sign In', 'Create Account')}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
