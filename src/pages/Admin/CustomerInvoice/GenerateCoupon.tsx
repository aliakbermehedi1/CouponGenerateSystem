import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

type CustomerInvoiceInsertProps = {
  onHide: () => void;
  fetchCustomers: () => void;
  customerID: string | null; // Change the type here
  customerName: string | null; // Change the type here
  nationalID: string | null; // Change the type here
  totalValueSR: number | null; 
};


const GenerateCoupon: React.FC<CustomerInvoiceInsertProps> = ({
    onHide,
    fetchCustomers,
    customerName,
    nationalID,
    customerID,
    totalValueSR
}) => {
    const [itemCodeID, setItemCodeID] = useState<any[]>([]); //Dropdown State
    
    console.log("totalValueSR", totalValueSR)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if there's at least one item in itemCodeID array
    if (itemCodeID.length > 0) {
      // Extract the ItemCode value as a string from the first item
      const extractedItemCode = itemCodeID[0].ItemCode.toString();

      try {
        const response = await axios.post(
          'http://localhost:8080/api/CustomerInformation/CheckDataProperlyInsertOrNot',
          {
            ...formData,
            CustomerID: customerID,
            ItemCodeID: extractedItemCode, // Directly using the extractedItemCode as a string
          },
        );

        if (response.data.success) {
          toast.success('Invoice inserted successfully!', {
            // ... (toast settings)
          });

          onHide();
          fetchCustomers();
        }
      } catch (error) {
        console.error('Error inserting invoice:', error);
        // Handle error scenario
      }
    } else {
      console.error('itemCodeID array is empty!');
      // Handle the case where the itemCodeID array is empty
    }
  };

  //   Get Dropdown Data

  const fetchItemDropdown = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/ItemInformation/GetItems`,
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

  const handleChangeForDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
              <option value="">Select Item Code</option>
              {itemCodeID.map((item) => (
                <option key={item._id} value={item.ItemCode}>
                  {item.ItemCode} - {item.ItemName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerateCoupon;
