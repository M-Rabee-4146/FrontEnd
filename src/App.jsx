import React from 'react'
import Signup from './assets/Pages/Signup'
import './fonts.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './assets/Pages/Login'
import ResetPassword from './assets/Pages/ResetPassword'
import Loading from './assets/components/Loading'
import Loading2 from './assets/components/Loading2'
import Dashboard from './assets/Pages/Dashboard'
import Home from './assets/Pages/Home'
import Cards from './assets/Pages/Cards'
import CourseDetail from './assets/Pages/CourseDetail'
import ProtectedRoute from './assets/Routes/ProtectedRoutes'
import Default from './assets/Pages/Dashboard/Default'
import Students from './assets/Pages/Dashboard/Students'
import Teachers from './assets/Pages/Dashboard/Teachers'
import Enrolled_Courses from './assets/Pages/Dashboard/Student/Enrolled_Courses'
import My_Courses from './assets/Pages/Dashboard/Student/My_Courses'
import Assignment_forms from './assets/Pages/Dashboard/Teacher/Assignment_forms'
import TeacherAssigns from './assets/Pages/Dashboard/Teacher/TeacherAssigns'
import AllCAssigns from './assets/Pages/Dashboard/Teacher/AllCAssigns'
import AllGraded from './assets/Pages/Dashboard/Teacher/AllGraded'
import Assignment_submit from './assets/Pages/Dashboard/Student/Assignment_submit'
import StudentAssain from './assets/components/StudentAssain'
import Graded_assignments from './assets/Pages/Dashboard/Student/Graded_assignments'
import Enroll_form from './assets/Pages/Dashboard/Student/Enroll_form'
import InstallmentTable from './assets/Pages/Dashboard/Student/InstallmentTable'
import Fee_installments from './assets/Pages/Dashboard/Teacher/Fee_installments'
import { AnimatePresence, motion } from 'framer-motion'

const Transitions= ({children})=>{
  return(
    <motion.div 
    initial={{ opacity:0,}}
    animate={{ opacity:1,}}
    exit={{ opacity:0 ,}}
    transition={{duration:0.5}}
    >
     { children}
    </motion.div>
  )
}

const Animated=()=>{
  const location=useLocation()

  return(
    <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname} >
          <Route path='/' element={<Transitions><Home /></Transitions>} />
          <Route path='/Signup' element={<Transitions><Signup /></Transitions>} />
          <Route path='/Courses' element={<Cards />} />
          <Route path='/Loading' element={<Loading />} />
          <Route path='/Loading2' element={<Loading2 />} />
          <Route path='/Login' element={<Transitions><Login /></Transitions>} />
          <Route path='/Reset/:Token' element={<Transitions><ResetPassword /></Transitions>} />

          <Route path="/Dashboard" element={
              <ProtectedRoute allowedRoles={['Admin', 'Teacher', 'Student']}>
                <Transitions>

                <Dashboard />
                </Transitions>
              </ProtectedRoute>
            }>
           
              <Route index element={ <Transitions><Default /> </Transitions>} />
              <Route path='home' element={  <Transitions><Default />  </Transitions>} />
              <Route path="students" element={  <Transitions><Students /> </Transitions>} />
              <Route path="teachers" element={  <Transitions><Teachers /> </Transitions>} />
              <Route path="my-courses" element={  <Transitions><Enrolled_Courses /> </Transitions>} />
              <Route path="courses" element={  <Transitions><My_Courses /> </Transitions>} />
              <Route path="forms" element={  <Transitions><Assignment_forms /> </Transitions>} />
              <Route path="submit_assignment" element={  <Transitions><Assignment_submit /> </Transitions>} />
              <Route path="assignment" element={  <Transitions><TeacherAssigns /> </Transitions>} />
              <Route path="pending_assignment" element={  <Transitions><StudentAssain /> </Transitions>} />
              <Route path="all_assignment" element={  <Transitions><AllCAssigns /> </Transitions>} />
              <Route path="graded_assignment" element={  <Transitions><AllGraded /> </Transitions>} />
              <Route path="graded_assignment_student" element={  <Transitions><Graded_assignments /> </Transitions>} />
              <Route path='Course-Detail/:id' element={  <Transitions><CourseDetail /> </Transitions>} />
              <Route path='Enroll_form/:id' element={  <Transitions><Enroll_form /> </Transitions>} />
              <Route path='installment_table' element={  <Transitions><InstallmentTable /> </Transitions>} />
              <Route path='Fee_installment' element={  <Transitions><Fee_installments />  </Transitions>} />
          
          </Route>
        </Routes>
           </AnimatePresence> 
  )
}

const App = () => {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <BrowserRouter>
       <Animated/>
      </BrowserRouter>
    </div>
  )
}

export default App

