import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

type userData = {
  success: boolean;
  data?: {
    UserID: number;
    UserName: string;
    LoginID: string;
    Password: string;
    RealPassword: string;
    BranchName: string;
    RollName: string;
  };
};

type UpdateProps = {
  onHide: () => void;
  fetchUser: () => void;
  userData?: userData;
};

const UserUpdate: React.FC<UpdateProps> = ({ onHide, fetchUser, userData }) => {
  const [formData, setFormData] = useState<{
    UserName: string;
    LoginID: string;
    Password: string;
    RealPassword: string;
    BranchName: string;
    RollName: string;
  }>({
    UserName: '',
    LoginID: '',
    BranchName: '',
    RollName: '',
    Password: '',
    RealPassword: '',
  });

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
    } else {
      // Set default values here if needed
      setFormData({
        UserName: '',
        LoginID: '',
        Password: '',
        RealPassword: '',
        BranchName: '',
        RollName: '',
      });
    }
  }, [userData]);

  console.log('FormData:', formData); // Log to see the received userData

  //START DROPDOWN
  //   Start Dropdown States
  const [branchID, setBranchID] = useState<any[]>([]); //Branch Dropdown
  const [rollID, setRollID] = useState<any[]>([]); //Branch Dropdown

  // START DRODPOWN
  //Branch Dropdown
  const fetchBranchDropdown = async () => {
    try {
      const response = await axios.get(
        `https://arabian-hunter-backend.vercel.app/api/branch/GetBranches`,
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
        `https://arabian-hunter-backend.vercel.app/api/RollMaster/GetRoles`,
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
  // END DROPDOWN

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Separate handleChange specifically for the Password field
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      RealPassword: value,
    }));
  };
  

  // START HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get UserID from userData prop
      const userID = userData?.data?.UserID;

      if (!userID) {
        console.error('UserID is not available.');
        return;
      }

      // Make a PUT request to update the user
      const response = await axios.put(
        `https://arabian-hunter-backend.vercel.app/api/userInfo/UpdateUser/${userID}`,
        formData,
      );

      if (response.data.success) {
        // Assuming you have functions like fetchUser and onHide implemented elsewhere in your code
        fetchUser(); // Fetch updated user details
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
      console.error('Error updating user:', error);

      toast.error('Failed to update the user.', {
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

  // END HANDLE SUBMIT

  return (
    <div className="">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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

          {/* Login ID */}
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
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Password */}
          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">
              Password <span className="text-meta-1">*</span>
            </label>
            <input
              type="text" // Change the input type to 'password'
              name="Password"
              placeholder="Enter Password"
              value={formData.RealPassword}
              onChange={handlePasswordChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-warning p-3 font-medium text-black mt-3"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
