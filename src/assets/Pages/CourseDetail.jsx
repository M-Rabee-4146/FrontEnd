import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import axiosinstance from "../axios/axios.js";

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [userRole, setUserRole] = useState("");
    const studentId = localStorage.getItem("id");
    const navigate = useNavigate()
    useEffect(() => {
        setUserRole(localStorage.getItem("Role")); // role = 'Student' | 'Teacher'

        axiosinstance.get(`/get-all-courses`)
            .then(res => {
                const found = res.data.data.find(course => course._id === id);
                setCourse(found);

                if (found && found.teacher_id) {
                    axiosinstance.get(`/Users`)
                        .then((res) => {
                            const foundTeacher = res.data.users.find(user => user._id === found.teacher_id._id);
                            setTeacher(foundTeacher);
                        });
                }
            })
            .catch(err => console.error(err));
    }, [id]);

    const Enroll_student = async () => {
    navigate(`/Dashboard/Enroll_form/${id}`)    
    };

    if (!course) return <div className="text-center py-10">Loading course details...</div>;

    return (
        <div className=" min-h-screen relative">
            {/* Header Section */}
            <div className="bg-[linear-gradient(to_right,#00000030,#00000048),url('/public/images/bg.png')] bg-center bg-cover  pb-5 pt-3 px-4 sm:px-10 text-white text-center bg-[#12753348] h-[300px] ">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">{course?.title}</h1>
                <p className="text-sm sm:text-base max-w-xl mx-auto">{course.description}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-white/90">
                    <span className="border-r pr-4">Category: {course.category}</span>
                    <span className="border-r pr-4">Fee: <strong>${course.fee}</strong></span>
                    <span className="">Seats Available: {course.seats}</span>
                </div>
            </div>

            {/* Course Image */}
            <div className="w-full absolute lg:top-[100px] md:top-[140px] top-[180px]">
                <div className="flex justify-center items-center flex-col lg:flex-row ">
                    <div className="max-w-4xl w-full md:mx-2 px-4 py-8">
                        <img
                            src={`http://localhost:3031/Courses/${course.image}`}
                            alt={course.title}
                            className="rounded-lg shadow-lg w-full max-h-[400px] object-cover"
                        />
                    </div>

                    {/* Responsive Side Card */}
                    <div className="max-w-4xl  lg:w-min lg:mx-2 px-3 py-8 flex flex-col md:flex-row md:justify-between justify-center lg:flex-col mx-auto md:w-full">
                        {/* Large Card */}
                        <div
                            className={`max-w-[300px] w-[300px] md:max-w-[350px] md:w-[350px] border border-gray-200 max-h-[400px] bg-white rounded-xl mb-4 p-4 shadow-2xl transition-all duration-500  relative mt-12 lg:mx-2
                    }`}
                        >
                            <div className="text-center">
                                {/* Profile Image */}
                                <div className="relative mb-6">
                                    <img
                                        src={`http://localhost:3031/User_dp/${teacher?.userprofile}`}
                                        alt={teacher?.name}
                                        className="w-32 h-32 rounded-3xl mx-auto object-cover shadow-xl absolute -top-5 right-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                                    />
                                </div>

                                {/* Name and Title */}
                                <h2 className="text-2xl font-bold text-gray-800 pt-12">{teacher?.name}</h2>
                                <p className="text-gray-500 ">Senior Web Developer</p>

                                {/* Stats */}
                                {/* <div className="flex justify-center space-x-8 mb-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">1ooM</div>
                            <div className="text-sm text-gray-500">Posts</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">2oo</div>
                            <div className="text-sm text-gray-500">Followers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">100</div>
                            <div className="text-sm text-gray-500">Following</div>
                        </div>
                    </div> */}

                                {/* Action Buttons */}
                                {/* <div className="flex space-x-4">
                        <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center space-x-2">
                            <UserPlusIcon className="h-5 w-5" />
                            <span>Follow</span>
                        </button>
                        <button className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 py-3 px-6 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center space-x-2">
                            <ChatBubbleLeftIcon className="h-5 w-5" />
                            <span>Message</span>
                        </button>
                    </div> */}
                            </div>
                        </div>
                        <div className="max-w-[300px] w-[300px] md:max-w-[350px] md:w-[350px] bg-white rounded-xl mb-4 p-4 shadow-2xl border border-gray-200  sm:w-[350px] lg:mx-auto">
                            <h3 className="text-2xl font-bold text-green-600 mb-2">$ {course.fee}</h3>
                            {/* <p className="text-sm text-red-600 font-medium mb-4">🔥 Limited Seats Available</p> */}

                            {userRole !== "Teacher" && (
                                <button
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 mb-3"
                                    onClick={Enroll_student}
                                >
                                    Enroll Now
                                </button>
                            )}



                            <ul className="text-sm text-gray-700 space-y-2">
                                <li className="flex justify-between">
                                    <span className="text-gray-500">Category:</span>
                                    <span className="font-medium">{course.category}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-gray-500">Language:</span>
                                    <span className="font-medium">English</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-gray-500">Level:</span>
                                    <span className="font-medium">Beginner</span>
                                </li>
                                {/* <li className="flex justify-between">
                                <span className="text-gray-500">Seats:</span>
                                <span className="font-medium">{course.seats}</span>
                            </li> */}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>



            {/* Enroll Button
      <div className="max-w-5xl mx-auto px-4">
        <button
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-sm sm:text-base rounded-lg font-semibold transition-all duration-200 mb-10"
          onClick={() => alert("Enroll functionality will be added soon.")}
        >
          Enroll Now for $ {course.fee}
        </button>
      </div> */}

            {/* Instructor Section */}
            {/* <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Instructor</h2>
        <div className="flex gap-6 items-center">
            <div className="min-w-20 size-20 bg-gray-200 rounded-full overflow-hidden">
                {teacher?.userprofile ? (
                    <img
                        src={`http://localhost:3031/User_dp/${teacher?.userprofile}`}
                        alt={teacher?.name}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <UserCircleIcon className="w-full h-full text-gray-400" />
                )}
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-800">{teacher?.name}</h3>
                <p className="text-sm text-gray-500">{teacher?.email}</p>
                <p className="text-sm text-gray-600 mt-1 max-w-lg">
                    A passionate educator dedicated to delivering quality content and helping students grow.
                </p>
            </div>
        </div>
    </div> */}
        </div >
    );
};

export default CourseDetail;
