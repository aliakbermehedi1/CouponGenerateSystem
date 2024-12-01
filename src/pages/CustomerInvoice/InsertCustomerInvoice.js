import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const InsertCustomerInvoice = ({ onHide, fetchCustomersInvoice, customerName, nationalID, customerID }) => {
  const [formData, setFormData] = useState({
    CustomerName: customerName,
    NationalID: '',
    InvoiceNo: '',
    PurchaseAmount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInvoiceNoChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFormData((prevData) => ({
      ...prevData,
      InvoiceNo: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdFrom = localStorage.getItem('BranchName') || '';
    const createdBy = localStorage.getItem('UserName') || '';

    try {
      const response = await axios.post(
        'https://arabian-hunter-backend.vercel.app/api/CustomerInformationInvoice/InsertInvoice',
        {
          ...formData,
          CustomerID: customerID,
          CreatedBy: createdBy,
          CreatedFrom: createdFrom,
        }
      );

      if (response.data.success) {
        toast.success('Invoice inserted successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        onHide();
        fetchCustomersInvoice();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to insert Invoice!';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit} className="p-6.5 pt-1">
          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">Customer Name</label>
            <input
              type="text"
              name="CustomerName"
              value={customerName || ''}
              disabled
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">National ID <span className="text-meta-1">*</span></label>
            <input
              type="text"
              name="NationalID"
              value={nationalID || ''}
              disabled
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">Invoice No <span className="text-meta-1">*</span></label>
            <input
              type="number"
              name="InvoiceNo"
              value={formData.InvoiceNo}
              onChange={handleInvoiceNoChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">Purchase Amount <span className="text-meta-1">*</span></label>
            <input
              type="number"
              name="PurchaseAmount"
              value={formData.PurchaseAmount}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium"
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

export default InsertCustomerInvoice;
