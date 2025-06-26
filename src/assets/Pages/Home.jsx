import { ArrowUpRightIcon, Bars3Icon, ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar.jsx"
import HomeFeatures from "../components/HomeFeatures.jsx"
import CourseCards from "../components/CourseCards.jsx"
import Footer from "../components/Footer.jsx"
import Loading2 from "../components/Loading2.jsx"
import { AnimatePresence, motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
// import { Facebook, Twitter, Instagram, Search, Menu, X, ChevronDown, ArrowUpRight, GraduationCap } from "lucide-react"

export default function Home() {
  const Navigate=useNavigate('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {

    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const navigationItems = [
    { name: "Home" },
    { name: "Courses" },
    { name: "About" },
    { name: "Contact" },
  ]

  return (<>
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: .5 } }}
        >
          <Loading2 />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // whileInView={{
          //   // opacity:[1,0,1]
          // }}

        >
          <AnimatePresence mode="wait">
            <div className="min-h-screen relative">
              {/* Navigation Bar */}
              <Navbar />
              {/* Hero Section */}
              <div className="relative h-min flex items-center bg-[#f3f3f3] md:p-5 p-3 ">

                <motion.div
                 initial={{ opacity: 0,y:-40,scaleY:.8 }}
                        // animate={{ opacity: 1,y:0 ,scaleY:1}}
                        whileInView={{opacity: 1,y:0 ,scaleY:1}}
                        transition={{duration:.5,}}
                  className="relative h-min flex items-center  w-full  bg-green-500 rounded-2xl mt-14 "
                  style={{
                    backgroundImage: `linear-gradient( to right,#08C22A, #00FF90)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="max-w-[1332px] w-full mx-auto px-4 md:py-12 py-4 overflow-hidden">
                    <div className=" flex justify-between md:flex-row flex-col-reverse ">

                      {/* Main heading */}
                      <div className="px-2">
                        <motion.h1  
                        initial={{ opacity: 0,x:-40 }}
                        whileInView={{ opacity: 1,x:0 }}
                        transition={{duration:.5,delay:.3}}
           className="text-white text-3xl md:text-4xl lg:text-5xl leading-tight  mb-4">
                          <span className=" py-1 font-qurova inline-block lg:text-8xl text-5xl md:text-6xl -mb-2">LearnerO</span>
                          <p className=" text-white text-xl md:text-2xl leading-relaxed mb-2 max-w-2xl font-semibold">
                            The Best place to invest into Your Knowledge</p>
                          {/* Description */}
                          <p className="text-white text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                            Dive into a dynamic environment where curiosity ignites
                            and your potential truly takes flight.
                          </p>
                        </motion.h1>
                        {/* CTA Button */}
                        <motion.button  initial={{ opacity: 0,x:-40 }}
                        whileInView={{ opacity: 1,x:0 }}
                        transition={{duration:.5,delay:.3}}
                         className="bg-amber-200 hover:bg-amber-300 text-black px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors group">
                          <span>View Our Program</span>
                          <ArrowUpRightIcon className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </motion.button>
                      </div>
                      <motion.img
                       initial={{ opacity: 0,x:40 }}
                        whileInView={{ opacity: 1,x:0 }}
                        transition={{duration:.5,delay:.3}}
                       className="h-[300px] my-2 md:my-0" src="/hero.svg" alt="" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <HomeFeatures />

              <section className="bg-[#f3f3f3]">

                {/* Section Header */}
                <div className="text-center pb-4 pt-5 bg-[#f3f3f3]">
                  <motion.h2 
                   initial={{ opacity: 0,y:-40 }}
                        whileInView={{ opacity: 1,y:0 }}
                        transition={{duration:.5,}}
                  className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
                    Featured <span className="text-green-500">Courses</span>
                  </motion.h2>
                  <p className="text-base  text-gray-500 max-w-2xl mx-auto">
                    Explore our most popular courses designed to help you achieve your educational goals
                  </p>
                </div>
                <CourseCards />
                {/* View All Courses Button */}
                <div className="text-center bg-[#f3f3f3] mt-5 md:mt-0">
                  <motion.button 
                   initial={{ opacity: 0,y:40 }}
                        whileInView={{ opacity: 1,y:0 }}
                        transition={{duration:.5,}}
                   onClick={()=>Navigate('/Courses')} to={'/Courses'} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ">
                    View All Courses
                  </motion.button>
                </div>
              </section>

              <Footer />
            </div>
          </AnimatePresence>
        </motion.div> 

      )}</AnimatePresence></>)
}
