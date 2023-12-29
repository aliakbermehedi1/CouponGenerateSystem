import CustomerinvoiceDetails from './CustomerInvoice/CustomerinvoiceDetails';
import CustomerUpdate from './CustomerInfo/CustomerUpdate';
import CustomerInsert from './CustomerInfo/CustomerInsert';
import Breadcrumb from '../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { toast } from 'react-toastify'; // Import the toast function
import axios from 'axios';

const CustomerInvoice: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null); // Initially set to null

  //state for search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [customers, setCustomers] = useState<any[]>([]);

  // Fetch customers from the API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/CustomerInformation/GetCustomer',
      );
      if (response.data.success) {
        setCustomers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // handle Invoice
  const handleInvoiceClick = (customerId: string, CustomerName: string, NationalID: string, CustomerAddress: String, ContactNo: String, Email: String, formattedCustomerID: String) => {
    try {
      // Directly navigate to the desired route with the CustomerID as a query parameter
      navigate(`/CustomerInvoiceDetails?CustomerID=${customerId}&CustomerName=${CustomerName}&NationalID=${NationalID}&CustomerAddress=${CustomerAddress}&ContactNo=${ContactNo}&Email=${Email}&formattedCustomerID=${formattedCustomerID}`);
    } catch (error) {
      console.error('Error navigating to CustomerInvoiceDetails:', error);
    }
  };

  // Step 2: Modify rendering to filter customers based on search
  const filteredCustomers = customers.filter((customer) =>
    searchQuery
      ? Object.values(customer)
          .join('') // Concatenate all values of a customer object to a string
          .toLowerCase() // Convert to lowercase for case-insensitive matching
          .includes(searchQuery.toLowerCase())
      : true,
  );

  return (
    <>
      <Breadcrumb pageName="Customer Invoice" />

      <div className="text-sm">
        <div className="flex items-center justify-end flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-2 border border-tableBorder bg-white">
          {/* <div className="ml-1">
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
          </div> */}

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
                {/* <th className="border border-tableBorder w-8">
                  <div className="flex items-center justify-center">
                    <input
                      id="checkbox"
                      type="checkbox"
                      className="w-4 h-4 my-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </th> */}
                <th className="border border-tableBorder text-center">
                  Customer ID
                </th>
                <th className="border border-tableBorder text-center">
                  National ID
                </th>
                <th className="border border-tableBorder text-center">
                  Customer Name
                </th>
                <th className="border border-tableBorder text-center">
                  Customer Address
                </th>
                <th className="border border-tableBorder text-center">
                  Contact No.
                </th>
                <th className="border border-tableBorder text-center">Email</th>
                <th className="border border-tableBorder text-center py-2">
                  Created Date
                </th>
                <th className="border border-tableBorder text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer._id?.$oid}>
                  {/* <td className="border border-tableBorder pl-1">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 mx-2 text-blue-600 bg-gray-100 border-tableBorder rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td> */}
                  <td className="border border-tableBorder pl-1 text-center">
                    {customer.formattedCustomerID}
                  </td>
                  <td className="border border-tableBorder pl-1 text-center">
                    {customer.NationalID}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {customer.CustomerName}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {customer.CustomerAddress}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {customer.ContactNo}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {customer.Email}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {new Date(customer.createdDate).toLocaleDateString('en-GB')}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    <div className="flex justify-center items-center py-2">
                      <Button
                        className="font-semibold gap-2.5 rounded-lg bg-warning text-black py-2 px-4"
                        onClick={() => handleInvoiceClick(customer.CustomerID, customer.CustomerName, customer.NationalID, customer.CustomerAddress, customer.ContactNo, customer.Email, customer.formattedCustomerID)}
                      >
                        <span>
                          <i
                            className="pi pi-pencil font-semibold"
                            style={{ fontSize: '12px' }}
                          ></i>
                        </span>
                        Invoice
                      </Button>
                    </div>
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
