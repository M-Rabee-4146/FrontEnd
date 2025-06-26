import { BookOpenIcon, UserIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import axiosinstance from '../../../axios/axios';

const Enroll_form = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [numInstallments, setNumInstallments] = useState(2);

  const [teacher, setTeacher] = useState(null);
  const [userRole, setUserRole] = useState("");
  const studentId = localStorage.getItem("id");
  const navigate = useNavigate()
  useEffect(() => {
    setUserRole(localStorage.getItem("Role")); // role = 'Student' | 'Teacher'

    axiosinstance.get(`/get-all-courses`)
      .then(res => {
        const found = res.data.data.find(course => course._id === id);
        setCourse(found);

        if (found && found.teacher_id) {
          axiosinstance.get(`/Users`)
            .then((res) => {
              const foundTeacher = res.data.users.find(user => user._id === found.teacher_id._id);
              setTeacher(foundTeacher);
            });
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalFee = course.fee;
    const method = paymentMethod;
    const installmentsArray = [];

    if (method === 'installment' && numInstallments > 0) {
      const amountPerInstallment = Math.floor(totalFee / numInstallments);
      const today = new Date();

      for (let i = 0; i < numInstallments; i++) {
        const due = new Date(today);
        due.setMonth(today.getMonth() + i);
        installmentsArray.push({
          amount: amountPerInstallment,
          due_date: due.toISOString(),
          paid: false,
        });
      }
    }

    axiosinstance.post('/fee/pay', {
      student_id: studentId,
      course_id: course._id,
      total_fee: totalFee,
      payment_method: method,
      paid_amount: method === 'full' ? totalFee : 0,
      remaining_amount: method === 'installment' ? totalFee : 0,
      installments: method === 'installment' ? installmentsArray : [],
      is_fully_paid: method === 'full'
    })
      .then(res => {
        toast.success("Enrollment Successful!");
         axiosinstance.post('/enroll',{course_id:course._id,student_id:studentId}).then((res)=>toast.success(res.data.message)).catch((err)=>toast.error(err.response.data.message))
        navigate('/Dashboard/installment_table');
      })
      .catch(err => toast.error("Error: " + (err.response?.data?.message || "Failed")));
  }
  return (
    <div>
      <div className='flex '>
        <div className="hidden md:block min-w-[400px] p-4">
          {/* <StudentAssain Assignment_id={setSelected_ass
                    } /> */}
          <div
            key={course?._id}
            className="  bg-white rounded-xl overflow-hidden shadow-lg group transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-105"
          >
            {/* Course Image */}
            <div className="relative overflow-hidden">
              <img
                src={`http://localhost:3031/Courses/${course?.image}`}
                alt={course?.title}
                className="w-full h-54 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
            </div>

            {/* Course Content */}
            <div className="p-5 bg-[#fefefe] md:h-[170px] lg:h-[200px] h-max  group-hover:translate-y-[-10px] transition-all duration-300">
              {/* Course Stats */}
              <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <UserIcon className="h-4 w-4" />
                  <span>{course?.seats} Seats</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center space-x-1">
                  <BookOpenIcon className="h-4 w-4" />
                  <span>1 Semesters</span>
                </div>
              </div>

              {/* Category */}
              <div className="mb-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                  {course?.category}
                </span>
              </div>

              {/* Course Title */}
              <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                {course?.title}
              </h3>

              {/* Course Description */}
              <p className="text-sm text-gray-600 mb-4 leading-snug line-clamp-2">
                {course?.description}
              </p>

              {/* View Button */}
            </div>
          </div>
        </div>
        <div className="lg:p-5 p-3 h-[80vh] w-full overflow-y-auto overflow-x-auto [scrollbar-width:thin] [scrollbar-color:theme(colors.green.600)_theme(colors.gray.200)] border-l border-l-[#e5e5e5]">
          {course && (
            <form
              onSubmit={handleSubmit}
              className="max-w-lg space-y-4"
            >
              {/* Course Name */}
              <div>
                <label className="block mb-1 text-green-600 font-medium">Course</label>
                <input
                  type="text"
                  value={course.title}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 border-green-500 text-sm text-gray-700"
                />
              </div>
              {/* Course Name */}
              <div>
                <label className="block mb-1 text-green-600 font-medium">Fee</label>
                <input
                  type="text"
                  value={'$'+course.fee}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 border-green-500 text-sm text-gray-700"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block mb-1 text-green-600 font-medium">Payment Method</label>
                <select
                  required
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md bg-white border-green-500 text-sm text-gray-700 focus:outline-none"
                >
                  <option value="">Select Method</option>
                  <option value="full">Full</option>
                  <option value="installment">Installment</option>
                </select>
              </div>

              {/* Installments Count - Show only if payment_method is installment */}
              {paymentMethod === 'installment' && (
                <div>
                  <label className="block mb-1 text-green-600 font-medium">Number of Installments</label>
                  <select
                    type="number"
                    value={numInstallments}
                    min={2}
                    onChange={(e) => setNumInstallments(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border rounded-md bg-white border-green-500 text-sm text-gray-700"
                  >
                    <option value="">Select Installments</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  </select>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition duration-200"
              >
                Enroll Now
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  )
}

export default Enroll_form
