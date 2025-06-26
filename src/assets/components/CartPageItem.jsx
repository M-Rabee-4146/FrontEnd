import React from 'react'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

const CartPageItem = ({id, image, name, email, verified, active,user }) => {
    // const dispatch = useDispatch()
    return (
        <tbody className='border-y  border-y-gray-300'>
            <tr onClick={user} className='py-3'>
                <td className='flex justify-center items-center'>

                    <div className="img size-12 overflow-hidden rounded-full">
                        {image ? <img className="object-cover object-center w-full h-full" src={`http://localhost:3031/User_dp/${image}`} alt="" /> : <img className="object-cover object-center w-full h-full" src={`http://localhost:3031/User_dp/Default.jpg`} alt="" />}
                    </div>
                </td>
                <td className=''>
                    <div className="product w-full min-h-max  max-h-52 py-3 px-1 flex justify-center ">
                        <div className="txt  px-2 ">
                            <h1 className=" mb-2 text-gray-700 font-semibold ">{name}  </h1>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="px-2 py-2 flex flex-col  items-center">
                        <p className="leading-relaxed mx-1 text-gray-700 font-semibold ">{email}</p>
                        {/* <del className="leading-relaxed mx-1 text-gray-500 font-normal">Rs.{(pricedis)}</del> */}
                    </div>
                </td>
                <td>   <div className="qty flex items-center justify-center">
                    {verified==false?'False':'True'}
                </div>
                </td>
                <td>
                    <div className="total-price flex justify-center items-center">
                        <h1>{active == 'Null' ? 'Waiting' : active == 'false' ? 'Rejected' : 'Accepted'}</h1>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default CartPageItem
