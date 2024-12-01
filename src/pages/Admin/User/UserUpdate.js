import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserUpdate = ({ onHide, fetchUser, userData }) => {
  const [formData, setFormData] = useState({
    UserName: '',
    LoginID: '',
    Password: '',
    RealPassword: '',
    BranchName: '',
    RollName: '',
  });

  const [branchID, setBranchID] = useState([]);
  const [rollID, setRollID] = useState([]);

  useEffect(() => {
    if (userData?.success && userData.data) {
      setFormData({
        UserName: userData.data.UserName || '',
        LoginID: userData.data.LoginID || '',
        Password: userData.data.Password || '',
        RealPassword: userData.data.RealPassword || '',
        BranchName: userData.data.BranchName || '',
        RollName: userData.data.RollName || '',
      });
    }
  }, [userData]);

  const fetchBranchDropdown = async () => {
    try {
      const response = await axios.get('https://arabian-hunter-backend.vercel.app/api/branch/GetBranches');
      if (response.data.success) setBranchID(response.data.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const fetchRollDropdown = async () => {
    try {
      const response = await axios.get('https://arabian-hunter-backend.vercel.app/api/RollMaster/GetRoles');
      if (response.data.success) setRollID(response.data.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  useEffect(() => {
    fetchBranchDropdown();
    fetchRollDropdown();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({ ...prevState, RealPassword: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = userData?.data?.UserID;
    if (!userID) return;

    try {
      const response = await axios.put(`https://arabian-hunter-backend.vercel.app/api/userInfo/UpdateUser/${userID}`, formData);
      if (response.data.success) {
        fetchUser();
        onHide();
        toast.success('Successfully Updated');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update the user.');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default">
      <form onSubmit={handleSubmit} className="p-6.5 pt-1">
        <div className="w-full mb-4">
          <label className="block text-black">User Name *</label>
          <input
            type="text"
            name="UserName"
            placeholder="Enter User Name"
            value={formData.UserName}
            onChange={handleChange}
            className="w-full rounded border py-3 px-5"
          />
        </div>

        <div className="w-full mb-4 mt-2">
          <label className="block text-black">Branch Name *</label>
          <select
            name="BranchName"
            value={formData.BranchName}
            onChange={handleChange}
            className="w-full rounded border py-3 px-5"
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
          <label className="block text-black">Roll Name *</label>
          <select
            name="RollName"
            value={formData.RollName}
            onChange={handleChange}
            className="w-full rounded border py-3 px-5"
          >
            <option value="">Select Roll</option>
            {rollID.map((roll) => (
              <option key={roll._id} value={roll.RollName}>
                {roll.RollName}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mb-4">
          <label className="block text-black">Login ID *</label>
          <input
            type="text"
            name="LoginID"
            placeholder="Enter Login ID"
            value={formData.LoginID}
            onChange={handleChange}
            className="w-full rounded border py-3 px-5"
          />
        </div>

        <div className="w-full mb-4">
          <label className="block text-black">Password *</label>
          <input
            type="password"
            name="Password"
            placeholder="Enter Password"
            value={formData.RealPassword}
            onChange={handlePasswordChange}
            className="w-full rounded border py-3 px-5"
          />
        </div>

        <button
          type="submit"
          className="w-full justify-center rounded bg-warning p-3 font-medium text-black mt-3"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UserUpdate;
