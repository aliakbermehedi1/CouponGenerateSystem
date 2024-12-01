import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { toast } from 'react-toastify';
import axios from 'axios';
import BranchInsert from './BranchInsert';
import BranchUpdate from './BranchUpdate';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';

const BranchDashboard = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog1, setShowDialog1] = useState(false);
  const [branchData, setBranchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [branchIdToDelete, setBranchIdToDelete] = useState(null);

  useEffect(() => {
    axios.get('https://arabian-hunter-backend.vercel.app/api/branch/GetBranches')
      .then(response => response.data.success && setBranchData(response.data.data))
      .catch(console.error);
  }, []);

  const filteredBranches = branchData.filter(branch => 
    !searchQuery || Object.values(branch).join('').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (BranchID) => {
    axios.get(`https://arabian-hunter-backend.vercel.app/api/branch/GetBranchById/${BranchID}`)
      .then(response => {
        setSelectedBranch(response.data);
        setShowDialog1(true);
      }).catch(console.error);
  };

  const handleDelete = () => {
    axios.put('https://arabian-hunter-backend.vercel.app/api/branch/DeleteBranch', { BranchID: branchIdToDelete })
      .then(response => {
        if (response.data.success) {
          setBranchData(prev => prev.filter(branch => branch.BranchID !== branchIdToDelete));
          setShowConfirmationDialog(false);
          toast.success('Deleted Successfully');
        }
      }).catch(console.error);
  };

  return (
    <>
      <Breadcrumb pageName="Branch Dashboard" />
      <div className="flex justify-between py-2 bg-white">
        <div>
          <Button onClick={() => setShowDialog(true)} className="p-button-primary">NEW</Button>
          <Button onClick={() => navigate(-1)} className="p-button-secondary ml-4">BACK</Button>
        </div>
        <input
          className="p-inputtext p-component"
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search"
        />
      </div>

      <table className="w-full text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th>Branch ID</th>
            <th>Branch Name</th>
            <th>Branch Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBranches.map(branch => (
            <tr key={branch.BranchID}>
              <td>{branch.BranchID}</td>
              <td>{branch.BranchName}</td>
              <td>{branch.BranchDescription}</td>
              <td className="flex gap-2">
                <Button onClick={() => handleEdit(branch.BranchID)} className="p-button-warning">Edit</Button>
                <Button onClick={() => { setBranchIdToDelete(branch.BranchID); setShowConfirmationDialog(true); }} className="p-button-danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog visible={showDialog} onHide={() => setShowDialog(false)} header="Branch Entry">
        <BranchInsert onHide={() => setShowDialog(false)} />
      </Dialog>

      <Dialog visible={showDialog1} onHide={() => setShowDialog1(false)} header="Branch Update">
        <BranchUpdate onHide={() => setShowDialog1(false)} branchData={selectedBranch} />
      </Dialog>

      <Dialog visible={showConfirmationDialog} header="Confirm Delete" footer={
        <>
          <Button label="Cancel" icon="pi pi-times" onClick={() => setShowConfirmationDialog(false)} />
          <Button label="Confirm" icon="pi pi-check" className="p-button-danger" onClick={handleDelete} />
        </>
      } onHide={() => setShowConfirmationDialog(false)}>
        Are you sure you want to delete this branch?
      </Dialog>
    </>
  );
};

export default BranchDashboard;
