import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import RollInsert from './RollInsert';
import RollEdit from './RollEdit';
import Breadcrumb from '../../../components/Breadcrumb';

const RollMasterDashboard = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog1, setShowDialog1] = useState(false);
  const [selectedRoll, setSelectedRoll] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rollData, setRollData] = useState([]);

  useEffect(() => {
    axios.get('https://arabian-hunter-backend.vercel.app/api/RollMaster/GetRoles')
      .then(response => {
        if (response.data.success) setRollData(response.data.data);
      })
      .catch(console.error);
  }, []);

  const handleEditClick = (RollID) => {
    axios.get(`https://arabian-hunter-backend.vercel.app/api/RollMaster/GetRoleById/${RollID}`)
      .then(response => {
        setSelectedRoll(response.data);
        setShowDialog1(true);
      })
      .catch(console.error);
  };

  const filteredRolls = rollData.filter(roll =>
    searchQuery ? Object.values(roll).join('').toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <>
      <Breadcrumb pageName="Roll Master" />

      <div className="text-sm">
        <div className="flex justify-between items-center py-2 border border-tableBorder bg-white">
          <div>
            <Button className="bg-newButtonColor text-white py-2 px-10" onClick={() => setShowDialog(true)}>
              <i className="pi pi-plus text-sm"></i> NEW
            </Button>
            <Button className="bg-editButtonColor text-white py-2 px-10 ml-4" onClick={() => navigate(-1)}>
              <i className="pi pi-arrow-left text-sm"></i> BACK
            </Button>
          </div>
          <div className="relative mx-8">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block py-2 ps-10 w-56 text-md text-gray-900 border rounded-full"
            />
            <div className="absolute inset-y-0 flex items-center p-3">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto shadow-md">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs bg-gray-50 text-gray-700">
              <tr>
                <th className="border text-center py-2">Roll ID</th>
                <th className="border text-center py-2">Roll Name</th>
                <th className="border text-center py-2">Roll Description</th>
                <th className="border text-center py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRolls.map(roll => (
                <tr key={roll.RollID}>
                  <td className="border text-center">{roll.RollID}</td>
                  <td className="border text-center">{roll.RollName}</td>
                  <td className="border">{roll.RollDescription}</td>
                  <td className="border text-center">
                    <Button className="bg-editButtonColor text-white py-2 px-4" onClick={() => handleEditClick(roll.RollID)}>
                      <i className="pi pi-pencil text-sm"></i> EDIT
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insert Dialog */}
      <Dialog header="Roll Entry" visible={showDialog} onHide={() => setShowDialog(false)} style={{ width: '40vw' }}>
        <RollInsert onHide={() => setShowDialog(false)} fetchRolls={() => {}} />
      </Dialog>

      {/* Update Dialog */}
      <Dialog header="Roll Master Update" visible={showDialog1} onHide={() => setShowDialog1(false)} style={{ width: '40vw' }}>
        <RollEdit onHide={() => setShowDialog1(false)} fetchRolls={() => {}} rollData={selectedRoll} />
      </Dialog>
    </>
  );
};

export default RollMasterDashboard;
