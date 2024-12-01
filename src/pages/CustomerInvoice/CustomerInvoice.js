import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';

const CustomerInvoice = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          'https://arabian-hunter-backend.vercel.app/api/CustomerInformation/GetCustomer'
        );
        if (response.data.success) {
          setCustomers(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    searchQuery
      ? Object.values(customer)
          .join('')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : true
  );

  const handleInvoiceClick = (customer) => {
    navigate(`/CustomerInvoiceDetails?CustomerID=${customer.CustomerID}&CustomerName=${customer.CustomerName}&NationalID=${customer.NationalID}&CustomerAddress=${customer.CustomerAddress}&ContactNo=${customer.ContactNo}&Email=${customer.Email}&formattedCustomerID=${customer.formattedCustomerID}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Breadcrumb pageName="Customer Invoice" />
      <div className="text-sm">
        <div className="flex justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-2 border border-tableBorder bg-white">
          <Button onClick={handleBackClick} className="bg-editButtonColor text-white py-2 px-10 rounded-lg ml-4">
            <i className="pi pi-arrow-left text-sm"></i> BACK
          </Button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block py-2 text-md text-gray-900 border border-gray-300 rounded-full w-56 bg-gray-50"
            placeholder="Search"
          />
        </div>

        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="text-center">Customer ID</th>
                <th className="text-center">National ID</th>
                <th className="text-center">Customer Name</th>
                <th className="text-center">Customer Address</th>
                <th className="text-center">Contact No.</th>
                <th className="text-center">Email</th>
                <th className="text-center py-2">Created Date</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer._id?.$oid}>
                  <td className="text-center">{customer.formattedCustomerID}</td>
                  <td className="text-center">{customer.NationalID}</td>
                  <td>{customer.CustomerName}</td>
                  <td>{customer.CustomerAddress}</td>
                  <td>{customer.ContactNo}</td>
                  <td>{customer.Email}</td>
                  <td>{new Date(customer.createdDate).toLocaleDateString('en-GB')}</td>
                  <td className="text-center">
                    <Button
                      onClick={() => handleInvoiceClick(customer)}
                      className="bg-warning text-black py-2 px-4"
                    >
                      <i className="pi pi-pencil text-sm"></i> Invoice
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerInvoice;
