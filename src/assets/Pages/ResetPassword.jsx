import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosinstance from '../axios/axios.js'

const ResetPassword = () => {
    const { Token } = useParams('')
    // const [newpassword, setPassword] = useState('')
    const [formdata,setformdata]=useState({newpassword:''})
    const navigate=useNavigate()
    
    useEffect(()=>{
        setformdata((formdata)=>({...formdata,Token:Token}))
    },[])
    const ResetHandler = async(e) => {
        e.preventDefault();
        console.log(formdata)
       await axiosinstance.post(`/Reset-Password`,formdata)
       .then((res) => {
           toast.success(res.data.message)
        setTimeout(() => {
            navigate('/login')
        }, 1000);
    })
       .catch((err) => {
            toast.error(err.response.data.message)
            console.log(err)
        })
        console.log(formdata)
        // setPassword('')
    }
    return (
        <div className=' md:bg-[#faf9f5] bg-white'>
            <div className="min-h-screen flex flex-row items-center justify-center lg:container md:px-5 mx-auto ">
            <ArrowLeftIcon onClick={()=>{navigate('/login')}} className='absolute size-4 lg:size-5 lg:left-10 lg:top-10 left-7 top-7 hover:text-green-600'/>
            <h1 className='absolute min-w-max lg:size-5 lg:right-10 lg:top-10 right-7 top-7 hover:text-green-600'>Step - 2</h1>
                <div className="text mx-5 w-full hidden lg:flex flex-col">
                    <h1 className='text-green-500 text-8xl -mb-3 font-qurova  ' >LearnerO</h1>
                    <h2 className='text-4xl text-gray-800  font-semibold '>Live life of a Learner</h2>
                </div>
                <motion.div
                    key={'form2'}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className="md:bg-white md:shadow-2xl p-8 rounded-lg md:border border-gray-200 w-full lg:mr-20 max-w-[450px] max-h-[600px]">
                    <h1 className='text-green-500 text-4xl mb-4 font-qurova lg:hidden text-center ' >LearnerO</h1>
                    <h2 className="text-2xl font-bold text-center lg:block hidden text-gray-700 mb-6">Create New Password</h2>
                    {/* <h1 className="text-center mt-6 text-gray-500">Enter your email and we'll send you a link to get back into your account.</h1> */}

                    <form onSubmit={ResetHandler} className="space-y-6 mt-5">

                        <div>
                            <input
                                id="password"
                                type="password"
                                placeholder='New Password'
                                name='newpassword'
                                value={formdata.newpassword}
                                onChange={(e) => {setformdata((formdata)=>({...formdata,[e.target.name]:e.target.value}))
                                    console.log(formdata)
                                }}
                                required
                                className="w-full px-4 py-3 rounded-md border bg-gray-100 border-transparent focus:border-green-500 focus:bg-white focus:outline-none focus:border font-semibold text-sm"
                            />
                        </div>

                        <div class Name="btn">

                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-4 rounded-md transition duration-200 h-9"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-6 text-gray-500">
                        Go Back ?{" "}
                        <Link to={'/Login'} className="text-green-500 hover:underline">
                            Sign In
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ResetPassword
