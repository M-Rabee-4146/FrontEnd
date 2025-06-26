import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Loading2 from '../components/Loading2.jsx'
import Navbar from '../components/Navbar.jsx'
import axiosinstance from '../axios/axios'

const Login = () => {
    const location = useLocation();
    const from= location.state?.from;
    const navigate = useNavigate()
    const [loading, setLoading] = useState(
        // () => {
        // if (location.state) {
        //     console.log(location)
        //     return location.state?.from !== 'signup'||location.state?.from !== '/';
        // }
        // return true
    // }
false        
);
    // Simulate loading end after 4 seconds
    useEffect(() => {

        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);
    const [formdata, setformdata] = useState({ email: '', password: '' })
    const [Forgetformdata, setForgetformdata] = useState({ email: '' })
    const [formNum, setformNum] = useState('form1')
    // console.log(formdata)
    const changeHandler = (e) => {
        setformdata((formdata) => ({ ...formdata, [e.target.name]: e.target.value }))
        // console.log(formdata)
    }
    // console.log(from)
    const formHandler = (e) => {
        e.preventDefault();
        setLoading(true)
        axiosinstance.post('/login', formdata)
            .then((res) => {
                toast.success(res.data.message)
                // console.log(res)
                // localStorage.setItem('authToken', token)

                const Token = res.data.token;
                localStorage.setItem('Token', Token)
                const Role = res.data.role
                localStorage.setItem('Role', Role)
                const userProfile=res.data.userprofile
                localStorage.setItem('DP', userProfile)
                const id=res.data.id
                localStorage.setItem('id', id)
                // console.log(Token, Role,userProfile,id)
                if(from==='course'){
                    navigate(`/Dashboard/courses`)
                }
                else{
                    navigate('/Dashboard', { state: { from: 'login' } })
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                // console.log(err)
            }).finally(() => {
                setLoading(false);
            }
            )
        setformdata({ email: '', password: '' })
    }
    const forgetFormHandler = (e) => {
        e.preventDefault();
        axiosinstance.post('/forgot-Password', Forgetformdata).then((res) => toast.success(res.data.message)).catch((err) => {
            toast.error(err.response.data.message)
            // console.log(err)
        })
        setForgetformdata({ email: '' })
    }
    return (<><AnimatePresence mode="wait"> {loading ? (
        <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: .5 } }}
        >
            <Loading2 />
        </motion.div>
    ) : (
        <motion.div
        
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
            // transition= {{ duration: 1 }}
            // transition={{duration:.5}}
        >
            <Navbar/>
            <div className=' md:bg-[#faf9f5] bg-white'>
                <div className="min-h-screen flex flex-row items-center justify-center lg:container md:px-5 mx-auto ">

                    <div className="text mx-5 w-full hidden lg:flex flex-col">
                        <h1 className='text-green-500 text-8xl -mb-3 font-qurova  ' >LearnerO</h1>
                        <h2 className='text-4xl text-gray-800  font-semibold '>Live life of a Learner</h2>
                    </div>
                    <AnimatePresence mode='wait'>
                        {formNum == 'form1' && <motion.div
                            key={'form1st'}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                            className="md:bg-white md:shadow-2xl p-8 rounded-lg md:border border-gray-200 w-full lg:mr-20 max-w-[450px] max-h-[600px]">
                            {/* <h2 className="text-2xl font-bold text-center :block hidden text-gray-800 mb-6">Log in</h2> */}
                            <h1 className='text-green-500 text-4xl mb-4 font-qurova lg:hidden text-center ' >LearnerO</h1>

                            <form onSubmit={formHandler} className="space-y-6 mt-5">

                                <div>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder='Email'
                                        name='email'
                                        value={formdata.email}
                                        onChange={changeHandler}
                                        required
                                        className="w-full px-4 py-3 rounded-md border bg-gray-100 border-transparent focus:border-green-500 focus:bg-white focus:outline-none focus:border font-semibold text-sm"
                                    />
                                </div>

                                <div>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder='Password'
                                        name='password'
                                        value={formdata.password}
                                        onChange={changeHandler}
                                        required
                                        className="w-full px-4 py-3 rounded-md border bg-gray-100 border-transparent focus:border-green-500 focus:bg-white focus:outline-none focus:border font-semibold text-sm"
                                    />
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className="chechbox flex ">
                                        <div className="flex items-center h-5 radio">
                                            <input
                                                id="Remember"
                                                type="checkbox"
                                                className="w-4 h-4 border-2 border-gray-400 rounded-sm checked:bg-green-600 checked:border-transparent focus:outline-none  accent-green-600  focus:bg-green-600"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="Remember" className="text-gray-600">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <Link onClick={() => setformNum('form2')} className="text-green-500 hover:underline">Forget Password</Link>
                                </div>

                                {/* <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="w-4 h-4 border-2 border-gray-400 rounded-sm checked:bg-green-600 checked:border-transparent focus:outline-none  accent-green-600  focus:bg-green-600"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="text-gray-600">
                                    I certify that I am 18 years of age or older, and agree to the{" "}
                                    <Link to="#" className="text-green-500 hover:underline">
                                        User Agreement
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="#" className="text-green-500 hover:underline">
                                        Privacy Policy
                                    </Link>
                                    .
                                </label>
                            </div>
                        </div> */}
                                <div className="btn">

                                    <button
                                        type="submit"
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-4 rounded-md transition duration-200 h-9"
                                    >
                                        Log in
                                    </button>
                                </div>
                            </form>

                            <div className="text-center mt-6 text-gray-500">
                                Don't Have account?{" "}
                                <Link to="/Signup" state={{ from: 'login' }} className="text-green-500 hover:underline">
                                    Sign Up
                                </Link>
                            </div>
                        </motion.div>}

                        {formNum == 'form2' && <ArrowLeftIcon onClick={() => { setformNum('form1') }} className='absolute size-4 lg:size-5 lg:left-10 lg:top-10 left-7 top-7 hover:text-green-600' />}
                        {formNum == 'form2' && <h1 className='absolute min-w-max lg:size-5 lg:right-10 lg:top-10 right-7 top-7 hover:text-green-600'>Step - 1</h1>}
                        {formNum == 'form2' && <motion.div
                            key={'form2'}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                            className="md:bg-white md:shadow-2xl p-8 rounded-lg md:border border-gray-200 w-full lg:mr-20 max-w-[450px] max-h-[600px]">
                            <h1 className='text-green-500 text-4xl mb-4 font-qurova lg:hidden text-center ' >LearnerO</h1>
                            <h2 className="text-2xl font-bold text-center lg:block hidden text-gray-700 mb-6">Trouble logging in?</h2>
                            <h1 className="text-center mt-6 text-gray-500">Enter your email and we'll send you a link to get back into your account.</h1>

                            <form onSubmit={forgetFormHandler} className="space-y-6 mt-5">

                                <div>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder='Email'
                                        name='email'
                                        value={Forgetformdata.email}
                                        onChange={(e) => setForgetformdata({ email: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-md border bg-gray-100 border-transparent focus:border-green-500 focus:bg-white focus:outline-none focus:border font-semibold text-sm"
                                    />
                                </div>

                                <div className="btn">

                                    <button
                                        type="submit"
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-4 rounded-md transition duration-200 h-9"
                                    >
                                        Send Reset Link
                                    </button>
                                </div>
                            </form>

                            <div className="text-center mt-6 text-gray-500">
                                Go Back ?{" "}
                                <Link onClick={() => setformNum('form1')} className="text-green-500 hover:underline">
                                    Sign In
                                </Link>
                            </div>
                        </motion.div>}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )}
    </AnimatePresence></>)
}

export default Login
