import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BranchInsert = ({ onHide, fetchBranch }) => {
  const [formData, setFormData] = useState({
    BranchName: '',
    BranchDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://arabian-hunter-backend.vercel.app/api/branch/AddBranch',
        formData
      );

      if (response.data.success) {
        toast.success('Branch inserted successfully!');
        onHide();
        fetchBranch();
      }
    } catch (error) {
      toast.error('Failed to insert branch!');
    }
  };

  return (
    <div className="rounded-sm border bg-white shadow-default">
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-4">
          <label className="block text-black">Branch Name <span className="text-meta-1">*</span></label>
          <input
            type="text"
            name="BranchName"
            value={formData.BranchName}
            onChange={handleChange}
            placeholder="Enter Branch Name"
            className="w-full py-3 px-5 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black">Branch Description <span className="text-meta-1">*</span></label>
          <input
            type="text"
            name="BranchDescription"
            value={formData.BranchDescription}
            onChange={handleChange}
            placeholder="Enter Branch Description"
            className="w-full py-3 px-5 border rounded"
          />
        </div>

        <button type="submit" className="w-full py-3 bg-primary text-gray font-medium rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BranchInsert;
