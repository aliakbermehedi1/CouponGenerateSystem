import Breadcrumb from "../../../components/Breadcrumb";
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateOfferInsert from "./UpdateOfferInsert";
import { Dialog } from "primereact/dialog";

const UpdateOffer = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [selectedRoll, setSelectedRoll] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null);
  const [rollData, setRollData] = useState([]);

  const fetchRolls = async () => {
    try {
      const response = await axios.get(
        "https://arabian-hunter-backend.vercel.app/api/RollMaster/GetRoles"
      );
      if (response.data.success) {
        setRollData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching rolls:", error);
    }
  };

  useEffect(() => {
    fetchRolls();
  }, []);

  const onHideDialog = () => {
    setShowDialog(false);
  };

  const filteredRolls = rollData.filter((roll) =>
    searchQuery
      ? Object.values(roll)
          .join("")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : true
  );

  const handleDeleteClick = (customerId) => {
    setCustomerIdToDelete(customerId);
    setShowConfirmationDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.put(
        "https://arabian-hunter-backend.vercel.app/api/CustomerInformation/DeleteCustomer",
        { CustomerID: customerIdToDelete }
      );

      if (response.data.success) {
        fetchRolls();
        setShowConfirmationDialog(false);
        toast.success("Deleted Successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Update Offer Data" />
      <p className="text-center bg-danger text-white py-4 mb-6 text-2xl font-bold">
        (Not Developed Yet)
        <i
          className="pi pi-ban font-semibold pl-4"
          style={{ fontSize: "20px" }}
        />
      </p>

      <div className="text-sm">
        <div className="flex items-center justify-between flex-column md:flex-row py-2 border bg-white">
          <Button
            className="font-semibold inline-flex items-center gap-2.5 rounded-lg bg-newButtonColor py-2 px-10 text-white"
            onClick={() => setShowDialog(true)}
          >
            <i className="pi pi-plus" style={{ fontSize: "12px" }} />
            NEW
          </Button>

          <div className="relative mx-8 mr-4">
            <input
              type="text"
              className="block py-2 text-md text-gray-900 border border-gray-300 rounded-full w-56 bg-gray-50"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 flex items-center p-3">
              <svg
                className="w-4 h-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="border text-center py-2">Item Code</th>
                <th className="border text-center py-2">Item Arabic Name</th>
              </tr>
            </thead>

            <tbody>
              {filteredRolls.map((roll) => (
                <tr key={roll.RollID}>
                  <td className="border text-center">{roll.RollName}</td>
                  <td className="border">{roll.RollDescription}</td>
                  <td className="border text-center">
                    <Button
                      className="font-semibold rounded-lg bg-danger text-white py-2 px-4"
                      onClick={() => handleDeleteClick(roll.RollID)}
                    >
                      <i className="pi pi-trash" style={{ fontSize: "12px" }} />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        visible={showDialog}
        onHide={onHideDialog}
        header="Roll Entry"
        style={{ width: "40vw" }}
      >
        <UpdateOfferInsert onHide={onHideDialog} fetchRolls={fetchRolls} />
      </Dialog>

      <Dialog
        visible={showConfirmationDialog}
        onHide={() => setShowConfirmationDialog(false)}
        header="Are you sure to delete customer?"
        footer={
          <div className="flex justify-center">
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text bg-danger text-white"
              onClick={() => setShowConfirmationDialog(false)}
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-text bg-success text-white"
              onClick={confirmDelete}
            />
          </div>
        }
      />
    </>
  );
};

export default UpdateOffer;
