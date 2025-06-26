import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import axiosinstance from '../axios/axios';

const Assignment = () => {
  const teacherId = localStorage.getItem('id');

  const [formData, setFormData] = useState({
    topic: '',
    Instruction: '',
    Objective: '',
    due_date: '',
    total_marks: '',
    teacher_id: teacherId,
    student_id: [],
     course_id: ''
  });

  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [students, setStudents] = useState([]);
  // Add this new state
const [selectAll, setSelectAll] = useState(false);

// Toggle function
const toggleSelectAll = () => {
  if (selectAll) {
    // Deselect all
    setFormData((prev) => ({ ...prev, student_id: [] }));
  } else {
    // Select all
    const allIds = students.map(s => s._id);
    setFormData((prev) => ({ ...prev, student_id: allIds }));
  }
  setSelectAll(!selectAll);
};


  // Fetch courses created by this teacher
  useEffect(() => {
    axiosinstance.get('/get-all-courses')
      .then((res) => {
        const teacherCourses = res.data.data.filter(course => course.teacher_id?._id === teacherId);
        setCourses(teacherCourses);
      })
      .catch((err) => console.log(err));
  }, [teacherId]);

  // Fetch enrolled students of selected course
  useEffect(() => {
    if (selectedCourseId) {
      axiosinstance.get('/get-all-courses')
        .then(res => {
          const course = res.data.data.find(c => c._id === selectedCourseId);
          if (course && course.enrolled_students) {
            setStudents(course.enrolled_students);
          }
        });
    }
  }, [selectedCourseId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updated = checked
        ? [...prev.student_id, value]
        : prev.student_id.filter(id => id !== value);
      return { ...prev, student_id: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      await axiosinstance.post('/create_assign', formData)
        .then((res) => toast.success(res.data.message))
        .catch((err) => toast.error(err.response.data.message));
    } catch (error) {
      console.error(error);
    }
  };
// console.log(students)
  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      <h1 className="text-gray-700 text-[20px] text-center font-qurova mb-2">Create New Assignment</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Selection */}
        <select
          required
          className="w-full px-4 py-3 rounded-md border bg-gray-100 focus:border-green-500 focus:bg-white focus:outline-none text-sm border-gray-300"
          onChange={(e) => {
            setSelectedCourseId(e.target.value);
            setFormData(prev => ({ ...prev, student_id: [],course_id: e.target.value  }));
          }}
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>{course.title}</option>
          ))}
        </select>

        {/* Form Fields */}
        <input type="text" name="topic" placeholder="Topic" value={formData.topic} onChange={handleChange} className="w-full px-4 py-3 rounded-md border bg-gray-100 focus:border-green-500 text-sm border-gray-300" required />
        <input type="text" name="Objective" placeholder="Objective" value={formData.Objective} onChange={handleChange} className="w-full px-4 py-3 rounded-md border bg-gray-100 focus:border-green-500 text-sm border-gray-300" />
        <input type="text" name="Instruction" placeholder="Instructions" value={formData.Instruction} onChange={handleChange} className="w-full px-4 py-3 rounded-md border bg-gray-100 focus:border-green-500 text-sm border-gray-300" />
        <input type="text" name="total_marks" placeholder="Total Marks" value={formData.total_marks} onChange={handleChange} className="w-full px-4 py-3 rounded-md border bg-gray-100 focus:border-green-500 text-sm border-gray-300" required />
        <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} className="w-full px-4 py-3 rounded-md border bg-gray-100 focus:border-green-500 text-sm border-gray-300" required />

        {/* Students with Images */}
      {students.length > 0 && (
  <>
    <div className="flex justify-end mb-2">
      <button
        type="button"
        onClick={toggleSelectAll}
        className="text-sm text-green-600 hover:underline font-medium"
      >
        {selectAll ? "Deselect All" : "Select All"}
      </button>
    </div>

    <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto border border-green-500 rounded-md p-3 bg-gray-50">
      {students.map((student) => (
        <label key={student._id} className="flex items-center gap-3 text-sm text-gray-700 border-b py-2">
          <input
            type="checkbox"
            value={student._id}
            checked={formData.student_id.includes(student._id)}
            onChange={handleCheckboxChange}
            className="accent-green-500"
          />
          <img
            src={`http://localhost:3031/User_dp/${student.userprofile || 'default.jpg'}`}
            alt={student.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{student.name}</span>
        </label>
      ))}
    </div>
  </>
)}


        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default Assignment;
