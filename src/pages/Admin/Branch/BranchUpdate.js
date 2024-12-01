import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const BranchUpdate = ({ onHide, fetchBranch, branchData }) => {
  const [formData, setFormData] = useState({
    BranchName: '',
    BranchDescription: '',
  });

  useEffect(() => {
    if (branchData?.success && branchData.data) {
      setFormData({
        BranchName: branchData.data.BranchName || '',
        BranchDescription: branchData.data.BranchDescription || '',
      });
    } else {
      setFormData({
        BranchName: '',
        BranchDescription: '',
      });
    }
  }, [branchData]);

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
      const branchID = branchData?.data?.BranchID;

      if (!branchID) {
        console.error('BranchID is not available.');
        return;
      }

      const response = await axios.put(
        `https://arabian-hunter-backend.vercel.app/api/branch/UpdateBranch/${branchID}`,
        formData
      );

      if (response.data.success) {
        fetchBranch();
        onHide();
        toast.success('Successfully Updated');
      }
    } catch (error) {
      console.error('Error updating branch:', error);
      toast.error('Failed to update the branch');
    }
  };

  return (
    <div>
      <div className="rounded-sm border bg-white shadow-default">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-black">
              Branch Name <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="BranchName"
              placeholder="Enter Branch Name"
              value={formData.BranchName}
              onChange={handleChange}
              className="w-full py-3 px-5 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-black">
              Branch Description <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="BranchDescription"
              placeholder="Enter Branch Description"
              value={formData.BranchDescription}
              onChange={handleChange}
              className="w-full py-3 px-5 border rounded"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-primary text-gray font-medium rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BranchUpdate;
