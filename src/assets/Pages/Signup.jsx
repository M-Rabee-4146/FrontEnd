import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Loading from '../components/Loading.jsx'
import Loading2 from '../components/Loading2.jsx'
import Navbar from '../components/Navbar.jsx'
import axiosinstance from '../axios/axios.js'

const Signup = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false
        // () => {
        // if (location.state) {
        //     console.log(location)
        //     return location.state?.from !== 'login';
        // }
        // return true
    // }
);
    // Simulate loading end after 4 seconds
    useEffect(() => {

        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);


    const [formdata, setformdata] = useState({ name: '', email: '', password: '', role: '' })
    const [email, setEmail] = useState('')
    const [showForm, setShowForm] = useState('form1')
    const navigate = useNavigate()
    // console.log(formdata)
    const changeHandler = (e) => {
        setformdata((formdata) => ({ ...formdata, [e.target.name]: e.target.value }))

        console.log(formdata)
        console.log(email)
    }
    const formHandler = (e) => {
        e.preventDefault();
        axiosinstance.post('/Signup', formdata).then((res) => {
            toast.success(res.data.message)
            setShowForm('form2')
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
        setformdata({ name: '', email: '', password: '', role: '' })
    }


    //OTP Verification Logic
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [Formdata1, setFormdata1] = useState({ OTP: '' })
    const [ResendData, setResendData] = useState({})
    useEffect(() => {
        setFormdata1((Formdata1) => ({ ...Formdata1, OTP: otp.join(''), email: email }))
    }, [otp])
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) return; // only allow a single digit
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if not last and value is not empty
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs.current[index - 1].focus();
        }
    };
    const OTP_Handler = (e) => {
        e.preventDefault();
        console.log(Formdata1)
        axiosinstance.post('/OTP-Verification', Formdata1).then((res) => {
            toast.success(res.data.message)
            setTimeout(() => {
                navigate('/login')
            }, 1000);
            setFormdata1({ OTP: '', email: '' })
        }).catch((err) => {
            toast.error(err.response.data.message)
        })

    }
    const ResendOTP = (e) => {
        e.preventDefault();
        setResendData((ResendData) => ({ ...ResendData, email: email }))
        axiosinstance.post('/Resend', ResendData).then((res) => {
            toast.success(res.data.message)
            // setFormdata1({OTP:'',email:''})
        }).catch((err) => {
            toast.error(err.response.data.message)
        })

    }



    return (<>
        <AnimatePresence mode="wait">
            {loading ? (
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
                    exit={{ opacity: 0 }}
                    // transition= {{ duration: 1 }}    
                >
                    <Navbar/>
                    <div className=' md:bg-[#faf9f5] bg-white pt-10'>
                        <div className="h-[93vh] flex flex-row items-center  justify-center lg:container md:px-5 mx-auto ">

                            <motion.div
                                key={'text'}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.3 }}
                                className="text mx-5 w-full hidden lg:flex flex-col">
                                <h1 className='text-green-500 text-8xl -mb-3 font-qurova  ' >LearnerO</h1>
                                <h2 className='text-4xl text-gray-700  font-semibold '>Live life of a Learner</h2>
                            </motion.div>
                            <AnimatePresence mode='wait'>


                                {showForm == 'form1' && <motion.div
                                    key={'card'}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.5 }}
                                    className="md:bg-white md:shadow-2xl py-4 p-8 rounded-lg md:border border-gray-200 w-full lg:mr-20 max-w-[450px] max-h-[600px]">
                                    <h2 className="text-2xl font-bold text-center lg:block hidden text-gray-700   mb-6">Sign up</h2>
                                    <h1 className='text-green-500 text-4xl mb-4 font-qurova lg:hidden text-center ' >LearnerO</h1>

                                    <form onSubmit={formHandler} className="space-y-6 mt-5">
                                        <div>
                                            <input
                                                id="fullName"
                                                type="text"
                                                placeholder='Full Name'
                                                name='name'
                                                value={formdata.name}
                                                onChange={changeHandler}
                                                required
                                                className="w-full px-4 py-3 rounded-md border bg-gray-100 border-transparent focus:border-green-500 focus:bg-white focus:outline-none focus:border font-semibold text-sm"
                                            />
                                        </div>

                                        <div>
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder='Email'
                                                name='email'
                                                value={formdata.email}
                                                onChange={(e) => { setformdata((formdata) => ({ ...formdata, email: e.target.value })); setEmail(e.target.value) }}
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
                                        <div>
                                            <select
                                                name="role"
                                                value={formdata.role}
                                                onChange={changeHandler}
                                                required
                                                className={`w-full px-4 py-3 rounded-md border bg-gray-100 border-transparent focus:border-green-500 focus:bg-white focus:outline-none focus:border font-semibold text-sm   ${formdata.role == '' ? 'text-gray-500' : 'text-gray-900'}`}>

                                                <option disabled defaultValue={''} value={''}>Select Role</option>
                                                <option value="Student">Student</option>
                                                <option value="Teacher">Teacher</option>
                                            </select>
                                        </div>
                                        {/* <div className='flex items-center'>
                            <input
                                id="Student"
                                type="radio"
                                name='role'
                                value="Student"
                                checked={formdata.role === 'Student'}
                                onChange={changeHandler}
                                required
                                className="w-4 h-4 border-2 border-gray-400 rounded-sm accent-green-600 checked:border-transparent   mr-2"
                            />
                            <label htmlFor="Student" className="block text-gray-500  mr-7">
                                Student
                            </label>
                            <input
                                id="Teacher"
                                type="radio"
                                name='role'
                                value="Teacher"
                                checked={formdata.role === 'Teacher'}
                                onChange={changeHandler}
                                className="w-4 h-4 border-2 border-gray-400 rounded-sm accent-green-600 checked:border-transparent   mr-2"
                            />
                            <label htmlFor="Teacher" className="block text-gray-500">
                                Teacher
                            </label>
                        </div> */}

                                        <div className="flex items-start">
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
                                                    I agree to your Terms ,{" "}
                                                    <Link to="#" className="text-green-500 hover:underline">
                                                        Privacy Policy                                    </Link>{" "}
                                                    and{" "}
                                                    <Link to="#" className="text-green-500 hover:underline">
                                                        Cookies Policy
                                                    </Link>
                                                    .
                                                </label>
                                            </div>
                                        </div>
                                        <div className="btn">

                                            <button
                                                type="submit"
                                                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-4 rounded-md transition duration-200 h-9"
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </form>

                                    <div className="text-center mt-6 text-gray-500">
                                        Have account?{" "}
                                        <Link to="/Login" state={{ from: "signup" }} className="text-green-500 hover:underline">
                                            Sign in
                                        </Link>
                                    </div>
                                </motion.div>}
                                {showForm == 'form2' && <ArrowLeftIcon onClick={() => { setShowForm('form1') }} className='absolute size-4 lg:size-5 lg:left-10 lg:top-10 left-7 top-7 hover:text-green-600' />}
                                {showForm == 'form2' && <h1 className='absolute min-w-max lg:size-5 lg:right-10 lg:top-10 right-7 top-7 hover:text-green-600'>Step - 2</h1>}
                                {showForm == 'form2' && <motion.div
                                    key={'card1'}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                    className="md:bg-white md:shadow-2xl p-8 rounded-lg md:border border-gray-200 w-full lg:mr-20 max-w-[450px] max-h-[600px] relative">

                                    <h1 className='text-green-500 text-4xl mb-4 font-qurova lg:hidden text-center ' >LearnerO</h1>
                                    <h2 className="text-2xl text-gray-700 font-bold text-center lg:block hidden mb-4">Enter 6 Digit OTP</h2>
                                    {/* <h1 className="text-center mt-3 text-gray-500  mb-3">Enter OTP You Recievd in Email</h1> */}


                                    <div className='flex flex-col justify-center '>
                                        <form onSubmit={OTP_Handler}>
                                            <div className="boxs flex justify-center lg:gap-5 gap-3 mb-5">
                                                {otp.map((digit, index) => (
                                                    <input
                                                        key={index}
                                                        ref={(el) => (inputRefs.current[index] = el)}
                                                        type="text"
                                                        maxLength="1"
                                                        value={digit}
                                                        onChange={(e) => handleChange(e, index)}
                                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                                        style={{
                                                            width: '40px',
                                                            height: '50px',
                                                            textAlign: 'center',
                                                            fontSize: '24px',
                                                            border: '1px solid #ccc',
                                                            borderRadius: '6px',
                                                            outline: 'none',
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <div className="btn">

                                                <button
                                                    type="submit"
                                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-4 rounded-md transition duration-200 h-9"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                        <h1 className="text-center mt-3 text-gray-500  mb-3">OTP will be Expired Within 2 Minutes.{''} <Link onClick={ResendOTP} className="text-green-500 hover:underline">
                                            Resend?
                                        </Link></h1>

                                    </div>
                                </motion.div>}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence></>)
}

export default Signup
