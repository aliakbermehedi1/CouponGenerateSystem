import Breadcrumb from '../../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import axios from 'axios';
import { toast } from 'react-toastify';
import UpdateOfferInsert from './UpdateOfferInsert';
import { Dialog } from 'primereact/dialog';

const UpdateOffer: React.FC = () => {
  const RollName = localStorage.getItem('RollName'); //Here local storage UserName
  const [showDialog, setShowDialog] = useState<boolean>(false); //insert customer
  const [showDialog1, setShowDialog1] = useState<boolean>(false); //update customer
  const [selectedRoll, setSelectedRoll] = useState<any>(null); // Initially set to null

  //state for search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // delete
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const [customerIdToDelete, setCustomerIdToDelete] = useState<number | null>(
    null,
  );

  const [rollData, setRollData] = useState<any[]>([]);

  // Fetch customers from the API
  const fetchRolls = async () => {
    try {
      const response = await axios.get(
        'https://arabian-hunter-backend.vercel.app/api/RollMaster/GetRoles',
      );
      if (response.data.success) {
        setRollData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching roll:', error);
    }
  };

  useEffect(() => {
    fetchRolls();
  }, []);

  const onHideDialog = (): void => {
    setShowDialog(false);
    setShowDialog1(false);
  };

  // Step 2: Modify rendering to filter customers based on search
  const filteredRolls = rollData.filter((roll) =>
    searchQuery
      ? Object.values(roll)
          .join('') // Concatenate all values of a customer object to a string
          .toLowerCase() // Convert to lowercase for case-insensitive matching
          .includes(searchQuery.toLowerCase())
      : true,
  );

  // handle Delete
  const handleDeleteClick = (customerId: number) => {
    setCustomerIdToDelete(customerId); // Store the customerId that needs to be deleted
    setShowConfirmationDialog(true); // Show the confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.put(
        'https://arabian-hunter-backend.vercel.app/api/CustomerInformation/DeleteCustomer',
        { CustomerID: customerIdToDelete },
      );

      if (response.data.success) {
        fetchRolls();
        setShowConfirmationDialog(false); // Close the confirmation dialog

        // Display a success toast message
        toast.success('Deleted Successfully', {
          position: 'top-right',
          autoClose: 3000, // Close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error('Failed to delete customer:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Update Offer Data" />

      <p className="text-center bg-danger text-white py-4 mb-6 text-2xl font-bold">
        (Not Developed Yet)
        <span>
          <i
            className="pi pi-ban font-semibold pl-4"
            style={{ fontSize: '20px' }}
          ></i>
        </span>
      </p>
      <div className="text-sm">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-2 border border-tableBorder bg-white">
          <div className="ml-1">
            <Button
              className="font-semibold inline-flex items-center justify-center gap-2.5 rounded-lg bg-newButtonColor py-2 px-10 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-4"
              onClick={() => setShowDialog(true)}
              style={{ outline: 'none', borderColor: 'transparent !important' }}
            >
              <span>
                <i
                  className="pi pi-plus font-semibold"
                  style={{ fontSize: '12px' }}
                ></i>
              </span>
              NEW
            </Button>
          </div>

          <div className="relative mx-8 mr-4">
            <input
              type="text"
              id="table-search-users"
              className="block py-2 ps-10 text-md text-gray-900 border border-gray-300 rounded-full w-56 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="absolute inset-y-0 flex items-center p-3">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
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
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="border border-tableBorder text-center py-2">
                  Item Code
                </th>
                <th className="border border-tableBorder text-center py-2">
                  Item Arabic Name
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRolls.map((roll) => (
                <tr key={roll.RollID}>
                  <td className="border border-tableBorder pl-1 text-center">
                    {roll.RollName}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {roll.RollDescription}
                  </td>

                  <td className="border border-tableBorder pl-1">
                    <div className="flex justify-center items-center py-2">
                      <Button
                        className="font-semibold gap-2.5 rounded-lg bg-danger text-white py-2 px-4"
                        onClick={() => handleDeleteClick(roll.rollID)}
                        disabled={RollName === 'User'}
                      >
                        <span>
                          <i
                            className="pi pi-trash font-semibold"
                            style={{ fontSize: '12px' }}
                          ></i>
                        </span>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* start insert dialog */}
      <Dialog
        keepInViewport={false}
        className="custom-dialog"
        blockScroll
        header={'Roll Entry'}
        visible={showDialog}
        style={{ width: '40vw' }}
        onHide={onHideDialog}
        id="fname"
      >
        <UpdateOfferInsert onHide={onHideDialog} fetchRolls={fetchRolls} />
      </Dialog>

      <Dialog
        visible={showConfirmationDialog}
        onHide={() => setShowConfirmationDialog(false)}
        header="Are you sure to delete customer?"
        footer={
          <div className="flex items-center justify-center">
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text bg-danger text-white py-3 px-8 mr-4 text-lg"
              onClick={() => setShowConfirmationDialog(false)}
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-text bg-success text-white py-3 px-8 mr-4 text-lg"
              onClick={confirmDelete}
            />
          </div>
        }
      ></Dialog>
    </>
  );
};

export default UpdateOffer;
