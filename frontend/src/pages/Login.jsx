import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('Đăng Nhập');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

  }

  return (
    <form onSubmit={onSubmitHandler()} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === 'Đăng Nhập' ? '' : <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Tên người dùng' required/>}
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Mật khẩu' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Quên mật khẩu ?</p>
        {
          currentState === 'Đăng Nhập' 
          ? <p onClick={() => setCurrentState('Đăng Ký')} className='cursor-pointer'>Tạo tài khoản</p> 
          : <p onClick={() => setCurrentState('Đăng Nhập')} className='cursor-pointer'>Đăng nhập</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState}</button>
    </form>
  )
}

export default Login