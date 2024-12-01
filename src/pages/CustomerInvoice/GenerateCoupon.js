import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GenerateCoupon = ({
  onHide,
  fetchCustomersInvoice,
  customerName,
  customerAddress,
  nationalID,
  customerID,
  totalValueSR,
  ContactNo,
  selectedInvoiceIds,
}) => {
  const [itemCodeID, setItemCodeID] = useState([]);
  const [generatedCouponId, setGeneratedCouponId] = useState(null);
  const [formData, setFormData] = useState({ ItemCodeID: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.ItemCodeID ||
      !customerName ||
      !nationalID ||
      !customerAddress ||
      !ContactNo ||
      !totalValueSR
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const customerDetail = {
      ItemCodeID: formData.ItemCodeID,
      ItemCode: formData.ItemCodeID,
      CustomerName: customerName,
      CustomerNationalID: nationalID,
      CustomerAddress: customerAddress,
      CustomerContactNo: ContactNo,
      TotalValueSR: totalValueSR,
      CreatedFrom: localStorage.getItem("BranchName"),
      GenerateDate: new Date().toISOString(),
    };

    const couponData = { CustomerDetails: [customerDetail] };

    try {
      const response = await axios.post(
        "https://arabian-hunter-backend.vercel.app/api/generate/InsertGeneratedCoupon",
        couponData
      );
      if (response.data.success) {
        setGeneratedCouponId(response.data.data.GenerateID.toString());
        await confirmGenerate();
      } else {
        toast.error("Failed to generate coupon.");
      }
    } catch (error) {
      console.error("Error generating coupon:", error);
      toast.error("Error generating coupon. Please try again.");
    }
  };

  const confirmGenerate = async () => {
    try {
      const response = await axios.put(
        "https://arabian-hunter-backend.vercel.app/api/CustomerInformationInvoice/GenerateCoupon",
        { invoiceId: selectedInvoiceIds }
      );

      if (generatedCouponId) {
        navigate(`/couponPage?GenerateID=${generatedCouponId}`);
      } else {
        console.error("Failed to generate coupon:", response.data.message);
      }
    } catch (error) {
      console.error("Error generating coupon:", error);
      toast.error("Error generating coupon. Please try again.");
    }
  };

  const fetchItemDropdown = async () => {
    try {
      const response = await axios.get(
        "https://arabian-hunter-backend.vercel.app/api/ItemInformation/GetItems"
      );
      if (response.data.success) {
        setItemCodeID(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItemDropdown();
  }, []);

  const handleChangeForDropdown = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    if (selectedOption) {
      const combinedValue = `${selectedOption.value} - ${
        selectedOption.text.split(" - ")[3]
      }`;
      setFormData((prevState) => ({ ...prevState, ItemCodeID: combinedValue }));
    }
  };

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit} className="p-6.5 pt-1">
          <div className="w-full mb-4 mt-2">
            <label className="block text-black dark:text-white">
              Customer Name
            </label>
            <input
              type="text"
              name="CustomerName"
              value={customerName || ""}
              disabled
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium"
            />
          </div>
          <div className="w-full mb-4 mt-2">
            <label className="block text-black dark:text-white">
              National ID
            </label>
            <input
              type="text"
              name="NationalID"
              value={nationalID || ""}
              disabled
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium"
            />
          </div>
          <div className="w-full mb-4 mt-2">
            <label className="block text-black dark:text-white">
              Total Value SR
            </label>
            <input
              type="text"
              name="totalValue"
              value={totalValueSR || ""}
              disabled
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium"
            />
          </div>
          <div className="w-full mb-4 mt-2">
            <label className="block text-black dark:text-white">
              Item Code <span className="text-meta-1">*</span>
            </label>
            <select
              name="ItemCodeID"
              value={formData.ItemCodeID}
              onChange={handleChangeForDropdown}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium"
            >
              {itemCodeID.map((item) => (
                <option key={item._id} value={item.ItemCode}>
                  {item.ItemCode} - {item.ItemNameArabic}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded bg-danger p-3 font-medium text-gray mt-4"
          >
            Generate Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerateCoupon;
