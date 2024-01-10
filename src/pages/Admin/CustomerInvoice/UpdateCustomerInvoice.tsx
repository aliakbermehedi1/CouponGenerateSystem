import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

type userData = {
  success: boolean;
  data?: {
    invoiceId: number;
    customerID: string | null; // Change the type here
    nationalID: string | null; // Change the type here
    InvoiceNo: string;
    PurchaseAmount: string;
  };
};

type UpdateProps = {
  onHide: () => void;
  fetchInvoice: () => void;
  userData?: userData;
  customerName: string | null; // Change the type here
  nationalID: string | null; // Change the type here
};

const UpdateCustomerInvoice: React.FC<UpdateProps> = ({
  onHide,
  fetchInvoice,
  userData,
  customerName,
  nationalID,
}) => {
  const [formData, setFormData] = useState<{
    InvoiceNo: string; // Change the type here
    PurchaseAmount: string; // Change the type here
  }>({
    InvoiceNo: '',
    PurchaseAmount: '',
  });

  useEffect(() => {
    if (userData?.success && userData.data) {
      setFormData({
        InvoiceNo: userData.data.InvoiceNo || '',
        PurchaseAmount: userData.data.PurchaseAmount || '',
      });
    } else {
      // Set default values here if needed
      setFormData({
        InvoiceNo: '',
        PurchaseAmount: '',
      });
    }
  }, [userData]);

  const handleInvoiceNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setFormData((prevData) => ({
      ...prevData,
      InvoiceNo: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // START HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert the InvoiceNo and PurchaseAmount to numbers
      const updatedData = {
        ...formData,
        InvoiceNo: parseInt(formData.InvoiceNo, 10), // Convert to integer
        PurchaseAmount: parseFloat(formData.PurchaseAmount), // Convert to float
      };

      // Ensure that you have the invoiceId from userData
      const invoiceId = userData?.data?.invoiceId;

      if (!invoiceId) {
        console.error('Invoice ID is not available.');
        return;
      }

      // Make a PUT request to update the invoice
      const response = await axios.put(
        `https://arabian-hunter-backend.vercel.app/api/CustomerInformationInvoice/UpdateInvoice/${invoiceId}`,
        updatedData,
      );

      if (response.data.success) {
        // Fetch updated invoice details and close the modal
        fetchInvoice();
        onHide();

        toast.success('Successfully Updated', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        // Handle other responses or conditions here if necessary
        toast.error('Failed to update the invoice.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // Display the error message from the server response
        toast.error(
          error.response.data.message || 'Failed to update the invoice.',
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
        console.error('Error updating invoice:', error);

        toast.error('Failed to update the invoice.', {
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
  // END HANDLE SUBMIT

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
            className="flex w-full justify-center rounded bg-warning p-3 font-medium text-black font-semibold mt-3"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomerInvoice;
