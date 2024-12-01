import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const CustomerUpdate = ({ onHide, fetchCustomers, customerData }) => {
  const [formData, setFormData] = useState({
    CustomerName: '',
    NationalID: '',
    CustomerAddress: '',
    ContactNo: '',
    Email: '',
  });

  useEffect(() => {
    if (customerData) setFormData(customerData);
  }, [customerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBy = localStorage.getItem('UserName') || '';
      const updatedFrom = localStorage.getItem('BranchName') || '';

      const updatedFormData = {
        ...formData,
        UpdatedBy: updatedBy,
        UpdatedFrom: updatedFrom,
      };

      const response = await axios.put(
        'https://arabian-hunter-backend.vercel.app/api/CustomerInformation/UpdateCustomer',
        updatedFormData
      );

      if (response.data.success) {
        fetchCustomers();
        onHide();
        toast.success('Successfully Updated', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('Failed to Update Customer!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default">
        <form onSubmit={handleSubmit} className="p-6.5 pt-1">
          {['CustomerName', 'NationalID', 'CustomerAddress', 'ContactNo', 'Email'].map((field) => (
            <div key={field} className="w-full mb-4">
              <label className="block text-black">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type={field === 'Email' ? 'email' : 'text'}
                name={field}
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                value={formData[field]}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5"
              />
            </div>
          ))}
          <button type="submit" className="flex w-full justify-center rounded bg-warning p-3 font-medium mt-3">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerUpdate;
