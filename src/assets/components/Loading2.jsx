import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Loading2 = () => {
    const controls = useAnimation();
    const shimmerControls = useAnimation();

    useEffect(() => {
        const runAnimation = async () => {
            // Start shimmer loop
            shimmerControls.start({
                x: ['-100%', '300%'],
                transition: {
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
            });

            // Animate progress bar
            await controls.start({
                width: "30%",
                transition: { duration: 1.2, ease: "easeInOut" },
            });

            await new Promise(resolve => setTimeout(resolve, 500));

            await controls.start({
                width: "100%",
                transition: { duration: 1.2, ease: "easeInOut" },
            });
        };

        runAnimation();
    }, [controls, shimmerControls]);

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-white">
            {/* Static Text */}
            <h1 className="text-green-500 text-[40px] font-qurova mb-3">LearnerO</h1>

            {/* Loading Bar Container */}
            <div className="w-64 h-[5px] bg-gray-200 rounded-full overflow-hidden">
                {/* Controlled Line Animation */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={controls}
                    className="h-full bg-green-500 relative"
                >
                  {/* Animated shimmer line */}
                  <motion.div
                        animate={shimmerControls}
                        className="absolute top-0 left-0 h-full w-1/3 blur-[3px] bg-[#FFFFFF66]"
                    />
                </motion.div>
            </div>
        </div>
    );
}

export default Loading2
