import React, { useState } from 'react'
import TeacherAssigns from '../Teacher/TeacherAssigns'
import Assignment from '../../../components/Assignment'
import CourseForm from '../../../components/CourseForm'
import StudentAssain from '../../../components/StudentAssain'
import AssignmentSubmitForm from '../../../components/AssinmentSubmitForm'

const Assignment_submit = ({ setBackdrop }) => {
    const [seleted_ass, setSelected_ass] = useState()
    console.log(seleted_ass)
    return (
        <div>
            <div className='flex '>
                <div className="hidden md:block min-w-[400px]">
                    <StudentAssain Assignment_id={setSelected_ass
                    } />
                </div>
                <div className="lg:p-5 p-3 h-[80vh] w-full overflow-y-auto overflow-x-auto [scrollbar-width:thin] [scrollbar-color:theme(colors.green.600)_theme(colors.gray.200)] border-l border-l-[#e5e5e5]">
                    <AssignmentSubmitForm setBackdrop={setBackdrop} Assignment_id={seleted_ass} SetAssignment_id={setSelected_ass
                    } />
                </div>
            </div>
        </div>
    )
}

export default Assignment_submit
