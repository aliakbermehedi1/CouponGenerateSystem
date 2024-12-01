import CustomerInsert from './CustomerInsert';
import CustomerUpdate from './CustomerUpdate';
import Breadcrumb from '../../components/Breadcrumb';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';

const CustomerRegister = () => {
  const navigate = useNavigate();
  const RollName = localStorage.getItem('RollName');
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog1, setShowDialog1] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null);
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('https://arabian-hunter-backend.vercel.app/api/CustomerInformation/GetCustomer');
      if (response.data.success) setCustomers(response.data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const onHideDialog = () => {
    setShowDialog(false);
    setShowDialog1(false);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(customers);
    XLSX.utils.book_append_sheet(wb, ws, 'Customers');
    XLSX.writeFile(wb, 'customers.xls');
  };

  const handleEditClick = async (customerId) => {
    try {
      const response = await axios.get(`https://arabian-hunter-backend.vercel.app/api/CustomerInformation/GetCustomerById/${customerId}`);
      if (response.data) {
        setSelectedCustomer(response.data);
        setShowDialog1(true);
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const handleDeleteClick = (customerId) => {
    setCustomerIdToDelete(customerId);
    setShowConfirmationDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.put('https://arabian-hunter-backend.vercel.app/api/CustomerInformation/DeleteCustomer', { CustomerID: customerIdToDelete });
      if (response.data.success) {
        fetchCustomers();
        setShowConfirmationDialog(false);
        toast.success('Deleted Successfully', { position: 'top-right', autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    searchQuery ? Object.values(customer).join('').toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Breadcrumb pageName="Customer Dashboard" />

      <div className="text-sm">
        <div className="flex items-center justify-between py-2 border bg-white">
          <Button onClick={() => setShowDialog(true)} className="bg-newButtonColor text-white py-2 px-10">NEW</Button>
          <Button onClick={exportToExcel} className="bg-exportButtonColor text-white py-2 px-6">EXPORT</Button>
          <Button onClick={handleBackClick} className="bg-editButtonColor text-white py-2 px-10">BACK</Button>

          <input
            type="text"
            className="py-2 px-10 border rounded-full w-56"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left">
            <thead className="text-xs bg-gray-50">
              <tr>
                <th className="text-center py-2">Created From</th>
                <th className="text-center py-2">National ID</th>
                <th className="text-center py-2">Customer Name</th>
                <th className="text-center py-2">Customer Address</th>
                <th className="text-center py-2">Contact No.</th>
                <th className="text-center py-2">Created Date</th>
                <th className="text-center py-2">Email</th>
                <th className="text-center py-2"></th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer._id?.$oid}>
                  <td className="text-center">{customer.CreatedFrom}</td>
                  <td className="text-center">{customer.NationalID}</td>
                  <td>{customer.CustomerName}</td>
                  <td>{customer.CustomerAddress}</td>
                  <td>{customer.ContactNo}</td>
                  <td>{new Date(customer.createdDate).toLocaleDateString('en-GB')}</td>
                  <td>{customer.Email}</td>
                  <td className="text-center">
                    <Button onClick={() => handleEditClick(customer.CustomerID)} className="bg-editButtonColor text-white py-2 px-4">EDIT</Button>
                    <Button onClick={() => handleDeleteClick(customer.CustomerID)} className="bg-danger text-white py-2 px-4" disabled={RollName === 'User'}>DELETE</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog visible={showDialog} onHide={onHideDialog} header="Customer Information Entry" style={{ width: '40vw' }}>
        <CustomerInsert onHide={onHideDialog} fetchCustomers={fetchCustomers} />
      </Dialog>

      <Dialog visible={showDialog1} onHide={onHideDialog} header="Customer Information Update" style={{ width: '40vw' }}>
        <CustomerUpdate onHide={onHideDialog} fetchCustomers={fetchCustomers} customerData={selectedCustomer} />
      </Dialog>
    </>
  );
};

export default CustomerRegister;
