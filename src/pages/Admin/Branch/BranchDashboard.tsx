import Breadcrumb from '../../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { toast } from 'react-toastify';
import axios from 'axios';
import BranchInsert from './BranchInsert';
import BranchUpdate from './BranchUpdate';

const BranchDashboard: React.FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false); //insert customer
  const [showDialog1, setShowDialog1] = useState<boolean>(false); //update customer
  const [selectedBranch, setSelectedBranch] = useState<any>(null); // Initially set to null

  //state for search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // delete
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const [branchIdToDelete, setBranchIdToDelete] = useState<number | null>(null);

  const [branchData, setBranchData] = useState<any[]>([]);

  // Fetch customers from the API
  const fetchBranch = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/branch/GetBranches',
      );
      if (response.data.success) {
        setBranchData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching roll:', error);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  const onHideDialog = (): void => {
    setShowDialog(false);
    setShowDialog1(false);
  };

  // handle Update or Edit
  const handleEditClick = async (BranchID: string) => {
    console.log('BranchID', BranchID); // Check if this logs the correct BranchID
    try {
      const response = await axios.get(
        `http://localhost:8080/api/branch/GetBranchById/${BranchID}`,
      );
      if (response.data) {
        // Here, you can set the customer data to a state and pass it to the CustomerUpdate component.
        // For example:
        setSelectedBranch(response.data);
        setShowDialog1(true);
      } else {
        console.error('Customer data not found');
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  // handle Delete
  // const handleDeleteClick = (branch: number) => {
  //   setBranchIdToDelete(branch);
  //   setShowConfirmationDialog(true);
  // };

  // const confirmDelete = async () => {
  //   try {
  //     const response = await axios.put(
  //       'http://localhost:8080/api/branch/DeleteBranch',
  //       { BranchID: branchIdToDelete },
  //     );

  //     if (response.data.success) {
  //       fetchBranch();
  //       setShowConfirmationDialog(false); // Close the confirmation dialog

  //       // Display a success toast message
  //       toast.success('Deleted Successfully', {
  //         position: 'top-right',
  //         autoClose: 3000, // Close the toast after 3 seconds
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     } else {
  //       console.error('Failed to delete customer:', response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting customer:', error);
  //   }
  // };

  // handle Delete
  const handleDeleteClick = (branch: number) => {
    setBranchIdToDelete(branch); // Store the customerId that needs to be deleted
    setShowConfirmationDialog(true); // Show the confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.put(
        'http://localhost:8080/api/branch/DeleteBranch',
        { BranchID: branchIdToDelete },
      );

      if (response.data.success) {
        fetchBranch();
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

  // Step 2: Modify rendering to filter customers based on search
  const filteredCustomers = branchData.filter((customer) =>
    searchQuery
      ? Object.values(customer)
          .join('') // Concatenate all values of a customer object to a string
          .toLowerCase() // Convert to lowercase for case-insensitive matching
          .includes(searchQuery.toLowerCase())
      : true,
  );

  return (
    <>
      <Breadcrumb pageName="Branch Dashboard" />

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
                  Branch ID
                </th>
                <th className="border border-tableBorder text-center py-2">
                  Branch Name
                </th>
                <th className="border border-tableBorder text-center py-2">
                  Branch Description
                </th>
                <th className="border border-tableBorder text-center py-2">
                  {/* Roll Description */}
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((roll) => (
                <tr key={roll.BranchID}>
                  <td className="border border-tableBorder pl-1 text-center">
                    {roll.BranchID}
                  </td>
                  <td className="border border-tableBorder pl-1 text-center">
                    {roll.BranchName}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {roll.BranchDescription}
                  </td>

                  <td className="border border-tableBorder pl-1">
                    <div className="flex justify-center items-center py-2">
                      <Button
                        className="font-semibold gap-2.5 rounded-lg bg-editButtonColor text-white py-2 px-4"
                        onClick={() => handleEditClick(roll.BranchID)} // Ensure this is correct
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
                  <td className="border border-tableBorder pl-1">
                    <div className="flex justify-center items-center py-2">
                      <Button
                        className="font-semibold gap-2.5 rounded-lg bg-danger text-white py-2 px-4"
                        onClick={() => handleDeleteClick(roll.BranchID)}
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
        header={'Branch Entry'}
        visible={showDialog}
        style={{ width: '40vw' }}
        onHide={onHideDialog}
        id="fname"
      >
        <BranchInsert onHide={onHideDialog} fetchBranch={fetchBranch} />
      </Dialog>

      {/* start update dualog */}
      <Dialog
        keepInViewport={false}
        className="custom-dialog"
        blockScroll
        header={'Branch Update'}
        visible={showDialog1}
        style={{ width: '40vw' }}
        onHide={onHideDialog}
        id="fname"
      >
        <BranchUpdate
          onHide={onHideDialog}
          fetchBranch={fetchBranch}
          branchData={selectedBranch}
        />
      </Dialog>

      <Dialog
        visible={showConfirmationDialog}
        onHide={() => setShowConfirmationDialog(false)}
        header="Are you sure to delete Branch?"
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

export default BranchDashboard;
