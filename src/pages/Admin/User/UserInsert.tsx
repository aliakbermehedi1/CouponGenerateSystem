import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

type RollInsertProps = {
  onHide: () => void;
  fetchUser: () => void;
};

const UserInsert: React.FC<RollInsertProps> = ({ onHide, fetchUser }) => {
  const [formData, setFormData] = useState({
    UserName: '',
    BranchName: '',
    RollName: '',
    LoginID: '',
    Password: '',
  });

  //   Start Dropdown States
  const [branchID, setBranchID] = useState<any[]>([]); //Branch Dropdown
  const [rollID, setRollID] = useState<any[]>([]); //Branch Dropdown

  // START DRODPOWN
  //Branch Dropdown
  const fetchBranchDropdown = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/branch/GetBranches`,
      );
      if (response.data.success) {
        setBranchID(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }; //end
  //Roll Dropdown
  const fetchRollDropdown = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/RollMaster/GetRoles`,
      );
      if (response.data.success) {
        setRollID(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching roll:', error);
    }
  }; //end

  useEffect(() => {
    fetchBranchDropdown();
    fetchRollDropdown();
  }, []);
  //   END DRODPOWN

  //   handle change for drodpown
  const handleChangeForDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/userInfo/AddUser',
        formData,
      );
      if (response.data.success) {
        console.log('User inserted successfully!', response.data);

        // Display a success toast message
        toast.success('User inserted successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onHide(); 
        fetchUser();
      }
    } catch (error) {
      console.error('Error inserting role:', error);

      // Handle the error scenario (e.g., show an error toast, alert, etc.)
      toast.error('Failed to insert User!', {
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
          {/* User Name */}
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
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Branch Dropdown */}
          <div className="w-full mb-4 mt-2">
            <label className="block text-black dark:text-white">
              Branch Name <span className="text-meta-1">*</span>
            </label>
            <select
              name="BranchName"
              value={formData.BranchName}
              onChange={handleChangeForDropdown}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
            >
              <option value="">Select Branch</option>
              {branchID.map((branch) => (
                <option key={branch._id} value={branch.BranchName}>
                  {branch.BranchName}
                </option>
              ))}
            </select>
          </div>
          {/* Roll Dropdown */}
          <div className="w-full mb-4 mt-2">
            <label className="block text-black dark:text-white">
              Roll Name <span className="text-meta-1">*</span>
            </label>
            <select
              name="RollName"
              value={formData.RollName}
              onChange={handleChangeForDropdown}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
            >
              <option value="">Select Roll</option>
              {rollID.map((roll) => (
                <option key={roll._id} value={roll.RollName}>
                  {roll.RollName}
                </option>
              ))}
            </select>
          </div>

          {/* Login ID*/}
          <div className="grid grid-cols-2 gap-2">
            <div className="w-full mb-4 col-span-1">
              <label className="block text-black dark:text-white">
                Login ID <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="LoginID"
                placeholder="Enter Login ID"
                value={formData.LoginID}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full mb-4 col-span-1">
              <label className="block text-black dark:text-white">
                Password<span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="Password"
                placeholder="Enter Password"
                value={formData.Password}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>

          {/* Submit Button */}
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

export default UserInsert;
