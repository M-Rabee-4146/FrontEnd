import { UserIcon, BookOpenIcon, CurrencyDollarIcon, DocumentCurrencyDollarIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axiosinstance from "../axios/axios"

export default function Mycourses({ setdata2 }) {
    const [data, setdata] = useState([])
    const id = localStorage.getItem('id')
    useEffect(() => {
        axiosinstance.get(`/get-enrolled-courses/${id}`)
        .then((res) => setdata(res.data.data))
        .catch((err) => toast.error(err.response.data.message))
    }, [])
    // if(!data ||data==[]){
    //     setdata2(false)
    // }else{
    //     setdata2(true)
    // }

    console.log(data)
    return (
        <section className="md:py-16 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                {/* Course Cards Grid */}
                <div className="grid grid-cols-1  lg:grid-cols-2 gap-8">
                    {data.map((course) => (
                        <div
                            key={course._id}
                            className="  bg-white rounded-xl overflow-hidden shadow-lg group transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-105 md:flex"
                        >
                            {/* Course Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={`https://learnero-backend-production.up.railway.app/Courses/${course.image}`}
                                    alt={course.title}
                                    className="h-full max-h-[300px]  object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
                            </div>

                            {/* Course Content */}
                            <div className="p-5 bg-[#fefefe] h-max   transition-all duration-300">
                                {/* Course Stats */}
                                <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <CurrencyDollarIcon className="h-4 w-4" />
                                        <span>Fee</span>
                                    </div>
                                    <div className="w-px h-4 bg-gray-300"></div>
                                    <div className="flex items-center space-x-1">
                                        {/* <DocumentCurrencyDollarIcon className="h-4 w-4" /> */}
                                        <span>$100</span>
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="mb-2">
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                        {course.category}
                                    </span>
                                </div>

                                {/* Course Title */}
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                                    {course.title}
                                </h3>

                                {/* Course Description */}
                                <p className="text-sm text-gray-600 mb-4 leading-snug line-clamp-2">
                                    {course.description}
                                </p>

                                {/* View Button */}
                                {/* <div className="flex justify-between">

                                    <Link to={`/Course-Detail/${course._id}`} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">
                                        Enroll Now
                                    </Link>
                                    <p className="bg-transparent border border-gray-400 hover:shadow-xl px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">
                                        fee: ${course.fee}
                                    </p>
                                </div> */}
                                <div className="flex border border-gray-200 rounded-2xl transition-all duration-300 p-2 hover:shadow-xl">
                                    <div className="img size-12 min-w-12 rounded-2xl overflow-hidden object-center object-cover">
                                        {course.teacher_id?.userprofile ?
                                            <img src={`https://learnero-backend-production.up.railway.app/User_dp/${course.teacher_id.userprofile}`} alt={`${course.teacher_id.name}`} className="w-full h-full" />
                                            : <img src={`https://learnero-backend-production.up.railway.app/User_dp/default.jpg`} alt={`${course.teacher_id.name}`} className="w-full h-full" />}
                                    </div>
                                    <div className="text mx-2">
                                        <h1 className="capitalize text-md font-semibold">{course.teacher_id.name}</h1>
                                        <h1 className="text-sm text-gray-500">{course.teacher_id.email}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    )
}
