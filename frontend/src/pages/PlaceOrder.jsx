import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { data } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {navigate, backendUrl, token, cartItems, setCartItem, getCartAmount, delivery_fee, products} = useContext(ShopContext);
  const [fromData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    district: '',
    city: '',
    note: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({...data, [name]: value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for(const items in  cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if(itemInfo){
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: fromData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch(method){
        case "cod":
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}});
          if (response.data.success) {
            setCartItem({});
            navigate('/orders');
          }
          else{
            toast.error(response.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-center gap-28 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'THÔNG TIN'} text2={'GIAO HÀNG'}/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={fromData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Họ'/>
          <input required onChange={onChangeHandler} name='lastName' value={fromData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Tên'/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={fromData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email'/>
        <input required onChange={onChangeHandler} name='phone' value={fromData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Số điện thoại'/>
        <input required onChange={onChangeHandler} name='street' value={fromData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Đường'/>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='district' value={fromData.district} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Quận'/>
          <input required onChange={onChangeHandler} name='city' value={fromData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Thành phố'/>
        </div>
        <textarea required onChange={onChangeHandler} name='note' value={fromData.note} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' id="" placeholder='Ghi chú'>

        </textarea>
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-7'>
          <Title text1={'PHƯƠNG THỨC'} text2={'THANH TOÁN'}/>
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>THANH TOÁN KHI NHẬN HÀNG</p>
            </div>
          </div>
          <div className='w-full text-center mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm w-full'>ĐẶT HÀNG</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder