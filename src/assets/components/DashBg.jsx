import { CommandLineIcon, FunnelIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import Assignment_forms from '../Pages/Dashboard/Teacher/Assignment_forms'
import { Outlet, useLocation } from 'react-router-dom'
import Assignment_submit from '../Pages/Dashboard/Student/Assignment_submit'
import axiosinstance from '../axios/axios'

const DashBg = ({ slcComponent, setBackdrop }) => {
    const location = useLocation()
    const isAssignmentLayout = location.pathname.includes('/Dashboard/forms')
    const isAssignmentsubmitLayout = location.pathname.includes('/Dashboard/submit_assignment')

    const [data, setdata] = useState([]);
    const id = localStorage.getItem('id');

    useEffect(() => {
        axiosinstance.get(`/all_assigns/${id}`)
            .then((res) => {
                setdata(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formattedData = data.map(item => {
        const date = dayjs(item.due_date);
        const now = dayjs();
        const format = date.year() === now.year() ? 'DD-MMM' : 'DD-MMM-YYYY';
        const length = item.student_id.length;
        // console.log(length)
        return {
            ...item,
            due_date: date.format(format), length: length
        };
    });
    // console.log(formattedData)
    return (
        <div className='border rounded-tl-2xl border-[#e5e5e5] bg-[#fefefe]  sm:w-[100%] w-[100%] h-[92vh] right-0 bottom-0   '>
            <div className="top-bar rounded-tl-2xl border-[#e5e5e5] bg-[#fefefe] w-full h-16 border-b p-2 px-3 flex justify-between items-center">
                <div className="text mx-2">
                    <h1 className="text-2xl  text-center  font-qurova  text-gray-700">{slcComponent}</h1>
                </div>
                <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  mx-2">
                    <MagnifyingGlassIcon className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
                </div>

            </div>
            {isAssignmentLayout ? (
                <Assignment_forms />
            ) : isAssignmentsubmitLayout ? <Assignment_submit /> : (
                <div className="lg:p-5 p-3 h-[80vh] w-full overflow-y-auto overflow-x-auto [scrollbar-width:thin] [scrollbar-color:theme(colors.green.600)_theme(colors.gray.200)]">
                    {/* {slcComponent == 'Students' && <Students setBackdrop={setBackdrop} />} */}
                    {/* {slcComponent == 'Teachers' && <Teachers setBackdrop={setBackdrop} />} */}
                    {/* {slcComponent == 'Welcome' && <Default />} */}
                    {/* {slcComponent == 'Assignments' && <TeacherAssigns />} */}
                    {/* {slcComponent == 'submitted' && <AllCAssigns setBackdrop={setBackdrop} />} */}
                    {/* {slcComponent == 'Graded' && <AllGraded setBackdrop={setBackdrop} />} */}
                    {/* {slcComponent == 'My Courses' && <My_Courses setBackdrop={setBackdrop} />} */}
                    {/* {slcComponent == 'Courses' && <Enrolled_Courses setBackdrop={setBackdrop} />} */}
                    {/* {children} */}
                    <Outlet context={{ setBackdrop }} />
                </div>)}
        </div>
    )
}

export default DashBg
