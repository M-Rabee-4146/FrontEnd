import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axiosinstance from '../../../axios/axios';

const AllGraded = ({ setBackdrop }) => {
    const [data, setdata] = useState([])
    const [filtereddata, setfilterdata] = useState([])
    const id = localStorage.getItem('id')
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
        const withmarks = data.filter((item) => item.obtained_marks != 'Null')
        console.log(withmarks)
        setfilterdata(withmarks)
    }, [data])
    // console.log(data)
    // console.log(selected)
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

    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 p-2' >
              {newToOld.map((item, i) => (
        <div
          key={i}
          
          className="bg-white border border-green-500 shadow-md rounded-2xl p-4 m-2 flex flex-col justify-between hover:shadow-2xl hover:scale-105 transition-all duration-200"
        >
          {/* Top bar: Course Category + Teacher */}
          <div className="flex justify-between items-center mb-2 text-xs text-gray-600">
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold text-[12px]">
              {item.assignment_id?.course_id?.category || 'Course'}
            </span>
            <span className="text-sm capitalize"> {item.student_id?.name}</span>
          </div>

          {/* Assignment Name */}
          <h2 className="text-lg font-bold text-gray-800 mb-1 capitalize">{item.title}</h2>

          {/* Marks */}
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-semibold text-green-600">Marks:</span>{' '}
            {item.obtained_marks} / {item.assignment_id?.total_marks}
          </p>

          {/* Submit Date */}
          <p className="text-sm text-gray-500 mb-2 ">
            <span className='font-semibold text-green-600'>Submitted:</span> {''}
             {item.sending_date}
          </p>

          {/* Comment */}
          <div className="mb-3">
            <label className="block text-green-600 text-sm font-semibold mb-1">Student's Comment</label>
            <div className="bg-gray-100 text-sm text-gray-700 p-3 rounded-md border border-green-200">
              {item.comment || '—'}
            </div>
          </div>

          {/* File download */}
          <a
            href={`http://localhost:3031/download/${item.file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm mt-auto text-blue-600 hover:underline font-medium"
          >
            📄 Download Attached File
          </a>
        </div>
      ))}
        </div>
    )
}

export default AllGraded
