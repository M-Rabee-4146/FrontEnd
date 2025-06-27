import { UserIcon, BookOpenIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axiosinstance from "../../axios/axios"
import { AnimatePresence, easeIn, motion } from "framer-motion"

export default function CourseCards() {
  const [data, setdata] = useState([])
  useEffect(() => {
    axiosinstance.get('/get-all-courses')
      .then((res) => setdata(res.data.data))
      .catch((err) => toast.error(err.response.data.message))
  }, [])
  const handleDetail = () => {
    if (!userRole || !studentId) {
      navigate('/Login', { state: { from: 'course' } })
    } else {
      navigate('/CourseDetail', { state: { from: 'course' } })
    }
  }
  const location = useLocation()
  const isHome = location.pathname.includes('/')
  const data2 = data?.slice(0, 6) || []
  // console.log(data2)
  return (
    <AnimatePresence mode="wait">
      <section className="md:py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(isHome ? data2 : data).map((course,index) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .3, delay: .1 * (index)/2, ease:easeIn }}
                key={course._id}
                className="  bg-white rounded-xl overflow-hidden shadow-lg group transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-105"
              >
                {/* Course Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={`${axiosinstance}/Courses/${course.image}`}
                    alt={course.title}
                    className="w-full h-54 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
                </div>

                {/* Course Content */}
                <div className="p-5 bg-[#fefefe] md:h-[170px] lg:h-[165px] h-max  group-hover:translate-y-[-55px] transition-all duration-300">
                  {/* Course Stats */}
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <UserIcon className="h-4 w-4" />
                      <span>{course.seats} Seats</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <div className="flex items-center space-x-1">
                      <BookOpenIcon className="h-4 w-4" />
                      <span>1 Semesters</span>
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
                  <div className="flex justify-between">

                    <Link to={`/Dashboard/Course-Detail/${course._id}`} onClick={handleDetail} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">
                      Enroll Now
                    </Link>
                    <p className="bg-transparent border border-gray-400 hover:shadow-xl px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">
                      fee: ${course.fee}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>


        </div>
      </section></AnimatePresence>
  )
}
