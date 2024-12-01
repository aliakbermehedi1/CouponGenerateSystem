import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CustomerInsert = ({ onHide, fetchCustomers }) => {
  const [formData, setFormData] = useState({
    CustomerName: '',
    NationalID: '',
    CustomerAddress: '',
    ContactNo: '',
    Email: '',
    StatusID: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdFrom = localStorage.getItem('BranchName') || '';
      const createdBy = localStorage.getItem('UserName') || '';
      const updatedFormData = { ...formData, CreatedFrom: createdFrom, CreatedBy: createdBy };

      const response = await axios.post(
        'https://arabian-hunter-backend.vercel.app/api/CustomerInformation/InsertCustomer',
        updatedFormData
      );

      if (response.data.success) {
        toast.success('Customer inserted successfully!');
        onHide();
        fetchCustomers();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to insert Customer!');
    }
  };

  return (
    <div className="rounded-sm border bg-white shadow-default">
      <form onSubmit={handleSubmit} className="p-6.5 pt-1">
        {['CustomerName', 'NationalID', 'CustomerAddress', 'ContactNo', 'Email'].map((field) => (
          <div className="w-full mb-4" key={field}>
            <label className="block text-black">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
            <input
              type={field === 'Email' ? 'email' : 'text'}
              name={field}
              placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').trim()}`}
              value={formData[field]}
              onChange={handleChange}
              className="w-full rounded border py-3 px-5 font-medium outline-none"
            />
          </div>
        ))}
        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 text-gray mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomerInsert;
