import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useOutletContext } from 'react-router-dom';
import axiosinstance from '../../../axios/axios';

const AllCAssigns = () => {
    const { setBackdrop } = useOutletContext()
    const [data, setdata] = useState([])
    const [filtereddata, setfilterdata] = useState([])
    const id = localStorage.getItem('id')
    const [selected, setselected] = useState('')
    const [formdata, setformdata] = useState({ obtained_marks: '' })
    console.log(selected)
    useEffect(() => {
        axiosinstance.get(`/all_submitted_assigns_forTeacher/${id}`)
            .then((res) => {
                setdata(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const withoutmarks = data.filter((item) => item.obtained_marks == 'Null')
        console.log(withoutmarks)
        setfilterdata(withoutmarks)
    }, [data])
    // console.log(data)
    console.log(selected)
    const formattedData = filtereddata.map(item => {
        const date = dayjs(item.sending_date);
        const now = dayjs();
        const format = date.year() === now.year() ? 'DD-MMM' : 'DD-MMM-YYYY';
        const length = item.student_id.length;
        console.log(length)
        return {
            ...item,
            sending_date: date.format(format), length: length, raw_date: item.due_date
        };
    });
    console.log(formattedData)
    const newToOld = [...formattedData].sort((a, b) => new Date(b.raw_date) - new Date(a.raw_date));

    const Grading = (e) => {
        e.preventDefault();
        console.log(formdata)
        if (parseInt(selected.assignment_id.total_marks) >= formdata.obtained_marks) {
            axiosinstance.post(`/Grading/${selected._id}`, formdata).then((res) => toast.success(res.data.message)).catch((err) => toast.error(err.response.data.message))
        }
        else {
            toast.error('please select marks less than total marks')
        }
    }
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3'>
            {newToOld.map((item) =>
                <div className='border border-green-500 rounded-lg mx-2 p-3 my-2'>
                    <h1 className='text-gray-700 font-semibold text-lg'>Student Name: <span className='font-normal'>{item.student_id.name}</span></h1>
                    <h1 className='text-gray-700 font-semibold text-lg'>Title: <span className='font-normal'>{item.title}</span></h1>
                    <h1 className='text-gray-700 font-semibold text-lg'>Submit-Date: <span className='font-normal'>{item.sending_date}</span></h1>
                    {/* <h1 className='text-gray-700 font-semibold text-lg'>Comment: <span className='font-normal'>{item.comment}</span></h1> */}
                    <label htmlFor="Email" className='text-green-600   font-qurova'>File:</label>
                    <div className="email w-full px-4 py-3 min-h-12 my-1 rounded-md border bg-gray-100  border-green-500 font-bold text-sm text-gray-600" > <a
                        href={`http://localhost:3031/download/${item.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='w-full'
                    >
                        {item.file}
                    </a></div>


                    <div className="box">
                        <label htmlFor="Comment" className='text-green-600   font-qurova'>Comment:</label>
                        <div name={'Comment'} className="email w-full px-4 py-3 min-h-12 my-1 rounded-md border bg-gray-100  border-green-500 font-bold text-sm text-gray-600" >{item.comment}</div>

                    </div>

                    <div className="box">
                        <label htmlFor="Comment" className='text-green-600   font-qurova'>Total Marks:</label>
                        <div name={'Comment'} className="email w-full px-4 py-3 min-h-12 my-1 rounded-md border bg-gray-100  border-green-500 font-bold text-sm text-gray-600" >{item.assignment_id.total_marks}</div>

                    </div>
                    <button
                        // type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 my-3"
                        onClick={() => { setselected(item); setBackdrop(true) }}
                    >
                        Give Marks
                    </button>
                </div>)}
            {selected && (<div className="selected-user bg-white p-4 border rounded-2xl border-green-600 md:w-[500px] w-[270px] max-h-[500px] z-40 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute">
                <XMarkIcon className='size-5 absolute top-[10px] right-[10px]' onClick={() => { setBackdrop(false); setselected('') }} />
                <h2 className="text-xl font-bold text-green-600 text-center">{selected?.student_id?.name}</h2>
                <form onSubmit={Grading} className="space-y-6 mt-1">
                    <input type="number" onChange={(e) => {
                        setformdata((formdata) => ({ ...formdata, obtained_marks: e.target.value }))
                    }
                    } className="email w-full px-4 py-3 min-h-12 my-1 rounded-md border bg-gray-100  border-green-500 font-bold text-sm text-gray-600" />
                    <div className="btn">

                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-4 rounded-md transition duration-200 h-9"
                        >
                            Save
                        </button>
                    </div>
                </form>

            </div>)}
        </div>
    )
}

export default AllCAssigns
