import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';
import axios from 'axios';
import Breadcrumb from '../../../components/Breadcrumb';

const CustomerInvoiceDetails = ({ onHide }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const CustomerIDQuery = searchParams.get('CustomerID');
  
  const [totalValueSR, setTotalValueSR] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog1, setShowDialog1] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null);

  const fetchCustomersInvoice = async () => {
    try {
      const response = await axios.get(`https://arabian-hunter-backend.vercel.app/api/CustomerInformationInvoice/GetInvoicesByCustomerId/${CustomerIDQuery}`);
      if (response.data.success) {
        setCustomers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomersInvoice();
  }, []);

  const calculateTotal = () => {
    let total = 0;
    customers.forEach((customer) => {
      if (selectedInvoiceIds.includes(customer.invoiceId)) {
        total += customer.PurchaseAmount / 2;
      }
    });
    return total;
  };

  useEffect(() => {
    const calculatedTotal = calculateTotal();
    setTotalValueSR((calculatedTotal / 100) * 5);
  }, [customers, selectedInvoiceIds]);

  const handleCheckboxClick = (id) => {
    const numId = Number(id);
    setSelectedCheckboxes(prevIds => prevIds.includes(String(numId))
      ? prevIds.filter(item => item !== String(numId))
      : [...prevIds, String(numId)]
    );
    setSelectedInvoiceIds(prevIds => prevIds.includes(numId)
      ? prevIds.filter(item => item !== numId)
      : [...prevIds, numId]
    );
  };

  const handleDeleteClick = (customerId) => {
    setCustomerIdToDelete(customerId);
    setShowConfirmationDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.put('https://arabian-hunter-backend.vercel.app/api/CustomerInformationInvoice/DeleteCustomer', { CustomerID: customerIdToDelete });
      if (response.data.success) {
        fetchCustomersInvoice();
        setShowConfirmationDialog(false);
        toast.success('Deleted Successfully');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const filteredCustomers = customers.filter((customer) => 
    searchQuery ? Object.values(customer).join('').toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <>
      <Breadcrumb pageName="Customer Invoice Details" />
      <div className="text-sm">
        <div className="flex items-center justify-between py-2 border bg-white">
          <div>
            <Button className="bg-newButtonColor" onClick={() => setShowDialog(true)}>NEW</Button>
            <Button className="bg-editButtonColor" onClick={handleBackClick}>BACK</Button>
            <div className="bg-warning py-2 px-10">
              Total Point: <p>{calculateTotal()}</p>
            </div>
            <div className="bg-success py-2 px-10">
              Total Value SR: {totalValueSR.toFixed(2)}
            </div>
            <Button className="bg-danger py-2 px-10" onClick={() => setShowDialog1(true)} disabled={selectedCheckboxes.length === 0}>Generate Coupon</Button>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
          />
        </div>

        <div className="overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={() => {}}
                  />
                </th>
                {/* Add other table columns here */}
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.invoiceId}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedInvoiceIds.includes(customer.invoiceId)}
                      onChange={() => handleCheckboxClick(customer.invoiceId)}
                    />
                  </td>
                  {/* Add other customer data rows here */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerInvoiceDetails;
