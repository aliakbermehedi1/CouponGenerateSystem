import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const RollEdit = ({ onHide, fetchRolls, rollData }) => {
  const [formData, setFormData] = useState({
    RollName: '',
    RollDescription: '',
  });

  useEffect(() => {
    if (rollData?.success && rollData.data) {
      setFormData({
        RollName: rollData.data.RollName || '',
        RollDescription: rollData.data.RollDescription || '',
      });
    }
  }, [rollData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const rollId = rollData?.data?.RollID;
      if (!rollId) return;

      const response = await axios.put(
        `https://arabian-hunter-backend.vercel.app/api/RollMaster/UpdateRole/${rollId}`,
        formData
      );

      if (response.data.success) {
        fetchRolls();
        onHide();
        toast.success('Successfully Updated');
      }
    } catch (error) {
      toast.error('Failed to update the role.');
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

export default RollEdit;
