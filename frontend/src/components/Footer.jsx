import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div className=''>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Có rất nhiều biến thể của Lorem Ipsum mà bạn có thể tìm thấy, nhưng đa số được biến đổi bằng cách thêm các yếu tố hài hước, các từ ngẫu nhiên có khi không có vẻ gì là có ý nghĩa.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>Doanh nghiệp</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Trang chủ</li>
                    <li>Về chúng tôi</li>
                    <li>Vận chuyển</li>
                    <li>Chính sách bảo mật</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>Liên hệ</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+84 379080740</li>
                    <li>luongducduy0906@gmail.com</li>
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ITLife.com = All Right Reserve</p>
        </div>
    </div>
  )
}

export default Footer