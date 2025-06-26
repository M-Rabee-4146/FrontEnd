import React from 'react'
import CourseCards from '../components/CourseCards.jsx'

const My_Courses = ({setBackdrop}) => {
  return (
    <div>
         <div className="text-center pt-5   ">
                            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
                                All <span className="text-green-500">Courses</span>
                            </h2>
                            <p className="text-base  text-gray-500 max-w-2xl mx-auto">
                                Explore our most popular courses designed to help you achieve your educational goals
                            </p>
                        </div>
                        <CourseCards setBackdrop={setBackdrop} />
    </div>
  )
}

export default My_Courses
