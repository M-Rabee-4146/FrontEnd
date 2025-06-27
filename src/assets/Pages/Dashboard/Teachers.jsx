import React, { act, useEffect, useState } from 'react'
import CartPageItem from '../../components/CartPageItem'
import axios from 'axios'
import toast from 'react-hot-toast'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useOutletContext } from 'react-router-dom'
import axiosinstance from '../../axios/axios'
const Teachers = () => {
    const {setBackdrop}=useOutletContext()
   const [users, setUsers] = useState([])
    const [slcUser, setslcUser] = useState('')
    const [formdata,setformdata]=useState({})
    const[active,setactive]=useState()
  
    useEffect(() => {
      axiosinstance.get('/Users').then((res) => {
        setUsers(res.data.users)
        // console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },)
    // console.log(users)
    const Teachers = users.filter((data) => data.role == 'Teacher')
    
    const user = (id) => {
      const foundUser = users.find((u) => u._id === id);
      // console.log('selected User', foundUser)
      setslcUser(foundUser);
    };
    if (slcUser) {
      setBackdrop(true)
    }
    
    const changeHandler=(e)=>{
      setformdata((formdata)=>({...formdata,id:slcUser._id,is_active:e.target.value}))
      // console.log(active)
    }
    const Formhandler=(e)=>{
      e.preventDefault();
      // console.log(formdata)
      axiosinstance.post('/update_user',formdata).then((res) => {
       toast.success(res.data.message)
      }).catch((err) => {
        toast.error(err.message)
      })
    }
  
  return (
    <div>
        {Teachers != [] && <div className="cart flex flex-col items-cente justify-center mt-4 w-[300px] sm:w-full">
        <h1 className=' text-2xl font-qurova text-green-500 mx-3'>Teachers</h1>

        <div className="table_parent w-full mb-5 overflow-x-auto">
          <table className='w-full'>
            <thead>
              <tr >
                <th className='lg:min-w-20  min-w-24 text-gray-700 font-bold '>
                  Profile
                </th>
                <th className='lg:px-12   min-w-24 h-12 text-gray-700 font-bold'>
                  Name
                </th>
                <th className='lg:min-w-28  min-w-24 text-gray-700 font-bold'>
                  Email
                </th>
                <th className='lg:min-w-28  min-w-24 text-gray-700 font-bold'>
                  Verified
                </th>
                <th className='lg:min-w-28  min-w-24 text-gray-700 font-bold'>
                  Active
                </th>
              </tr>
            </thead>
            {Teachers.map((item) => (


              <CartPageItem
                id={item._id}
                // slc={setselected}
                user={() => user(item._id)}
                name={item.name}
                email={item.email}
                verified={item.is_verified}
                active={item.is_active}
                image={item.userprofile}
              />))}

          </table>
        </div>
      </div>}
       {slcUser  && (
              <div className="selected-user bg-white p-4 border rounded-2xl border-green-600 md:w-[500px] w-[270px] max-h-[500px] z-40 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute">
                 <XMarkIcon className='size-5 absolute top-[10px] right-[10px]' onClick={() => { setslcUser(); setBackdrop(false) }}/>
                <div className="flex justify-center items-center">
      
                <div className="img md:size-[200px] size-[100px] overflow-hidden rounded-full flex ">
                              {slcUser.userprofile ? <img className="object-cover object-center w-full h-full" src={`https://learnero-backend-production.up.railway.app/User_dp/${slcUser.userprofile}`} alt="" /> : <img className="object-cover object-center w-full h-full" src={`https://learnero-backend-production.up.railway.app/User_dp/Default.jpg`} alt="" />}
                          </div>
                </div>
                <h2 className="text-xl font-bold text-green-600 text-center">{slcUser.name}</h2>
                <h2 className="text-lg font-bold text-gray-600 text-center">{slcUser.email}</h2>
      <div className="flex mt-3">
                <div name={'Role'} className="email md:mx-2 ml-1 w-full px-4 py-3 h-12 rounded-md border bg-gray-100  border-green-500 font-semibold text-sm">{slcUser.role}</div>
      
                <div name={'Verified'} className={`email md:mx-2 ml-1 w-full px-4 py-3 h-12 rounded-md ${slcUser.is_verified==false?' border-red-500':'border-green-500'} border bg-gray-100  font-semibold text-sm`}>{slcUser.is_verified==false?'Not Verified':'Verified'}</div>
      </div>
                <form onSubmit={Formhandler}  className="space-y-6 mt-1">
      
      <div>
                <label htmlFor="Active"  className='text-green-600   font-qurova'>Active:</label>
          <select
              id="Active"
              type="text"
              placeholder='Is Active..?'
              name='Active'
              onChange={changeHandler}
              // value={slcUser.is_active=='Null'?'Waiting':slcUser.is_active==false?'Rejected':'Active'}
              required
              className="w-full px-4 py-3 rounded-md border bg-gray-100 border-transparent focus:border-green-500 focus:bg-white focus:outline-none focus:border font-semibold text-sm"
          >
            <option selected disabled >{slcUser.is_active=='Null'?'Waiting':slcUser.is_active==false?'Rejected':'Active'}</option>
            <option  value="Null">Waiting</option>
            <option  value="false">Reject</option>
            <option  value="true">Active</option>
          </select>
      </div>
        <div className="btn">
      
          <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-4 rounded-md transition duration-200 h-9"
          >
              Update
          </button>
      </div>
      </form>
               
              </div>
            )}
    </div>
  )
}

export default Teachers
