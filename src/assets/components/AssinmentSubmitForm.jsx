import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import axiosinstance from '../axios/axios';

const AssignmentSubmitForm = ({ Assignment_id, SetAssignment_id }) => {
    const student_id = localStorage.getItem('id');
    const [assignments, setAssignments] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [formData, setFormData] = useState({
        comment: '',
        file: null,
    });

    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        if (isMobile) {
            axiosinstance.get(`/pending-assignments/${student_id}`)
                .then(res => setAssignments(res.data.data))
                .catch(err => console.log(err));
        }
    }, [student_id]);

    const assignment = isMobile
        ? assignments.find(assign => assign._id === selectedId)
        : Assignment_id;

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!assignment || !formData.file) return toast.error("Please select assignment and upload a file");

        const submission = new FormData();
        submission.append('title', assignment.topic);
        submission.append('total_marks', assignment.total_marks);
        submission.append('teacher_id', assignment.teacher_id._id);
        submission.append('student_id', student_id);
        submission.append('assignment_id', assignment._id);
        submission.append('comment', formData.comment);
        submission.append('file', formData.file);
        submission.append('sending_date', new Date().toISOString());

        try {
            const res = await axiosinstance.post(`/submit_assign/${assignment._id}`, submission);
            toast.success(res.data.message);
            setFormData({ comment: '', file: null });
            if (SetAssignment_id) SetAssignment_id('');
            setSelectedId('');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Submission failed');
        }
    };

    return (
        <div className="max-w-xl mx-auto my-8 px-4">
            <h1 className="text-gray-700 text-[20px] text-center font-qurova mb-2">Submit Assignment</h1>

            {isMobile && (
                <select
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded text-sm bg-white block md:hidden"
                >
                    <option value="">Select Assignment</option>
                    {assignments.map(assign => (
                        <option key={assign._id} value={assign._id}>
                            {assign.topic} - {assign.teacher_id?.name}
                        </option>
                    ))}
                </select>
            )}

            {!assignment ? (
                <p className="text-sm text-gray-500 text-center">Please select an assignment to continue.</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={assignment?.topic}
                        disabled
                        required
                        className="w-full px-4 py-3 rounded-md border bg-gray-100 text-sm"
                    />
                    <input
                        type="text"
                        value={assignment?.teacher_id?.name || 'N/A'}
                        disabled
                        required
                        className="w-full px-4 py-3 rounded-md border bg-gray-100 text-sm"
                    />
                    <textarea
                        name="comment"
                        placeholder="Write any comment (optional)"
                        value={formData.comment}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border bg-white text-sm"
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        required
                        className="w-full"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                    >
                        Submit Assignment
                    </button>
                </form>
            )}
        </div>
    );
};

export default AssignmentSubmitForm;
