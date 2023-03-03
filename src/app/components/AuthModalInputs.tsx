interface Props {
  isSignIn: boolean
  inputs: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    city: string
    password: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AuthModalInputs({
  isSignIn,
  inputs,
  handleChange,
}: Props) {
  return (
    <div>
      {isSignIn ? null : (
        <div className='my-3 flex justify-between text-sm'>
          <input
            type='text'
            className='border rounded p-2 py-3 w-[49%]'
            placeholder='Firs Name'
            value={inputs.firstName}
            name='firstName'
            onChange={handleChange}
          />
          <input
            type='text'
            className='border rounded p-2 py-3 w-[49%]'
            placeholder='Last Name'
            value={inputs.lastName}
            name='lastName'
            onChange={handleChange}
          />
        </div>
      )}

      <div className='my-3 flex justify-between text-sm'>
        <input
          type='email'
          className='border rounded p-2 py-3 w-full'
          placeholder='Email'
          value={inputs.email}
          name='email'
          onChange={handleChange}
        />
      </div>
      {isSignIn ? null : (
        <div className='my-3 flex justify-between text-sm'>
          <input
            type='text'
            className='border rounded p-2 py-3 w-[49%]'
            placeholder='Phone Number'
            value={inputs.phoneNumber}
            name='phoneNumber'
            onChange={handleChange}
          />
          <input
            type='text'
            className='border rounded p-2 py-3 w-[49%]'
            placeholder='City'
            value={inputs.city}
            name='city'
            onChange={handleChange}
          />
        </div>
      )}

      <div className='my-3 flex justify-between text-sm'>
        <input
          type='password'
          className='border rounded p-2 py-3 w-full'
          placeholder='Password'
          value={inputs.password}
          name='password'
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
