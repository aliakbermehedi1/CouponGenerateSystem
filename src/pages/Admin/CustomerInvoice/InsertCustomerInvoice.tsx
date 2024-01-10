import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type CustomerInvoiceInsertProps = {
  onHide: () => void;
  fetchCustomersInvoice: () => void;
  customerID: string | null; // Change the type here
  customerName: string | null; // Change the type here
  nationalID: string | null; // Change the type here
};

const InsertCustomerInvoice: React.FC<CustomerInvoiceInsertProps> = ({
  onHide,
  fetchCustomersInvoice,
  customerName,
  nationalID,
  customerID,
}) => {
  const [formData, setFormData] = useState({
    CustomerName: customerName,
    NationalID: '',
    InvoiceNo: '',
    PurchaseAmount: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInvoiceNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setFormData((prevData) => ({
      ...prevData,
      InvoiceNo: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Retrieve CreatedBy and CreatedFrom from localStorage
      const createdFrom = localStorage.getItem('BranchName') || '';
      const createdBy = localStorage.getItem('UserName') || '';

      const response = await axios.post(
        'https://arabian-hunter-backend.vercel.app/api/CustomerInformationInvoice/InsertInvoice',
        {
          ...formData, // Assuming you have formData defined somewhere above
          CustomerID: customerID, // Assuming customerID is defined somewhere above
          CreatedBy: createdBy,
          CreatedFrom: createdFrom,
        },
      );

      if (response.data.success) {
        toast.success('Invoice inserted successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Assuming onHide and fetchCustomersInvoice are defined somewhere above
        onHide();
        fetchCustomersInvoice();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;

        if (axiosError.response && axiosError.response.data) {
          const errorMessage =
            axiosError.response.data.message || 'An error occurred.';

          if (errorMessage.includes('InvoiceNo already exists')) {
            toast.error(
              'Duplicate InvoiceNo detected.',
              {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              },
            );
          } else {
            toast.error(`Failed to insert Invoice! ${errorMessage}`, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          toast.error('Failed to insert Invoice!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        console.error('Error inserting invoice:', error);
        toast.error('Failed to insert Invoice!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
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
              Customer Name
            </label>
            <input
              type="text"
              name="CustomerName"
              placeholder="Enter Customer Name"
              value={customerName || ''}
              onChange={handleChange}
              disabled={true}
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
              value={nationalID || ''}
              onChange={handleChange}
              disabled={true}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Invoice No */}
          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">
              Invoice No <span className="text-meta-1">*</span>
            </label>
            <input
              type="number"
              name="InvoiceNo"
              placeholder="Enter Invoice No."
              value={formData.InvoiceNo}
              onChange={handleInvoiceNoChange}
              step="1" // This ensures only integers are accepted
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Purchase Amount. */}
          <div className="w-full mb-4">
            <label className="block text-black dark:text-white">
              Purchase Amount <span className="text-meta-1">*</span>
            </label>
            <input
              type="number"
              name="PurchaseAmount"
              placeholder="Enter Purchase Amount"
              value={formData.PurchaseAmount}
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

export default InsertCustomerInvoice;
