import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosinstance from '../axios/axios';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('Token');
  const role = localStorage.getItem('Role');
  const id = localStorage.getItem('id');

  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    if (!token || (allowedRoles.length > 0 && !allowedRoles.includes(role))) {
      setAllowed(false);
      return;
    }

    // Student-specific fee installment check
  const safeStudentRoutes = ['/dashboard/installment_table'];

if (role === 'Student') {
  const currentPath = window.location.pathname.toLowerCase();

  // Allow if route is safe even if overdue
  if (safeStudentRoutes.includes(currentPath)) {
    setAllowed(true);
    return;
  }

  // Block rest if overdue
  axiosinstance.get(`/student-installments/${id}`)
    .then(res => {
      const hasOverdue = res.data.data.some(fee =>
        fee.payment_method === 'installment' &&
        fee.installments.some(inst => !inst.paid && new Date(inst.due_date) <= new Date())
      );
      setAllowed(!hasOverdue);
    })
    .catch(() => setAllowed(false));
}
     else {
      setAllowed(true); // allow Admin/Teacher
    }
  }, [token, role]);

  if (allowed === null) return (<div className=' w-screen h-screen flex justify-center items-center'>  <p className="text-center text-green-500 text-3xl  font-qurova ">Checking access...</p></div>);
  if (!allowed) return role === 'Student' ? <Navigate to="/Dashboard/installment_table" /> : <Navigate to="/Login" />;
  return children;
};

export default ProtectedRoute;
