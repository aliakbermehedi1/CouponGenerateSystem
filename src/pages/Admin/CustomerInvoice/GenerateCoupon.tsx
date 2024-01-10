import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type CustomerInvoiceInsertProps = {
  onHide: () => void;
  fetchCustomersInvoice: () => void;
  customerID: string | null; // Change the type here
  customerName: string | null; // Change the type here
  ContactNo: string | null; // Change the type here
  customerAddress: string | null; // Change the type here
  nationalID: string | null; // Change the type here
  totalValueSR: number | null;
  selectedInvoiceIds: number[]; // Make sure it's an array of numbers
};

const GenerateCoupon: React.FC<CustomerInvoiceInsertProps> = ({
  onHide,
  fetchCustomersInvoice,
  customerName,
  customerAddress,
  nationalID,
  customerID,
  totalValueSR,
  ContactNo,
  selectedInvoiceIds, // Add this prop
}) => {
  const [itemCodeID, setItemCodeID] = useState<any[]>([]); //Dropdown State

  const [generatedCouponId, setGeneratedCouponId] = useState<string | null>(
    null,
  ); //coupon page
  const navigate = useNavigate();

  console.log('totalValueSR', totalValueSR);
  console.log('selectedInvoiceIds', selectedInvoiceIds);
  const [formData, setFormData] = useState({
    ItemCodeID: '',
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

  // START Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Ensure all necessary fields are present in formData
      if (
        !formData.ItemCodeID ||
        !customerName ||
        !nationalID ||
        !customerAddress ||
        !ContactNo ||
        !totalValueSR
      ) {
        toast.error('Please fill in all required fields.');
        return;
      }

      // Prepare the data to be sent to the backend
      const customerDetail = {
        ItemCodeID: formData.ItemCodeID,
        ItemCode: formData.ItemCodeID,
        CustomerName: customerName,
        CustomerNationalID: nationalID,
        CustomerAddress: customerAddress,
        CustomerContactNo: ContactNo,
        TotalValueSR: totalValueSR,
        CreatedFrom: localStorage.getItem('BranchName'), // From local storage
        GenerateDate: new Date().toISOString(), // Current date and time
      };

      const couponData = {
        CustomerDetails: [customerDetail], // Make CustomerDetails an array with the customerDetail object
      };

      // Send the POST request to insert the generated coupon
      const response = await axios.post(
        'https://arabian-hunter-backend.vercel.app/api/generate/InsertGeneratedCoupon',
        couponData,
      );

      if (response.data.success) {
        // Update the generatedCouponId state
        setGeneratedCouponId(response.data.data.GenerateID.toString());
        await confirmGenerate();
      } else {
        toast.error('Failed to generate coupon.');
      }
    } catch (error) {
      console.error('Error generating coupon:', error);
      toast.error('Error generating coupon. Please try again.');
    }
  };

  // For Remove from invoice tbale

  const confirmGenerate = async () => {
    try {
      const response = await axios.put(
        'https://arabian-hunter-backend.vercel.app/api/CustomerInformationInvoice/GenerateCoupon', // Updated API endpoint
        { invoiceId: selectedInvoiceIds }, // Ensure this matches the expected payload structure
      );

      if (generatedCouponId) {
        console.log('Generated Coupon ID:', generatedCouponId); // Log for debugging
        navigate(`/couponPage?GenerateID=${generatedCouponId}`);
      } else {
        console.error('Failed to generate coupon:', response.data.message);
      }
    } catch (error) {
      console.error('Error generating coupon:', error);
      toast.error('Error generating coupon. Please try again.');
    }
  };

  // END Handle Submit

  //   Get Dropdown Data

  const fetchItemDropdown = async () => {
    try {
      const response = await axios.get(
        `https://arabian-hunter-backend.vercel.app/api/ItemInformation/GetItems`,
      ); // Using template literals here to inject CustomerID
      if (response.data.success) {
        // Assuming that the data returned is an array of customers
        setItemCodeID(response.data.data); // Setting the fetched customers into the state
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchItemDropdown();
  }, []);

  //   handle change for drodpown

  // const handleChangeForDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const { name, value } = e.target;
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  // };

  const handleChangeForDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];

    console.log('Selected Option Value:', selectedOption.value); // Log selected option value
    console.log('Selected Option Text:', selectedOption.text); // Log selected option text

    if (selectedOption) {
      const combinedValue = `${selectedOption.value} - ${
        selectedOption.text.split(' - ')[3]
      }`;

      // Log the combined value to verify
      console.log('Combined Value:', combinedValue);

      // Update the state with the combined value
      // Update the state with the combined value
      
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div className="">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit} className="p-6.5 pt-1">
          {/* Customer Name */}
          <div className="w-full mb-4 mt-2">
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
          <div className="w-full mb-4 mt-2">
            <label className="block text-black dark:text-white">
              National ID
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

          {/* Total Value SR */}
          <div className="w-full mb-4 mt-2">
            <label className="block text-black dark:text-white">
              Total Value SR{' '}
            </label>
            <input
              type="text"
              name="totalValue"
              placeholder=""
              value={totalValueSR || ''}
              onChange={handleChange}
              disabled={true}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Item Code Dropdown */}
          <div className="w-full mb-4 mt-2">
            <label className="block text-black dark:text-white">
              Item Code <span className="text-meta-1">*</span>
            </label>
            <select
              name="ItemCodeID"
              value={formData.ItemCodeID}
              onChange={handleChangeForDropdown}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
            >
              {itemCodeID.map((item) => (
                <option key={item._id} value={item.ItemCode}>
                  {item.ItemCode} - {item.ItemNameArabic}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex w-full justify-center rounded bg-danger p-3 font-medium text-gray mt-4"
            onClick={handleSubmit} // Assuming this is where you're calling handleSubmit
          >
            Generate Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerateCoupon;
