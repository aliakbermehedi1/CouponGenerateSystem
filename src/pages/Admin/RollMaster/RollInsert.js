import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RollInsert = ({ onHide, fetchRolls }) => {
  const [formData, setFormData] = useState({
    RollName: '',
    RollDescription: '',
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
      const response = await axios.post(
        'https://arabian-hunter-backend.vercel.app/api/RollMaster/AddRole',
        formData
      );

      if (response.data.success) {
        toast.success('Role inserted successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        onHide();
        fetchRolls();
      }
    } catch (error) {
      toast.error('Failed to insert role!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <form onSubmit={handleSubmit} className="p-6.5 pt-1">
        <div className="w-full mb-4">
          <label className="block text-black dark:text-white">
            Roll Name <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            name="RollName"
            placeholder="Enter Roll Name"
            value={formData.RollName}
            onChange={handleChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none"
          />
        </div>

        <div className="w-full mb-4">
          <label className="block text-black dark:text-white">
            Roll Description <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            name="RollDescription"
            placeholder="Enter Roll Description"
            value={formData.RollDescription}
            onChange={handleChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none"
          />
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RollInsert;
