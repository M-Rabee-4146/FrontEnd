import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import axiosinstance from '../../../axios/axios';

const InstallmentTable = () => {
    const studentId = localStorage.getItem('id');
    const [installments, setInstallments] = useState([]);

    useEffect(() => {
        axiosinstance.get(`/student-installments/${studentId}`)
            .then(res => setInstallments(res.data.data))
            .catch(err => console.error(err));
    }, []);

    const handleInstallmentPayment = (feeId, index) => {
        axiosinstance.put(`/fee/pay/${feeId}/${index}`)
            .then(res => {
                toast.success(res.data.message);
                axiosinstance.get(`/student-installments/${studentId}`)
                    .then(res => setInstallments(res.data.data));
            })
            .catch(err => {
                toast.error(err.response?.data?.message || 'Payment failed');
            });
    };

    return (
        <div className="p-4 w-full overflow-x-auto">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Fee Installment Details</h2>
            {installments.length === 0 ? (
                <p className="text-gray-600 text-center">No installment records found.</p>
            ) : (
                installments.map((fee, i) => (
                    <div key={i} className="border border-green-500 rounded-lg p-4 mb-6 bg-white">
                        <h3 className="text-lg font-bold text-gray-700">{fee?.course_id?.title}</h3>
                        <p className="text-sm text-gray-600">Payment Method: <span className="font-medium">{fee.payment_method}</span></p>
                        <p className="text-sm text-gray-600">Total Fee: <span className="font-medium">$ {fee.total_fee}</span></p>
                        <p className="text-sm text-gray-600">paid Fee: <span className="font-medium">$ {fee.paid_amount}</span></p>

                        {fee.payment_method === 'installment' && (
                            <div className="mt-4">
                                <h4 className="text-md font-semibold mb-2">Installments</h4>
                                <div className="overflow-x-auto">
                                    <table className='w-full border border-gray-300 rounded-2xl'>
                                        <thead>
                                            <tr >
                                                <th className='lg:min-w-20  min-w-24 text-gray-700 font-bold '>
                                                    No.
                                                </th>
                                                <th className='lg:px-12   min-w-24 h-12 text-gray-700 font-bold'>
                                                    Amount                                                </th>
                                                <th className='lg:min-w-28  min-w-24 text-gray-700 font-bold'>
                                                    Due Date
                                                </th>
                                                <th className='lg:min-w-28  min-w-24 text-gray-700 font-bold'>
                                                    status
                                                </th>
                                                <th className='lg:min-w-28  min-w-24 text-gray-700 font-bold'>
                                                    Paid on
                                                </th>
                                            </tr>
                                        </thead>
                                        {fee.installments.map((inst, index) => (


                                            <tbody className='border-y  border-y-gray-300'>
                                                <tr className='py-3'>
                                                    <td className=''>
                                                        <div className="product w-full min-h-max  max-h-52 py-3 px-1 flex justify-center ">
                                                            <div className="txt  px-2 ">
                                                                <h1 className=" mb-2 text-gray-700 font-semibold ">{index + 1}  </h1>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className=''>
                                                        <div className="product w-full min-h-max  max-h-52 py-3 px-1 flex justify-center ">
                                                            <div className="txt  px-2 ">
                                                                <h1 className=" mb-2 text-gray-700 font-semibold ">$ {inst.amount}  </h1>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className=''>
                                                        <div className="product w-full min-h-max  max-h-52 py-3 px-1 flex justify-center ">
                                                            <div className="txt  px-2 ">
                                                                <h1 className=" mb-2 text-gray-700 font-semibold ">{dayjs(inst.due_date).format('DD MMM YYYY')}  </h1>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className=''>
                                                        <div className="product w-full min-h-max  max-h-52 py-3 px-1 flex justify-center ">
                                                            <div className="txt  px-2 ">
                                                                <h1 className=" mb-2 text-gray-700 font-semibold "> {inst.paid ? (
                                                                    <span className="text-green-600 font-medium">Paid</span>
                                                                ) : (
                                                                    <span className="text-red-500 font-medium">Unpaid</span>
                                                                )}  </h1>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className=''>
                                                        <div className="product w-full min-h-max  max-h-52 py-3 px-1 flex justify-center ">
                                                            <div className="txt  px-2 ">
                                                                <h1 className=" mb-2 text-gray-700 font-semibold ">  {inst.paid_on ? dayjs(inst.paid_on).format('DD MMM YYYY') : '—'} </h1>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className=''>
                                                        <div className="product w-full py-3 flex flex-col items-center justify-center">
                                                            {inst.paid ?
                                                               'Done' :
                                                              
                                                            <button
                                                                onClick={() => handleInstallmentPayment(fee._id, index)}
                                                                className="text-sm mt-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                            >
                                                                Pay Now
                                                            </button>
                                                        
                                                    }
                                                        </div>
                                                    </td>

                                                </tr>
                                            </tbody>))}

                                    </table>
                                    {/* <table className="min-w-full text-sm border border-collapse">
                                        <thead>
                                            <tr className="bg-green-100 text-left">
                                                <th className="p-2 border">No.</th>
                                                <th className="p-2 border">Amount</th>
                                                <th className="p-2 border">Due Date</th>
                                                <th className="p-2 border">Status</th>
                                                <th className="p-2 border">Paid On</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fee.installments.map((inst, index) => (
                                                <tr key={index} className="border-t">
                                                    <td className="p-2 border">{index + 1}</td>
                                                    <td className="p-2 border">$ {inst.amount}</td>
                                                    <td className="p-2 border">{dayjs(inst.due_date).format('DD MMM YYYY')}</td>
                                                    <td className="p-2 border">
                                                        {inst.paid ? (
                                                            <span className="text-green-600 font-medium">Paid</span>
                                                        ) : (
                                                            <span className="text-red-500 font-medium">Unpaid</span>
                                                        )}
                                                    </td>
                                                    <td className="p-2 border">
                                                        {inst.paid_on ? dayjs(inst.paid_on).format('DD MMM YYYY') : '—'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table> */}
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default InstallmentTable;
