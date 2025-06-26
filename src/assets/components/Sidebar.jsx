import { BoltIcon } from '@heroicons/react/16/solid'
import { BanknotesIcon, CheckBadgeIcon, CheckCircleIcon, ClipboardDocumentListIcon, DocumentIcon, DocumentPlusIcon, DocumentTextIcon, PencilIcon, RectangleStackIcon, UsersIcon } from '@heroicons/react/24/outline'
import { BellAlertIcon, Cog6ToothIcon, HomeIcon, RectangleGroupIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import React, { act, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosinstance from '../axios/axios'
import toast from 'react-hot-toast'

const Sidebar = ({ setSlcComponent, slcComponent, setBackdrop }) => {
  const id = localStorage.getItem('id')
  const DP = localStorage.getItem('DP')
  const Role = localStorage.getItem('Role')

  const [formdata, SetformData] = useState({ userprofile: '', id: id })
  const [active, setactive] = useState(false)
  const [data, setdata] = useState()
  const [imageSrc, setImageSrc] = useState(null);

  const navigate = useNavigate()

  const Logout = () => {
    localStorage.removeItem('Token')
    localStorage.removeItem('Role')
    localStorage.removeItem('DP')
    navigate('/')
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    SetformData((data) => ({ ...data, userprofile: e.target.files[0] }))
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    console.log(formdata)
  };

  const handleActive = () => {
    setactive(!active);
    axiosinstance.get(`/user/${id}`)
      .then((res) => setdata(res.data.data))
      .catch((err) => toast.error(err.response.data.message))
    // console.log(data)
  }
  const handleSave = async () => {
      const submission = new FormData();
        submission.append('userprofile', formdata.userprofile);
        submission.append('_id', id);
        if(formdata.name){
          submission.append('name', formdata.name);
        }
    try {
      console.log(formdata)
      const res = await axiosinstance.put(`/update`, submission)
      toast.success(res.data.message);
      SetformData({name:'',userprofile:''});
    }
     catch (err) {
    toast.error(err.response?.data?.message || 'update failed');
  }}
  // console.log(DP)
  return (
    <div className=' w-16 flex flex-col  justify-between'>
      <div className="icons flex flex-col justify-start items-center my-1 py-5 border-b-[#e5e5e5] border-b">
        <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <HomeIcon onClick={() => { navigate('/Dashboard/home'); setSlcComponent('Home') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>
        <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <RectangleStackIcon onClick={() => { navigate('/Dashboard/courses'); setSlcComponent('All Courses') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>
        {Role == 'Student' && <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <RectangleGroupIcon onClick={() => { navigate('/Dashboard/my-courses'); setSlcComponent('Enrolled Courses') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>}
        {Role == 'Student' && <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <DocumentPlusIcon onClick={() => { navigate('/Dashboard/submit_assignment'); setSlcComponent('Submit Assignments') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>}
        {Role == 'Student' && <div className="icon md:hidden hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <ClipboardDocumentListIcon onClick={() => { navigate('/Dashboard/pending_assignment'); setSlcComponent('Pending Assignments') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>}
        {Role == 'Student' && <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <BanknotesIcon onClick={() => { navigate('/Dashboard/installment_table'); setSlcComponent('Fee & Installments') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>}
        {Role == 'Student' && <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <CheckBadgeIcon onClick={() => { navigate('/Dashboard/graded_assignment_student'); setSlcComponent('Graded Assignments') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>}
        {Role == 'Teacher' && <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <DocumentPlusIcon onClick={() => { navigate('/Dashboard/forms'); setSlcComponent('Assignments & Forms') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>}
        {Role == 'Teacher' && <div className="icon md:hidden hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <ClipboardDocumentListIcon onClick={() => { navigate('/Dashboard/assignment'); setSlcComponent('Given Assignments') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>}
        {Role == 'Teacher' && <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <DocumentTextIcon onClick={() => { navigate('/Dashboard/all_assignment'); setSlcComponent('Submitted Assignments') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>}
        {Role == 'Teacher' && <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <CheckBadgeIcon onClick={() => { navigate('/Dashboard/graded_assignment'); setSlcComponent('Graded Assignments') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>}
        {Role == 'Teacher' && <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <BanknotesIcon onClick={() => { navigate('/Dashboard/Fee_installment'); setSlcComponent('Fee & Installments') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>}
        {Role == 'Admin' && <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <UserGroupIcon onClick={() => { navigate('/Dashboard/students'); setSlcComponent('Students') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>}
        {Role == 'Admin' && <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg  ">
          <UsersIcon onClick={() => { navigate('/Dashboard/teachers'); setSlcComponent('Teachers') }} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div>}
      </div>
      <div className="setting flex flex-col justify-start items-center my-1 py-5 border-t-[#e5e5e5] border-t">
        {/* <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg relative">
          <BellAlertIcon onClick={() => setSlcComponent('Notifications')} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
          <div className="numbers absolute size-4 flex justify-center items-center rounded-full text-white text-sm top-1 right-1 bg-green-600 ">0</div>
        </div>
        <div className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg ">
          <Cog6ToothIcon onClick={() => setSlcComponent('Settings')} className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' />
        </div> */}
        <div onClick={handleActive} className="icon  hover:bg-[#e5e5e5] transition-all duration-300 rounded-lg ">
          {/* <Cog6ToothIcon className='size-6 m-2 text-green-600 hover:scale-110 transition-all duration-300 ' /> */}
          <div className="circle border border-green-600 size-6  m-2 rounded-4xl overflow-hidden ">
            {localStorage.getItem('DP') && localStorage.getItem('DP') !== "undefined" ? <img className='object-cover h-full w-full object-center' src={`http://localhost:3031/User_dp/${localStorage.getItem('DP')}`} alt="user" /> : <img className='object-cover h-full w-full object-center' src={`http://localhost:3031/User_dp/Default.jpg`} alt="user" />}
          </div>
        </div>
        {active == true &&
          <div onClick={() => { setactive(!active); setImageSrc('') }} className="backdrop  absolute w-screen h-screen bg-[#2b1e1e3f] bottom-0 left-0 z-95">
            <div onClick={(e) => { e.stopPropagation(); }} className="box absolute bottom-4 left-15 z-[120]">
              <div className="bg-white text-gray-800 rounded-xl p-6 w-full max-w-sm shadow-lg mx-auto border border-green-500">
               {/* Profile Image */}
                <div className="flex flex-col items-center gap-3 relative">
                  <div className="circle border border-green-600 size-32 m-2 rounded-full overflow-hidden object-left ">
                    {imageSrc ? <img src={`${imageSrc}`} className='object-cover h-full w-full object-center' alt="user" /> : data?.userprofile
                      ? <img className='object-cover h-full w-full object-center' src={`http://localhost:3031/User_dp/${data?.userprofile}`} alt="user" />
                      : <img className='object-cover h-full w-full object-center' src={`http://localhost:3031/User_dp/Default.jpg`} alt="user" />}
                  </div>

                  {/* Save */}
                  {
                    imageSrc && <button onClick={handleSave} className=' bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition-all duration-300 w-20 h-10 absolute right-0'>Save</button>
                  }
                  <div className="absolute bg-white z-[110] bottom-15 right-28 shadow-2xl flex justify-center items-center size-7 p-1   rounded-full  ">
                    <label htmlFor="fileInput" className="cursor-pointer">
                      <PencilIcon className="h-5 w-5 text-green-600 cursor-pointer" />
                    </label>
                    <form className='size-10'>
                      <input type="file"
                        id="fileInput"
                        className='w-0 absolute -z-10 opacity-0'
                        onChange={handleFileChange}
                        // src=""
                        // alt=""
                        accept="image/*" />
                    </form>
                  </div>

                  <div className="text-2xl capitalize">{data?.name}</div>
                </div>

                {/* About */}
                <div className="mt-6">
                  <div className="flex justify-between items-center">
                    <label className="text-green-600 text-sm font-medium">Role</label>
                    {/* <PencilIcon className="h-4 w-4 text-green-600 cursor-pointer" /> */}
                  </div>
                  <p className="mt-1 text-gray-700 text-sm">{data?.role}</p>
                </div>

                {/* Phone */}
                <div className="mt-4">
                  <label className="text-green-600 text-sm font-medium ">Email</label>
                  <p className="text-sm mt-1 text-gray-700 capitalize">{data?.email}</p>
                </div>

                {/* Logout */}
                <button onClick={Logout} className="w-full mt-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition-all duration-300">
                  Log out
                </button>

                {/* Info */}
                <p className="text-xs text-gray-500 text-center mt-2">
                  Data history on this computer will be cleared when you log out.
                </p>
              </div>
            </div></div>
        }
      </div>
    </div>
  )
}

export default Sidebar
