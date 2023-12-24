import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

type CustomerInsertProps = {
  onHide: () => void;
  fetchCustomers: () => void;
};

const CustomerInsert: React.FC<CustomerInsertProps> = ({ onHide, fetchCustomers }) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      console.log('all data: ', formData);
      const response = await axios.post(
        'http://localhost:8080/api/CustomerInformation/InsertCustomer',
        formData,
      );
  
      if (response.data.success) {
        console.log('Customer inserted successfully!', response.data);
        // Display toast message
        toast.success('Customer inserted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        // Optionally, reset the form or show a success message
        onHide();
        fetchCustomers();
      }
    } catch (error) {
      console.error('Error inserting customer:', error);
      // Handle error scenario
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
