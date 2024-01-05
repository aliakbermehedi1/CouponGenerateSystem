import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

type branchData = {
  success: boolean;
  data?: {
    BranchID: number;
    BranchName: string;
    BranchDescription: string;
  };
};

type UpdateProps = {
  onHide: () => void;
  fetchBranch: () => void;
  branchData?: branchData;
};

const BranchUpdate: React.FC<UpdateProps> = ({
  onHide,
  fetchBranch,
  branchData,
}) => {
  const [formData, setFormData] = useState<{
    BranchName: string;
    BranchDescription: string;
  }>({
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
      // Set default values here if needed
      setFormData({
        BranchName: '',
        BranchDescription: '',
      });
    }
  }, [branchData]);

  console.log('FormData:', formData); // Log to see the received branchData

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get RollID from branchData prop
      const branchID = branchData?.data?.BranchID;

      if (!branchID) {
        console.error('BranchID is not available.');
        return;
      }

      // Make a PUT request to update the role
      const response = await axios.put(
        `http://localhost:8080/api/branch/UpdateBranch/${branchID}`,
        formData,
      );

      if (response.data.success) {
        fetchBranch(); // Fetch updated roles list
        onHide(); // Close the modal or navigate to another page if needed

        toast.success('Successfully Updated', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error updating role:', error);

      toast.error('Failed to update the role.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit} className="p-6.5 pt-1">
          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">
              Branch Name <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="BranchName"
              placeholder="Enter Branch Name"
              value={formData.BranchName}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">
              Branch Description <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="BranchDescription"
              placeholder="Enter Branch Description"
              value={formData.BranchDescription}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
    </div>
  );
};

export default BranchUpdate;
