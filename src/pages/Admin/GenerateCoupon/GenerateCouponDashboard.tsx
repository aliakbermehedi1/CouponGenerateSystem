// import Breadcrumb from '../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { toast } from 'react-toastify'; // Import the toast function
import axios from 'axios';
import Breadcrumb from '../../../components/Breadcrumb';
import { Link } from 'react-router-dom';

interface CustomerDetail {
  ItemCode: string;
  CustomerName: string;
  CustomerNationalID: string;
  CustomerAddress: string;
  CustomerContactNo: string;
  TotalValueSR: number;
  CreatedFrom: string;
  // Add any other fields if necessary
}

const GenerateCouponDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null); // Initially set to null

  //state for search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [customers, setCustomers] = useState<any[]>([]);

  // Fetch customers from the API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        'https://arabian-hunter-backend.vercel.app/api/generate/GetAllGeneratedCoupons',
      );
      if (response.data.success) {
        setCustomers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Step 2: Modify rendering to filter customers based on search
  const filteredCustomers = customers.filter((customer) =>
    searchQuery
      ? Object.values(customer)
          .join('') // Concatenate all values of a customer object to a string
          .toLowerCase() // Convert to lowercase for case-insensitive matching
          .includes(searchQuery.toLowerCase())
      : true,
  );

  const handleCopy = (
    generateNo: string,
    e: React.MouseEvent<HTMLSpanElement>,
    customer: any,
  ) => {
    e.preventDefault(); // Prevent the default behavior
    // Your copy logic
    // Then navigate to the desired route
    navigate(`/couponPage/GenerateID=${customer.GenerateID}`);
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <Breadcrumb pageName="Generate Coupon Dashboard" />

      <div className="text-sm">
        <div className="flex justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-2 border border-tableBorder bg-white">
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
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-[#FFD6A5] text-black">
              <tr>
                <th className="border border-[#6D4222] text-center">
                  Generate No.
                </th>
                <th className="border border-[#6D4222] text-center">
                  Product Code
                </th>
                <th className="border border-[#6D4222] text-center">
                  Customer Name
                </th>
                <th className="border border-[#6D4222] text-center">
                  Customer National ID
                </th>
                <th className="border border-[#6D4222] text-center">
                  Customer Address
                </th>
                <th className="border border-[#6D4222] text-center py-2">
                  Customer Contact No
                </th>
                <th className="border border-[#6D4222] text-center py-2">
                  Total Value SR
                </th>
                <th className="border border-[#6D4222] text-center py-2">
                  Created From
                </th>
                <th className="border border-[#6D4222] text-center py-2">
                  GenerateDate
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers?.map((customer) =>
                customer.CustomerDetails.map(
                  (customerDetail: CustomerDetail, index: number) => (
                    <tr key={`${customer._id}-${index}`} className="">
                      <td className="border border-[#6D4222] pl-1 text-center text-editButtonColor font-semibold">
                        <Link
                          to={`/couponPage?GenerateID=${customer.GenerateID}`}
                          // target=""
                          rel="noopener noreferrer"
                        >
                          {customer.GenerateNo}
                        </Link>
                        <span
                          className="ml-2 cursor-pointer"
                          onClick={(e) =>
                            handleCopy(customer.GenerateNo, e, customer)
                          }
                        >
                          <i className="fas fa-copy"></i>{' '}
                          {/* Font Awesome copy icon */}
                        </span>
                      </td>

                      <td className="border border-[#6D4222] pl-1 text-black p-2">
                        {customerDetail.ItemCode}
                      </td>
                      <td className="border border-[#6D4222] pl-1 text-black">
                        {customerDetail.CustomerName}
                      </td>
                      <td className="border border-[#6D4222] pl-1 text-black">
                        {customerDetail.CustomerNationalID}
                      </td>
                      <td className="border border-[#6D4222] pl-1 text-black">
                        {customerDetail.CustomerAddress}
                      </td>
                      <td className="border border-[#6D4222] pl-1 text-black">
                        {customerDetail.CustomerContactNo}
                      </td>
                      <td className="border border-[#6D4222] pl-1 text-black">
                        {customerDetail.TotalValueSR}
                      </td>
                      <td className="border border-[#6D4222] pl-1 text-black">
                        {customerDetail.CreatedFrom}
                      </td>
                      <td className="border border-[#6D4222] pl-1 text-black">
                        {new Date(customer.GenerateDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ),
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default GenerateCouponDashboard;
