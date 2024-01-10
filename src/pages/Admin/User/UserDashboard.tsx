import Breadcrumb from '../../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { toast } from 'react-toastify';
import UserInsert from './UserInsert';
import axios from 'axios';
import UserUpdate from './UserUpdate';

const UserDashboard: React.FC = () => {

   // Step 1: Retrieve stored URL from localStorage
   const storedUrl: string | null = localStorage.getItem('currentUrl');

   // Step 2: Ensure storedUrl is a string or provide a default value
   const actualStoredUrl: string = storedUrl ?? '';
 
   useEffect(() => {
     // Step 3: Check if the stored URL matches a specific value
     if (actualStoredUrl === '/userDashboard') {
       // Perform actions or logic for the matching condition
       console.log('Stored URL matches /userDashboard');
     }
   }, [actualStoredUrl]); // Include actualStoredUrl in the dependency array if needed

   
  const [showDialog, setShowDialog] = useState<boolean>(false); //insert customer
  const [showDialog1, setShowDialog1] = useState<boolean>(false); //update customer
  const [selectedUser, setSelectedUser] = useState<any>(null); // Initially set to null

  //state for search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // delete
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  const [userData, setUserData] = useState<any[]>([]);

  // Fetch customers from the API
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        'https://arabian-hunter-backend.vercel.app/api/userInfo/GetUsers',
      );
      if (response.data.success) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching roll:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onHideDialog = (): void => {
    setShowDialog(false);
    setShowDialog1(false);
  };

  // handle Update or Edit
  const handleEditClick = async (UserID: string) => {
    console.log('UserID', UserID); // Check if this logs the correct UserID
    try {
      const response = await axios.get(
        `https://arabian-hunter-backend.vercel.app/api/userInfo/GetUserById/${UserID}`,
      );
      if (response.data) {
        setSelectedUser(response.data);
        setShowDialog1(true);
      } else {
        console.error('User data not found');
      }
    } catch (error) {
      console.error('Error fetching User data:', error);
    }
  };

  // handle Delete
  const handleDeleteClick = (userId: number) => {
    setUserIdToDelete(userId); // Store the userId that needs to be deleted
    setShowConfirmationDialog(true); // Show the confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.put(
        'https://arabian-hunter-backend.vercel.app/api/userInfo/DeleteUser', // Updated API endpoint
        { UserID: userIdToDelete }, // Ensure this matches the expected payload structure
      );

      if (response.data.success) {
        fetchUser();
        setShowConfirmationDialog(false); // Close the confirmation dialog

        // Display a success toast message
        toast.success('Deleted Successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error('Failed to delete user:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Step 2: Modify rendering to filter customers based on search
  const filteredCustomers = userData.filter((customer) =>
    searchQuery
      ? Object.values(customer)
          .join('') // Concatenate all values of a customer object to a string
          .toLowerCase() // Convert to lowercase for case-insensitive matching
          .includes(searchQuery.toLowerCase())
      : true,
  );

  return (
    <>
      <Breadcrumb pageName="User Dashboard" />

      <div className="text-sm">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-2 border border-tableBorder bg-white">
          <div className="ml-1">
            <Button
              className="font-semibold inline-flex items-center justify-center gap-2.5 rounded-lg bg-newButtonColor py-2 px-10 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-4"
              onClick={() => setShowDialog(true)}
              style={{ outline: 'none', borderColor: 'transparent !important' }}
            >
              {/* <span>
                <i
                  className="pi pi-plus font-semibold"
                  style={{ fontSize: '12px' }}
                ></i>
              </span> */}
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
                  User ID
                </th>
                <th className="border border-tableBorder text-center py-2">
                  User Name
                </th>
                <th className="border border-tableBorder text-center py-2">
                  Branch Name
                </th>
                <th className="border border-tableBorder text-center py-2">
                  Roll Name
                </th>
                <th className="border border-tableBorder text-center py-2">
                  LoginID
                </th>
                <th className="border border-tableBorder text-center py-2">
                  Password
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((user) => (
                <tr key={user.UserID}>
                  <td className="border border-tableBorder pl-1 text-center">
                    {user.UserID}
                  </td>
                  <td className="border border-tableBorder pl-1 text-center">
                    {user.UserName}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {user.BranchName}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {user.RollName}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {user.LoginID}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {user.RealPassword}
                  </td>

                  <td className="border border-tableBorder pl-1">
                    <div className="flex justify-center items-center py-2">
                      <Button
                        className="font-semibold gap-2.5 rounded-lg bg-editButtonColor text-white py-2 px-4"
                        onClick={() => handleEditClick(user.UserID)} // Ensure this is correct
                      >
                        {/* <span>
                          <i
                            className="pi pi-pencil font-semibold"
                            style={{ fontSize: '12px' }}
                          ></i>
                        </span> */}
                        EDIT
                      </Button>
                    </div>
                  </td>
                  <td className="border border-tableBorder pl-1">
                    <div className="flex justify-center items-center py-2">
                      <Button
                        className="font-semibold gap-2.5 rounded-lg bg-danger text-white py-2 px-4"
                        onClick={() => handleDeleteClick(user.UserID)}
                      >
                        {/* <span>
                          <i
                            className="pi pi-trash font-semibold"
                            style={{ fontSize: '12px' }}
                          ></i>
                        </span> */}
                        DELETE
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
        header={'User Entry'}
        visible={showDialog}
        style={{ width: '40vw' }}
        onHide={onHideDialog}
        id="fname"
      >
        <UserInsert onHide={onHideDialog} fetchUser={fetchUser} />
      </Dialog>

      {/* start update dualog */}
      <Dialog
        keepInViewport={false}
        className="custom-dialog"
        blockScroll
        header={'User Update'}
        visible={showDialog1}
        style={{ width: '40vw' }}
        onHide={onHideDialog}
        id="fname"
      >
        <UserUpdate
          onHide={onHideDialog}
          fetchUser={fetchUser}
          userData={selectedUser}
        />
      </Dialog>

      <Dialog
        visible={showConfirmationDialog}
        onHide={() => setShowConfirmationDialog(false)}
        header="Are you sure to delete User?"
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

export default UserDashboard;
