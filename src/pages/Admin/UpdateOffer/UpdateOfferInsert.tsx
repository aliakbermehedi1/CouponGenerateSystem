import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

type CustomerInvoiceInsertProps = {
  onHide: () => void;
  fetchRolls: () => void;
};

const UpdateOfferInsert: React.FC<CustomerInvoiceInsertProps> = ({
  onHide,
  fetchRolls,
}) => {
  const [itemCodeID, setItemCodeID] = useState<any[]>([]); //Dropdown State

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ItemCodeID: '',
  });

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
        <form className="p-6.5 pt-1">
          {/* Customer Name */}

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
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateOfferInsert;
