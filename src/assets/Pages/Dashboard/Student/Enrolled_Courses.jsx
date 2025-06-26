

import React, { useState } from 'react'
import Mycourses from '../../../components/Mycourses'

const Enrolled_Courses = ({setBackdrop}) => {
  // const [data,setdata]=useState()
  // if(data==false){
  //   return(  <p className="text-gray-600 text-center">No Enrolled Courses found.</p>)
  // }
  // console.log(data)
  return (
    <div>
        <div className="text-center pt-5   ">
                                  <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
                                      My <span className="text-green-500">Courses</span>
                                  </h2>
                                  <p className="text-base  text-gray-500 max-w-2xl mx-auto">
                                      These are the Course In which You are Enrolled
                                  </p>
                              </div>
                              <Mycourses />
    </div>
  )
}

export default Enrolled_Courses
