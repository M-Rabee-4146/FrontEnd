import React from "react";
// import { Facebook, Instagram, Mail, Phone, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { ChevronUpIcon, PhoneIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Socials */}
        <div>
          {/* <img src="/logo.svg" alt="LearnerO" className="w-10 mb-4" /> */}
           <h1 className='text-green-500 text-4xl  font-qurova w-10' >LearnerO</h1>
          <p className="text-sm mb-3 font-semibold">Live life of a Learner</p>
          <div className="flex gap-3">
            <a href="#" className="hover:text-green-600">
              {/* <Facebook size={20} /> */}
            </a>
            <a href="#" className="hover:text-green-600">
              {/* <Instagram size={20} /> */}
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-md font-semibold mb-3 text-base">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-green-600 hover:text-base transition-all duration-300">Home</Link></li>
            <li><Link to="/courses" className="hover:text-green-600 hover:text-base transition-all duration-300">Courses</Link></li>
            <li><Link to="/about" className="hover:text-green-600 hover:text-base transition-all duration-300">About</Link></li>
            <li><Link to="/contact" className="hover:text-green-600 hover:text-base transition-all duration-300">Contact</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-md font-semibold mb-3">Policies</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600 hover:text-base transition-all duration-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-600 hover:text-base transition-all duration-300">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-md font-semibold mb-3">Contact</h3>
          <div className="flex items-start gap-2 text-sm mb-2">
            {/* <Mailicon size={16} /> */}
            <a href="mailto:rabijamil8@gmail.com" className="hover:text-green-600 hover:text-base transition-all duration-300">rabijamil8@gmail.com</a>
          </div>
          <div className="flex items-start gap-2 text-sm hover:text-green-600 hover:text-base transition-all duration-300">
            <PhoneIcon className="size-5" />
            <a  href="tel:+923094053841" className="">+92 309 4053841</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <div className="text-center py-3 border-t border-gray-200 text-sm">
        © 2025 LearnerO. All rights reserved.
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition"
        >
          <ChevronUpIcon className="size-5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
