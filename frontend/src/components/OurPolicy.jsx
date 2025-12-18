import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:tex-sm md:text-base text-gray-700'>
        <div className=''>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Dễ dàng đổi trả.</p>
            <p className='text-gray-400'>Chính sách đổi trả nhanh chóng, không phiền hà.</p>
        </div>
        <div className=''>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>7 ngày đổi trả.</p>
            <p className='text-gray-400'>Miễn phí trả hàng trong 7 ngày.</p>
        </div>
        <div className=''>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Hỗ trợ khách hàng tận tâm.</p>
            <p className='text-gray-400'>Dịch vụ hỗ trợ khách hàng hoạt động 24/7.</p>
        </div>
    </div>
  )
}

export default OurPolicy