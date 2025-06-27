import { AcademicCapIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axiosinstance from '../../../axios/axios';

const Graded_assignments = ({ setBackdrop }) => {
  const [data, setdata] = useState([]);
  const [filtereddata, setfilterdata] = useState([]);
  const id = localStorage.getItem('id');

  useEffect(() => {
    axiosinstance.get(`/all_graded_assign_Student/${id}`)
      .then((res) => setdata(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const withmarks = data.filter((item) => item.obtained_marks !== 'Null');
    setfilterdata(withmarks);
  }, [data]);

  const formattedData = filtereddata.map(item => {
    const date = dayjs(item.sending_date);
    const now = dayjs();
    const format = date.year() === now.year() ? 'DD MMM' : 'DD MMM YYYY';
    return {
      ...item,
      sending_date: date.format(format),
      raw_date: item.due_date,
    };
  });

  const newToOld = [...formattedData].sort((a, b) => new Date(b.raw_date) - new Date(a.raw_date));
console.log(newToOld)
  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {newToOld.map((item, i) => (
        <div
          key={i}
          
          className="bg-white border border-green-500 shadow-md rounded-2xl p-4 flex flex-col justify-between hover:shadow-2xl hover:scale-105 transition-all duration-200"
        >
          {/* Top bar: Course Category + Teacher */}
          <div className="flex justify-between items-center mb-2 text-xs text-gray-600">
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold text-[12px]">
              {item.assignment_id?.course_id?.category || 'Course'}
            </span>
            <span className="text-sm capitalize"> {item.teacher_id?.name}</span>
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
            <label className="block text-green-600 text-sm font-semibold mb-1">Teacher's Comment</label>
            <div className="bg-gray-100 text-sm text-gray-700 p-3 rounded-md border border-green-200">
              {item.comment || '—'}
            </div>
          </div>

          {/* File download */}
          <a
            href={`https://learnero-backend-production.up.railway.app/download/${item.file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm mt-auto text-blue-600 hover:underline font-medium"
          >
            📄 Download Submitted File
          </a>
        </div>
      ))}
    </div>
  );
};

export default Graded_assignments;
