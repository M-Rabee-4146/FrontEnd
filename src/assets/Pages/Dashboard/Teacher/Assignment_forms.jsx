import React, { useState } from 'react'
import TeacherAssigns from './TeacherAssigns'
import Assignment from '../../../components/Assignment'
import CourseForm from '../../../components/CourseForm'

const Assignment_forms = ({setBackdrop}) => {
        const [form, setform] = useState('')
    
  return (
    <div>
      <div className='flex '>
                    <div className="hidden md:block min-w-[400px]">
                        <TeacherAssigns />
                    </div>
                    <div className="lg:p-5 p-3 h-[80vh] w-full overflow-y-auto overflow-x-auto [scrollbar-width:thin] [scrollbar-color:theme(colors.green.600)_theme(colors.gray.200)] border-l border-l-[#e5e5e5]">
                        <button onClick={() => setform('course')} className="hover:text-gray-900 font-[450] py-1 px-6 rounded-full border border-[#22212152] hover:shadow-md transition duration-200 mx-2">
                            + Course
                        </button>
                        <button onClick={() => setform('assign')}
                            className="py-1 px-6 rounded-full  text-white bg-green-500 font-bold hover:bg-green-600  hover:shadow-md transition duration-200">
                            + Assignment
                        </button>
                        {form == 'assign' && <Assignment setBackdrop={setBackdrop} />}
                        {form == 'course' && <CourseForm setBackdrop={setBackdrop} />}
                    </div>
                </div>
    </div>
  )
}

export default Assignment_forms
