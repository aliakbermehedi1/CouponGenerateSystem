import InsertCustomerInvoice from './InsertCustomerInvoice';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';
import axios from 'axios';
import GenerateCoupon from './GenerateCoupon';

type CustomerInsertProps = {
  onHide: () => void;
  fetchCustomers: () => void;
};

const CustomerinvoiceDetails: React.FC<CustomerInsertProps> = ({ onHide }) => {
  const navigate = useNavigate(); // Get the navigate function
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const CustomerIDQuery = searchParams.get('CustomerID');
  const CustomerName = searchParams.get('CustomerName');
  const NationalID = searchParams.get('NationalID');
  console.log('CustomerID', CustomerIDQuery);
  console.log('CustomerName', CustomerName);
  console.log('NationalID', NationalID);

  const [totalValueSR, setTotalValueSR] = useState<number>(0); //Total Value SR here

  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<
    Array<string | number>
  >([]);
  //checkbox

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const [showDialog, setShowDialog] = useState<boolean>(false); //insert customer
  const [showDialog1, setShowDialog1] = useState<boolean>(false); //generate Coupon dialog state
  //   const [showDialog1, setShowDialog1] = useState<boolean>(false); //update customer
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null); // Initially set to null

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]); //check checkbox select or not


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
        `http://localhost:8080/api/CustomerInformation/GetInvoicesByCustomerId/${CustomerIDQuery}`,
      ); // Using template literals here to inject CustomerID
      if (response.data.success) {
        // Assuming that the data returned is an array of customers
        setCustomers(response.data.data); // Setting the fetched customers into the state
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []); // This effect will run only once when the component mounts

  console.log('fetch data here', customers);

  const onHideDialog = (): void => {
    setShowDialog(false);
    setShowDialog1(false);
  };

  // handle Update or Edit
  const handleEditClick = async (customerId: string) => {
    try {
      // const convertedId = new ObjectId(customerId);
      const response = await axios.get(
        `http://localhost:8080/api/CustomerInformation/GetCustomerById/${customerId}`,
      );
      if (response.data) {
        // Here, you can set the customer data to a state and pass it to the CustomerUpdate component.
        // For example:
        setSelectedCustomer(response.data);
        setShowDialog(true);
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
        'http://localhost:8080/api/CustomerInformation/DeleteCustomer',
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



  const calculateTotal = () => {
    let total = 0;
    filteredCustomers.forEach((customer) => {
      if (selectedInvoiceIds.includes(customer._id)) {
        total += customer.PurchaseAmount / 2;
      }
    });
    return total;
  };

  // Use useEffect to update the totalValueSR whenever filteredCustomers or selectedInvoiceIds change
  useEffect(() => {
    const calculatedTotal = calculateTotal();
    const newValue = (calculatedTotal / 100) * 5;
    setTotalValueSR(newValue);
  }, [filteredCustomers, selectedInvoiceIds]);


  // start handle checkbiox
  const handleCheckboxClick = (id: string | number) => {
    const stringifiedId = String(id); // Convert to string for consistent comparison
    
    if (selectedCheckboxes.includes(stringifiedId)) {
      setSelectedCheckboxes((prevIds) => prevIds.filter((item) => item !== stringifiedId));
    } else {
      setSelectedCheckboxes((prevIds) => [...prevIds, stringifiedId]);
    }
  
    if (selectedInvoiceIds.includes(stringifiedId)) {
      setSelectedInvoiceIds((prevIds) => prevIds.filter((item) => item !== stringifiedId));
    } else {
      setSelectedInvoiceIds((prevIds) => [...prevIds, stringifiedId]);
    }
  };
  
  
  // end handle checkbiox
  return (
    <>
      <Breadcrumb pageName="Customer Invoice Details" />

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
              className="font-semibold inline-flex items-center justify-center gap-2.5 rounded-lg bg-editButtonColor py-2 px-10 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-4 ml-4"
              onClick={handleBackClick} // Use the handleBackClick function here
              style={{ outline: 'none', borderColor: 'transparent !important' }}
            >
              <span>
                <i
                  className="pi pi-arrow-left font-semibold"
                  style={{ fontSize: '12px' }}
                ></i>
              </span>
              BACK
            </Button>
            {/* start total point */}
            <div
              className="font-semibold inline-flex items-center justify-center gap-2.5 rounded-lg bg-warning py-2 px-10 text-center text-black hover:bg-opacity-90 lg:px-8 xl:px-4 ml-4"
              style={{ outline: 'none', borderColor: 'transparent !important' }}
            >
              <span>
                <i className="font-semibold" style={{ fontSize: '12px' }}></i>
              </span>
              Total Point: <p className="ml-1">{calculateTotal()}</p>
            </div>

            {/* end total point */}
            {/* start total value sr */}
            <div
              className="font-semibold inline-flex items-center justify-center gap-2.5 rounded-lg bg-success py-2 px-10 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-4 ml-4"
              style={{ outline: 'none', borderColor: 'transparent !important' }}
            >
              <span>
                <i className="font-semibold" style={{ fontSize: '12px' }}></i>
              </span>
              Total Value SR: {totalValueSR.toFixed(2)}
            </div>

            {/* end total value sr */}

            {/* generate coupon button */}
            <Button
  className="font-semibold inline-flex items-center justify-center gap-2.5 rounded-lg bg-danger py-2 px-10 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-4 ml-4"
  onClick={() => setShowDialog1(true)}
  disabled={selectedCheckboxes.length === 0}
  style={{ outline: 'none', borderColor: 'transparent !important' }}
>
  <span>
    <i className="pi pi-tag font-semibold" style={{ fontSize: '12px' }}></i>
  </span>
  Generate Coupon
</Button>

            {/* end generate */}
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
                <th className="border border-tableBorder w-8">
                  <div className="flex items-center justify-center">
                    <input
                      id="checkbox"
                      type="checkbox"
                      className="w-4 h-4 my-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </th>
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
                  Contact No.
                </th>
                <th className="border border-tableBorder text-center">
                  Invoice No.
                </th>
                <th className="border border-tableBorder text-center">
                  Purchase Amount
                </th>
                <th className="border border-tableBorder text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer._id?.$oid}>
                  <td className="border border-tableBorder pl-1">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        onChange={() => handleCheckboxClick(customer._id)} // Assuming _id represents invoiceId
                        className="w-4 h-4 mx-2 text-blue-600 bg-gray-100 border-tableBorder rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="border border-tableBorder pl-1 text-center">
                    {CustomerIDQuery}
                  </td>
                  <td className="border border-tableBorder pl-1 text-center">
                    {NationalID}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {CustomerName}
                  </td>

                  <td className="border border-tableBorder pl-1">
                    {/* {customer.ContactNo} */}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {customer.InvoiceNo}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    {customer.PurchaseAmount}
                  </td>
                  <td className="border border-tableBorder pl-1">
                    <div className="flex justify-center items-center py-2">
                      <Button
                        className="font-semibold gap-2.5 rounded-lg bg-editButtonColor text-white py-2 px-4"
                        onClick={() => handleEditClick(customer.CustomerID)}
                        disabled
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
        header={'Customer Name'}
        visible={showDialog}
        style={{ width: '40vw' }}
        onHide={onHideDialog}
        id="fname"
      >
        <InsertCustomerInvoice
          onHide={onHideDialog}
          fetchCustomers={fetchCustomers}
          customerName={CustomerName}
          nationalID={NationalID}
          customerID={CustomerIDQuery}
        />
      </Dialog>
      {/* start update dualog */}

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

      {/* generate coupon dialog start */}
      <Dialog
        keepInViewport={false}
        className="custom-dialog"
        blockScroll
        header={'Generate Coupon'}
        visible={showDialog1}
        style={{ width: '40vw' }}
        onHide={onHideDialog}
        id="fname"
      >
        <GenerateCoupon
          onHide={onHideDialog}
          fetchCustomers={fetchCustomers}
          customerName={CustomerName}
          nationalID={NationalID}
          customerID={CustomerIDQuery}
          totalValueSR={totalValueSR}
        />
      </Dialog>
      {/* generate coupon dialog end */}
    </>
  );
};

export default CustomerinvoiceDetails;
