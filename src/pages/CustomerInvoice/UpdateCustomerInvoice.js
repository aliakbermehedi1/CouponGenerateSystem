import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdateCustomerInvoice = ({ onHide, fetchInvoice, userData, customerName, nationalID }) => {
  const [formData, setFormData] = useState({
    InvoiceNo: '',
    PurchaseAmount: '',
  });

  useEffect(() => {
    if (userData?.success && userData.data) {
      setFormData({
        InvoiceNo: userData.data.InvoiceNo || '',
        PurchaseAmount: userData.data.PurchaseAmount || '',
      });
    }
  }, [userData]);

  const handleInvoiceNoChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      InvoiceNo: e.target.value.replace(/[^0-9]/g, ''),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      InvoiceNo: parseInt(formData.InvoiceNo, 10),
      PurchaseAmount: parseFloat(formData.PurchaseAmount),
    };

    const invoiceId = userData?.data?.invoiceId;

    if (!invoiceId) return;

    try {
      const response = await axios.put(
        `https://arabian-hunter-backend.vercel.app/api/CustomerInformationInvoice/UpdateInvoice/${invoiceId}`,
        updatedData
      );

      if (response.data.success) {
        fetchInvoice();
        onHide();
        toast.success('Successfully Updated');
      } else {
        toast.error('Failed to update the invoice.');
      }
    } catch (error) {
      toast.error(error.response?.data.message || 'Failed to update the invoice.');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <form onSubmit={handleSubmit} className="p-6.5 pt-1">
        <div className="w-full mb-4">
          <label className="block text-black dark:text-white">Customer Name</label>
          <input
            type="text"
            name="CustomerName"
            value={customerName || ''}
            disabled
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5"
          />
        </div>

        <div className="w-full mb-4">
          <label className="block text-black dark:text-white">National ID</label>
          <input
            type="text"
            name="NationalID"
            value={nationalID || ''}
            disabled
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5"
          />
        </div>

        <div className="w-full mb-4">
          <label className="block text-black dark:text-white">Invoice No</label>
          <input
            type="number"
            name="InvoiceNo"
            value={formData.InvoiceNo}
            onChange={handleInvoiceNoChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5"
          />
        </div>

        <div className="w-full mb-4">
          <label className="block text-black dark:text-white">Purchase Amount</label>
          <input
            type="number"
            name="PurchaseAmount"
            value={formData.PurchaseAmount}
            onChange={handleChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5"
          />
        </div>

        <button type="submit" className="w-full rounded bg-warning p-3 font-medium text-black">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCustomerInvoice;
