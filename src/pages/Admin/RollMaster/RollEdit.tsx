import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

type RollData = {
  success: boolean;
  data?: {
    RollID: number
    RollName: string;
    RollDescription: string;
  };
};


type UpdateProps = {
  onHide: () => void;
  fetchRolls: () => void;
  rollData?: RollData;
};

const RollEdit: React.FC<UpdateProps> = ({ onHide, fetchRolls, rollData }) => {
  const [formData, setFormData] = useState<{ RollName: string; RollDescription: string }>({
    RollName: '',
    RollDescription: '',
  });
  
  
  useEffect(() => {
    if (rollData?.success && rollData.data) {
      setFormData({
        RollName: rollData.data.RollName || '',
        RollDescription: rollData.data.RollDescription || '',
      });
    } else {
      // Set default values here if needed
      setFormData({
        RollName: '',
        RollDescription: '',
      });
    }
  }, [rollData]);
  
  
  console.log("FormData:", formData); // Log to see the received rollData
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Get RollID from rollData prop
      const rollId = rollData?.data?.RollID;
  
      if (!rollId) {
        console.error('RollID is not available.');
        return;
      }
  
      // Make a PUT request to update the role
      const response = await axios.put(
        `http://localhost:8080/api/RollMaster/UpdateRole/${rollId}`,
        formData
      );
  
      if (response.data.success) {
        fetchRolls(); // Fetch updated roles list
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
              Roll Name <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="RollName"
              placeholder="Enter Roll Name"
              value={formData.RollName}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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

export default RollEdit;
