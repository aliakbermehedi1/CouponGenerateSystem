import Breadcrumb from '../../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { toast } from 'react-toastify';
import UserInsert from './UserInsert';
import axios from 'axios';
import UserUpdate from './UserUpdate';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog1, setShowDialog1] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userData, setUserData] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get('https://arabian-hunter-backend.vercel.app/api/userInfo/GetUsers');
      if (response.data.success) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onHideDialog = () => {
    setShowDialog(false);
    setShowDialog1(false);
  };

  const handleEditClick = async (UserID) => {
    try {
      const response = await axios.get(`https://arabian-hunter-backend.vercel.app/api/userInfo/GetUserById/${UserID}`);
      if (response.data) {
        setSelectedUser(response.data);
        setShowDialog1(true);
      } else {
        console.error('User data not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId);
    setShowConfirmationDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.put('https://arabian-hunter-backend.vercel.app/api/userInfo/DeleteUser', { UserID: userIdToDelete });
      if (response.data.success) {
        fetchUser();
        setShowConfirmationDialog(false);
        toast.success('Deleted Successfully', { position: 'top-right', autoClose: 3000 });
      } else {
        console.error('Failed to delete user:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredCustomers = userData.filter((customer) =>
    searchQuery ? Object.values(customer).join('').toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Breadcrumb pageName="User Dashboard" />

      <div className="text-sm">
        <div className="flex items-center justify-between py-2 border bg-white">
          <div className="ml-1">
            <Button onClick={() => setShowDialog(true)} className="bg-newButtonColor text-white">
              <i className="pi pi-plus" style={{ fontSize: '12px' }}></i> NEW
            </Button>
            <Button onClick={handleBackClick} className="bg-editButtonColor text-white ml-4">
              <i className="pi pi-arrow-left" style={{ fontSize: '12px' }}></i> BACK
            </Button>
          </div>
          <div className="relative mx-8 mr-4">
            <input
              type="text"
              className="py-2 text-md text-gray-900 border rounded-full w-56"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 bg-gray-50">
              <tr>
                <th className="text-center py-2">User ID</th>
                <th className="text-center py-2">User Name</th>
                <th className="text-center py-2">Branch Name</th>
                <th className="text-center py-2">Roll Name</th>
                <th className="text-center py-2">LoginID</th>
                <th className="text-center py-2">Password</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((user) => (
                <tr key={user.UserID}>
                  <td className="text-center">{user.UserID}</td>
                  <td className="text-center">{user.UserName}</td>
                  <td>{user.BranchName}</td>
                  <td>{user.RollName}</td>
                  <td>{user.LoginID}</td>
                  <td>{user.RealPassword}</td>
                  <td className="text-center">
                    <Button onClick={() => handleEditClick(user.UserID)} className="bg-editButtonColor text-white">
                      <i className="pi pi-pencil" style={{ fontSize: '12px' }}></i> EDIT
                    </Button>
                  </td>
                  <td className="text-center">
                    <Button onClick={() => handleDeleteClick(user.UserID)} className="bg-danger text-white">
                      <i className="pi pi-trash" style={{ fontSize: '12px' }}></i> DELETE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog header="User Entry" visible={showDialog} style={{ width: '40vw' }} onHide={onHideDialog}>
        <UserInsert onHide={onHideDialog} fetchUser={fetchUser} />
      </Dialog>

      <Dialog header="User Update" visible={showDialog1} style={{ width: '40vw' }} onHide={onHideDialog}>
        <UserUpdate onHide={onHideDialog} fetchUser={fetchUser} userData={selectedUser} />
      </Dialog>

      <Dialog
        visible={showConfirmationDialog}
        onHide={() => setShowConfirmationDialog(false)}
        header="Are you sure to delete User?"
        footer={
          <div className="flex items-center justify-center">
            <Button label="No" icon="pi pi-times" className="p-button-text bg-danger" onClick={() => setShowConfirmationDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text bg-success" onClick={confirmDelete} />
          </div>
        }
      />
    </>
  );
};

export default UserDashboard;
