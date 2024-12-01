import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserInsert = ({ onHide, fetchUser }) => {
  const [formData, setFormData] = useState({
    UserName: '',
    BranchName: '',
    RollName: '',
    LoginID: '',
    Password: '',
  });

  const [branchID, setBranchID] = useState([]);
  const [rollID, setRollID] = useState([]);

  const fetchBranchDropdown = async () => {
    try {
      const response = await axios.get(
        'https://arabian-hunter-backend.vercel.app/api/branch/GetBranches'
      );
      if (response.data.success) {
        setBranchID(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRollDropdown = async () => {
    try {
      const response = await axios.get(
        'https://arabian-hunter-backend.vercel.app/api/RollMaster/GetRoles'
      );
      if (response.data.success) {
        setRollID(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBranchDropdown();
    fetchRollDropdown();
  }, []);

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
        'https://arabian-hunter-backend.vercel.app/api/userInfo/AddUser',
        formData
      );
      if (response.data.success) {
        toast.success('User inserted successfully!', { autoClose: 3000 });
        onHide();
        fetchUser();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to insert User!', { autoClose: 3000 });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-6.5 pt-1">
        <div className="w-full mb-4">
          <label className="block text-black dark:text-white">
            User Name <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            name="UserName"
            placeholder="Enter User Name"
            value={formData.UserName}
            onChange={handleChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5"
          />
        </div>

        <div className="w-full mb-4 mt-2">
          <label className="block text-black dark:text-white">
            Branch Name <span className="text-meta-1">*</span>
          </label>
          <select
            name="BranchName"
            value={formData.BranchName}
            onChange={handleChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5"
          >
            <option value="">Select Branch</option>
            {branchID.map((branch) => (
              <option key={branch._id} value={branch.BranchName}>
                {branch.BranchName}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mb-4 mt-2">
          <label className="block text-black dark:text-white">
            Roll Name <span className="text-meta-1">*</span>
          </label>
          <select
            name="RollName"
            value={formData.RollName}
            onChange={handleChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5"
          >
            <option value="">Select Roll</option>
            {rollID.map((roll) => (
              <option key={roll._id} value={roll.RollName}>
                {roll.RollName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">
              Login ID <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="LoginID"
              placeholder="Enter Login ID"
              value={formData.LoginID}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">
              Password <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="Password"
              placeholder="Enter Password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5"
            />
          </div>
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

export default UserInsert;
