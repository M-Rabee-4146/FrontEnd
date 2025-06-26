import React from 'react'
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HomeIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar.jsx';
import CourseCards from './Dashboard/CourseCards.jsx';
import Footer from '../components/Footer.jsx';
import { AnimatePresence,motion } from 'framer-motion';


const Cards = () => {
  return (
    <AnimatePresence mode='wait'>
    <div className='relative'>
      <Navbar />
      <div className="p-3 bg-[#f3f3f3]">

        <Breadcrumb className='mt-18 md:mx-10 mx-3' aria-label="Default breadcrumb example" >
          <BreadcrumbItem className='text-gray-700 hover:text-gray-900' href="/" icon={HomeIcon}>

            Home
          </BreadcrumbItem>
          <BreadcrumbItem href="/Courses">Courses</BreadcrumbItem>
        </Breadcrumb>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0,y:-40 }}
                        whileInView={{ opacity: 1,y:0 }}
                        transition={{duration:.5,}}
         className="text-center pb-4 pt-5 bg-[#f3f3f3]">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
            Our <span className="text-green-500">Courses</span>
          </h2>
          <p className="text-base  text-gray-500 max-w-2xl mx-auto">
            Explore our most popular courses designed to help you achieve your educational goals
          </p>
        </motion.div>
        <CourseCards />
      </div>
      <Footer />
    </div></AnimatePresence>
  )
}

export default Cards
