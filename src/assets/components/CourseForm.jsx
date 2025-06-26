import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';
import axiosinstance from '../axios/axios';

const CourseForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    fee: '',
    teacher_id: localStorage.getItem('id'),
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error('Please select an image.');

    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => form.append(key, val));
    form.append('image', image);

    try {
      const res = await axiosinstance.post('/create_course', form);
      toast.success(res.data.message);
      setFormData({ title: '', description: '', category: '', fee: '', teacher_id: formData.teacher_id });
      removeImage();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Course creation failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Create New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Image Upload */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50 relative"
          onClick={() => document.getElementById('imageUpload').click()}
        >
          {previewUrl ? (
            <>
              <img src={previewUrl} alt="Preview" className="h-40 object-contain mb-2" />
            </>
          ) : (
            <>
              <DocumentArrowUpIcon className="size-10 text-gray-400 mb-2"/>
              <p className="text-sm text-gray-500 text-center">
                Drag & Drop or <span className="text-green-600 font-medium">Click</span> to upload course image
              </p>
              <p className="text-xs text-gray-400 mt-1">Accepted: .jpg, .png (max 5MB)</p>
            </>
          )}
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Course Title"
          required
          className="w-full px-4 py-3 rounded-md border bg-gray-100 focus:border-green-500 focus:bg-white focus:outline-none text-sm  border-gray-300"
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Course Description"
          rows="4"
          required
          className="w-full px-4 py-3 rounded-md border bg-gray-100 focus:border-green-500 focus:bg-white focus:outline-none text-sm resize-none  border-gray-300"
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category (e.g., Web Development)"
          required
          className="w-full px-4 py-3 rounded-md border bg-gray-100 focus:border-green-500 focus:bg-white focus:outline-none text-sm  border-gray-300"
        />

        {/* Fee */}
        <input
          type="number"
          name="fee"
          value={formData.fee}
          onChange={handleChange}
          placeholder="Course Fee"
          required
          className="w-full px-4 py-3 rounded-md border bg-gray-100 focus:border-green-500 focus:bg-white focus:outline-none text-sm  border-gray-300"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
