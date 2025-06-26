import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import axiosinstance from '../axios/axios';

const StudentAssain = ({ Assignment_id }) => {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const id = localStorage.getItem('id');

  useEffect(() => {
    axiosinstance.get(`/pending-assignments/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axiosinstance.get(`/get-all-courses`)
      .then(res => {
        const enrolledCourses = res.data.data.filter(course =>
          course.enrolled_students?.some(student => student._id === id)
        );
        setCourses(enrolledCourses);
      });
  }, [id]);

  const formattedData = data.map(item => {
    const date = dayjs(item.due_date);
    const now = dayjs();
    const format = date.year() === now.year() ? 'DD-MMM' : 'DD-MMM-YYYY';
    return {
      ...item,
      due_date: date.format(format),
      raw_date: item.due_date,
    };
  });

  const filteredData = formattedData.filter(item => {
    const matchesSearch =
      item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Objective.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = selectedCourse ? item.course_id === selectedCourse : true;

    return matchesSearch && matchesCourse;
  });

  const newToOld = [...filteredData].sort((a, b) => new Date(b.raw_date) - new Date(a.raw_date));

  return (
    <div className="left h-[80vh] w-full p-3 flex-col flex relative">
      <div>
        <div className="Assignments flex justify-between items-center">
          <h1 className="text-xl text-center font-qurova text-gray-700">Pending Assignments</h1>
          <div className="icon relative">
            <div
              onClick={() => setShowFilter(!showFilter)}
              className="hover:bg-[#e5e5e5] transition-all duration-300 rounded-xl"
            >
              <FunnelIcon className='size-5 m-2 text-green-600 hover:scale-110 transition-all duration-300' />
            </div>

            {showFilter && (
              <div className="absolute right-0 mt-1 bg-white border border-gray-300 shadow-lg rounded-md z-10 w-[180px]">
                <div className="p-3">
                  <label className="text-sm text-gray-600 font-medium mb-1 block">Filter by Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full border px-2 py-1 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    <option value="">All Courses</option>
                    {courses.map(course => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Searchbar */}
        <div className="searchbar w-full my-2 relative">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search assignments"
            className="w-full px-2 py-1 pl-7 rounded-md border bg-gray-100 border-[#e5e5e5] focus:border-[#e5e5e5] focus:bg-white focus:outline-none text-gray-700 text-sm border-b-green-500 focus:border-b-green-500"
          />
          <MagnifyingGlassIcon className="size-4 absolute left-1 top-2 text-green-600" />
        </div>
      </div>

      {/* Assignments */}
      {newToOld.length > 0 ? (
        newToOld.map((item) => (
          <div key={item._id} className="box my-1">
            <div
              onClick={() => Assignment_id(item)}
              className="hover:bg-[#f3f3f3] transition-all duration-300 rounded-md w-full flex items-center h-16 cursor-pointer"
            >
              <div className="bg-green-500 w-12 h-10 m-1 rounded-full overflow-hidden flex justify-center items-center">
                <h1 className="text-white font-semibold text-2xl">+</h1>
              </div>
              <div className="text w-full pr-2">
                <div className="flex items-center justify-between px-2">
                  <h1 className="text-lg font-semibold text-gray-700">{item.topic}</h1>
                  <h1 className="text-sm text-gray-700">{item.due_date}</h1>
                </div>
                <h1 className="text-sm line-clamp-1 text-gray-700 px-2">{item.Objective}</h1>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500 mt-4 text-center">No Pending assignments found.</p>
      )}
    </div>
  );
};

export default StudentAssain;
