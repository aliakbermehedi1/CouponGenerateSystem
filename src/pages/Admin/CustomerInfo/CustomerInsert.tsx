import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface CustomerInsertProps {
  onHide: () => void;
  fetchCustomers: () => void;
}
const CustomerInsert: React.FC<CustomerInsertProps> = ({
  onHide,
  fetchCustomers,
}) => {
  const [formData, setFormData] = useState({
    CustomerName: '',
    NationalID: '',
    CustomerAddress: '',
    ContactNo: '',
    Email: '',
    StatusID: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Retrieve UserName and BranchName from localStorage
      const createdFrom = localStorage.getItem('BranchName') || '';
      const createdBy = localStorage.getItem('UserName') || '';

      // Add CreatedFrom and CreatedBy to formData
      const updatedFormData = {
        ...formData,
        CreatedFrom: createdFrom,
        CreatedBy: createdBy,
      };

      const response = await axios.post(
        'https://arabian-hunter-backend.vercel.app/api/CustomerInformation/InsertCustomer',
        updatedFormData,
      );

      if (response.data.success) {
        toast.success('Customer inserted successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        onHide();
        fetchCustomers();
      }
    } catch (error: any) {
      console.error('Error inserting customer:', error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (
          error.response.data.message.includes(
            'Customer with the given National ID already exists',
          )
        ) {
          toast.error('Customer National ID already exists!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(error.response.data.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        toast.error('Failed to insert Customer!', {
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
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-3"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerInsert;
