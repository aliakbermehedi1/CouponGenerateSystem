import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify'; // Import the toast function
import axios from 'axios';

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

type CustomerUpdateProps = {
  onHide: () => void;
  fetchCustomers: () => void;
  customerData?: {
    CustomerName: string;
    NationalID: string;
    CustomerAddress: string;
    ContactNo: string;
    Email: string;
  };
};

const CustomerUpdate: React.FC<CustomerUpdateProps> = ({
  onHide,
  fetchCustomers,
  customerData,
}) => {
  const [formData, setFormData] = useState({
    CustomerName: '',
    NationalID: '',
    CustomerAddress: '',
    ContactNo: '',
    Email: '',
  });

  // Update formData with customerData if it exists
  useEffect(() => {
    if (customerData) {
      setFormData(customerData);
    }
  }, [customerData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updatedBy = localStorage.getItem('UserName') || '';
  const updatedFrom = localStorage.getItem('BranchName') || '';
  console.log('UserName', updatedBy);
  console.log('Userfrom', updatedFrom);
  // START HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Retrieve UserName and BranchName from localStorage
      const updatedBy = localStorage.getItem('UserName') || '';
      const updatedFrom = localStorage.getItem('BranchName') || '';

      // Add UpdatedBy and UpdatedFrom to formData
      const updatedFormData = {
        ...formData,
        UpdatedBy: updatedBy,
        UpdatedFrom: updatedFrom,
      };

      // Make API call to update customer details
      const response = await axios.put(
        'https://arabian-hunter-backend.vercel.app/api/CustomerInformation/UpdateCustomer',
        updatedFormData,
      );

      if (response.data.success) {
        fetchCustomers(); // Fetch updated customer list
        onHide(); // Close the modal or navigate to another page

        // Display a success toast message
        toast.success('Successfully Updated', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error: unknown) {
      console.error('Error updating customer:', error);

      // Narrowing down the error type based on the ErrorResponse interface
      const err = error as ErrorResponse;

      if (err.response && err.response.data && err.response.data.message) {
        if (err.response.data.message.includes('Duplicate National ID')) {
          toast.error('Duplicate National ID!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error('Failed to Update Customer!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        toast.error('Failed to Update Customer!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  //END HANDLE SUBMIT

  return (
    <div className="">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit} className="p-6.5 pt-1">
          {/* Customer Name */}
          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">
              Customer Name <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="CustomerName"
              placeholder="Enter Customer Name"
              value={formData.CustomerName}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* National ID */}
          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">
              National ID <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="NationalID"
              placeholder="Enter National ID"
              value={formData.NationalID}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Customer Address */}
          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">
              Customer Address <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="CustomerAddress"
              placeholder="Enter Customer Address"
              value={formData.CustomerAddress}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Contact No. */}
          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">
              Contact No. <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="ContactNo"
              placeholder="Enter Contact Number"
              value={formData.ContactNo}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Email */}
          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">Email</label>
            <input
              type="email"
              name="Email"
              placeholder="Enter email address"
              value={formData.Email}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex w-full justify-center rounded bg-warning p-3 font-medium text-black font-semibold mt-3"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerUpdate;
