import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import DashBg from '../components/DashBg.jsx'
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [slcComponent, setSlcComponent] = useState('Welcome');
  const[backdrop,setBackdrop]=useState(false)
  useEffect(() => {
    localStorage.setItem('activeComponent', slcComponent);
  }, [slcComponent]);

  return (
    <div className=' bg-[#f3f3f3] relative h-screen '>
      {backdrop==true &&  <div onClick={()=>setBackdrop(false)} className="w-screen h-screen bg-[#2b1e1e3f] absolute z-30"></div>}
      <h1 className="text-green-500 text-[30px] font-qurova  mx-4">LearnerO</h1>
      <div className="flex justify-between ">

        <Sidebar setSlcComponent={setSlcComponent} slcComponent={slcComponent} setBackdrop={setBackdrop} />
        <DashBg slcComponent={slcComponent} setBackdrop={setBackdrop} >
          <Outlet/>
        </DashBg>
      </div>
    </div>
  )
}

export default Dashboard
