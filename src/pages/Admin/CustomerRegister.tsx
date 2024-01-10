import CustomerInsert from './CustomerInfo/CustomerInsert';
import CustomerUpdate from './CustomerInfo/CustomerUpdate';
import Breadcrumb from '../../components/Breadcrumb';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react';

const CustomerRegister: React.FC = () => {
  const RollName = localStorage.getItem('RollName'); //Here local storage UserName
  const [showDialog, setShowDialog] = useState<boolean>(false); //insert customer
  const [showDialog1, setShowDialog1] = useState<boolean>(false); //update customer
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null); // Initially set to null

  //state for search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // delete
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const [customerIdToDelete, setCustomerIdToDelete] = useState<number | null>(
    null,
  );

  const [customers, setCustomers] = useState<any[]>([]);

  // Fetch customers from the API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        'https://arabian-hunter-backend.vercel.app/api/CustomerInformation/GetCustomer',
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

  const onHideDialog = (): void => {
    setShowDialog(false);
    setShowDialog1(false);
  };

  // start excle
  const exportToExcel = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert customers array to worksheet
    const ws = XLSX.utils.json_to_sheet(customers);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Customers');

    // Save workbook as Excel file with .xls extension
    XLSX.writeFile(wb, 'customers.xls');
  };
  // end excle
  // handle Update or Edit
  const handleEditClick = async (customerId: string) => {
    try {
      // const convertedId = new ObjectId(customerId);
      const response = await axios.get(
        `https://arabian-hunter-backend.vercel.app/api/CustomerInformation/GetCustomerById/${customerId}`,
      );
      if (response.data) {
        // Here, you can set the customer data to a state and pass it to the CustomerUpdate component.
        // For example:
        setSelectedCustomer(response.data);
        setShowDialog1(true);
      } else {
        console.error('Customer data not found');
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  // handle Delete
  const handleDeleteClick = (customerId: number) => {
    setCustomerIdToDelete(customerId); // Store the customerId that needs to be deleted
    setShowConfirmationDialog(true); // Show the confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.put(
        'https://arabian-hunter-backend.vercel.app/api/CustomerInformation/DeleteCustomer',
        { CustomerID: customerIdToDelete },
      );

      if (response.data.success) {
        fetchCustomers();
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
      <Breadcrumb pageName="Customer Dashboard" />

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
            <Button
              className="font-semibold inline-flex items-center justify-center gap-2.5 rounded-lg bg-exportButtonColor py-2 px-6 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-4 ml-3"
              onClick={exportToExcel}
              style={{ outline: 'none', borderColor: 'transparent !important' }}
            >
              <span>
                <i
                  className="pi pi-download font-semibold"
                  style={{ fontSize: '12px' }}
                ></i>
              </span>
              EXPORT
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
                  Created From
                </th>
                <th className="border border-tableBorder text-center py-2">
                  National ID
                </th>
                <th className="border border-tableBorder text-center py-2">
                  Customer Name
                </th>
                <th className="border border-tableBorder text-center py-2">
                  Customer Address
                </th>
                <th className="border border-tableBorder text-center py-2">
                  Contact No.
                </th>
                <th className="border border-tableBorder text-center py-2">
                  Created Date
                </th>
                <th className="border border-tableBorder text-center py-2">
                  Email
                </th>
                <th className="border border-tableBorder text-center py-2"></th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer._id?.$oid}>
                  <td className="border border-tableBorder pl-1 text-center">
                    {customer.CreatedFrom}
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
                    {new Date(customer.createdDate).toLocaleDateString('en-GB')}
                  </td>

                  <td className="border border-tableBorder pl-1">
                    {customer.Email}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    <div className="flex justify-center items-center py-2">
                      <Button
                        className="font-semibold gap-2.5 rounded-lg bg-editButtonColor text-white py-2 px-4"
                        onClick={() => handleEditClick(customer.CustomerID)}
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
                        onClick={() => handleDeleteClick(customer.CustomerID)}
                        disabled={RollName === 'User'}
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
        header={'Customer Information Entry'}
        visible={showDialog}
        style={{ width: '40vw' }}
        onHide={onHideDialog}
        id="fname"
      >
        {/* Add content prop here */}
        <div>
          <CustomerInsert
            onHide={onHideDialog}
            fetchCustomers={fetchCustomers}
          />
        </div>
      </Dialog>

      {/* start update dualog */}
      <Dialog
        keepInViewport={false}
        className="custom-dialog"
        blockScroll
        header={'Customer Information Update'}
        visible={showDialog1}
        style={{ width: '40vw' }}
        onHide={onHideDialog}
        id="fname"
        contentStyle={{ minHeight: '200px' }} // Optionally, you can add some styles if needed
      >
        <div>
          <CustomerUpdate
            onHide={onHideDialog}
            fetchCustomers={fetchCustomers}
            customerData={selectedCustomer}
          />
        </div>
      </Dialog>

      <Dialog
        visible={showConfirmationDialog}
        onHide={() => setShowConfirmationDialog(false)}
        header="Are you sure to delete customer?"
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

export default CustomerRegister;
