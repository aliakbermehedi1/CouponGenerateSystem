import Breadcrumb from '../../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { toast } from 'react-toastify';
import RollInsert from './RollInsert';
import RollEdit from './RollEdit';
import axios from 'axios';

const RollMasterDashboard: React.FC = () => {
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
  // Construct the API endpoint URL using the environment variable


  const fetchRolls = async () => {
    try {
      const response = await axios.get(`https://arabian-hunter-backend.vercel.app/api/RollMaster/GetRoles`);
      if (response.data.success) {
        setRollData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching rolls:', error);
    }
  };
  

  useEffect(() => {
    fetchRolls();
  }, []);

  const onHideDialog = (): void => {
    setShowDialog(false);
    setShowDialog1(false);
  };

  // handle Update or Edit
  const handleEditClick = async (RollID: string) => {
    console.log('RollID', RollID); // Check if this logs the correct RollID
    try {
      const response = await axios.get(
        `https://arabian-hunter-backend.vercel.app/api/RollMaster/GetRoleById/${RollID}`,
      );
      if (response.data) {
        // Here, you can set the customer data to a state and pass it to the CustomerUpdate component.
        // For example:
        setSelectedRoll(response.data);
        setShowDialog1(true);
      } else {
        console.error('Customer data not found');
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
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

  return (
    <>
      <Breadcrumb pageName="Roll Master" />

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
                  Roll ID
                </th>
                <th className="border border-tableBorder text-center py-2">
                  Roll Name
                </th>
                <th className="border border-tableBorder text-center py-2">
                  Roll Description
                </th>
                <th className="border border-tableBorder text-center py-2">
                  {/* Roll Description */}
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRolls.map((roll) => (
                <tr key={roll.RollID}>
                  <td className="border border-tableBorder pl-1 text-center">
                    {roll.RollID}
                  </td>
                  <td className="border border-tableBorder pl-1 text-center">
                    {roll.RollName}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {roll.RollDescription}
                  </td>

                  <td className="border border-tableBorder pl-1">
                    <div className="flex justify-center items-center py-2">
                      <Button
                        className="font-semibold gap-2.5 rounded-lg bg-editButtonColor text-white py-2 px-4"
                        onClick={() => handleEditClick(roll.RollID)} // Ensure this is correct
                      >
                        <span>
                          <i
                            className="pi pi-pencil font-semibold"
                            style={{ fontSize: '12px' }}
                          ></i>
                        </span>
                        EDIT
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
        <RollInsert onHide={onHideDialog} fetchRolls={fetchRolls} />
      </Dialog>

      {/* start update dualog */}
      <Dialog
        keepInViewport={false}
        className="custom-dialog"
        blockScroll
        header={'Roll Mster Update'}
        visible={showDialog1}
        style={{ width: '40vw' }}
        onHide={onHideDialog}
        id="fname"
      >
        <RollEdit
          onHide={onHideDialog}
          fetchRolls={fetchRolls}
          rollData={selectedRoll}
        />
      </Dialog>
    </>
  );
};

export default RollMasterDashboard;
