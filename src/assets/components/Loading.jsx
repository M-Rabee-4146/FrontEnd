import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, scale } from 'framer-motion'

const Loading = () => {
    const waveVariants = {
        initial: { opacity: 0.3, scale: 0.8 },
        animate: (i) => ({
            opacity: [0.3, 1, 0.3],
            transition: {
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
            },
        }),
    };
    const fadeContainer = {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 1 } },
      };
      
    //   return (
    //     <div className='w-screen h-screen bg-white flex justify-center items-center '>
    //         <motion.h1
    //       animate={{ opacity: [0, 1, 0] }}
    //       transition={{
    //         duration: 2,
    //         repeat: Infinity,
    //         ease: "easeInOut"
    //       }}
    //       className='text-green-500 text-5xl -mb-3 font-qurova  ' >LearnerO</motion.h1>
    //     </div>
    // //     <div className="flex items-center justify-center h-screen bg-gray-900">
    // //     <motion.div
    //     //   animate={{ rotate: 360 }}
    //     //   transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    //     //  
    // //       className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
    // //     />
    // //     <motion.p
    // //       initial={{ opacity: 0 }}
    // //       animate={{ opacity: 1 }}
    // //       transition={{ delay: 0.5, duration: 1 }}
    // //       className="ml-4 text-white text-lg font-medium"
    // //     >
    // //       Loading...
    // //     </motion.p>
    // //   </div>    
    //   )
    const text = "LearnerO";

    return (
        <div className="w-screen h-screen bg-white flex justify-center items-center ">
            <AnimatePresence >
            
                    <motion.div
                        className="flex gap-1"
                        variants={fadeContainer}
                        initial="initial"
                        animate="animate"
                        exit="exit" 
                    >
                        {text.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                initial="initial"
                                animate="animate"
                                variants={waveVariants}
                                className="text-green-500 text-5xl -mb-3 font-qurova"
                            >
                                {char}
                            </motion.span>
                        ))}
                        </motion.div>
                    </AnimatePresence>
    </div>
    );
}

export default Loading
