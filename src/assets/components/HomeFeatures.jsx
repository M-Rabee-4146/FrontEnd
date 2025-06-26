"use client"
import { AcademicCapIcon, ClockIcon, ComputerDesktopIcon, UserIcon } from "@heroicons/react/24/outline"
import { AnimatePresence, easeIn, easeInOut, motion } from "framer-motion"
// import { UserCheck, Clock, Monitor, Award } from "lucide-react"

export default function HomeFeatures() {
  const features = [
    {
      icon: <UserIcon className="h-12 w-12 text-blue-600" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: <ClockIcon className="h-12 w-12 text-green-600" />,
      title: "Lifetime Access",
      description: "Access your courses anytime, anywhere with no time restrictions",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
    },
    {
      icon: <ComputerDesktopIcon className="h-12 w-12 text-purple-600" />,
      title: "Learn at Your Own Pace",
      description: "Study when it's convenient for you with flexible scheduling",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
    },
    {
      icon: <AcademicCapIcon className="h-12 w-12 text-orange-600" />,
      title: "Certification on Completion",
      description: "Earn recognized certificates to boost your career prospects",
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
    },
  ]

  return (
    <AnimatePresence mode="wait">
      <section className="py-16 bg-[#fefefe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, }}
              className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              Why Choose Our <span className="text-green-500">Learning Platform</span>
            </motion.h2>
            {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the key features that make our LMS the perfect choice for your educational journey
          </p> */}
          </div>

          {/* Features Grid */}
          <motion.div
               initial={{ opacity: 0,x:-20 }}
                        animate={{ opacity: 1,x:0 }}
                        transition={{duration:.5,}}
          
           className="rounded-2xl border-green-300 shadow-xl border p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
               initial={{ opacity: 0,y:-40 }}
                        whileInView={{ opacity: 1,y:0 }}
                        transition={{duration:.3,delay:.1*(index),ease:easeIn}}
                key={index}
                className={`${feature.bgColor} ${feature.hoverColor} rounded-xl p-4 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer group `}
              >
                {/* Icon */}
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="">{feature.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-700 mb-3 group-hover:text-gray-800 transition-all">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-all">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          {/* <div className="text-center mt-12">
          <button className="bg-red-900 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105">
            Start Learning Today
          </button>
        </div> */}
        </div>
      </section></AnimatePresence>
  )
}
