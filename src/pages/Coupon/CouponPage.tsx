import { useLocation, useNavigate } from 'react-router-dom';
import QRImage from '../../images/QR_Code/QRimage.png';
import Breadcrumb from '../../components/Breadcrumb';
import React, { useState, useEffect } from 'react';
import logo from '../../images/logo/mainLogo.png';
import { Button } from 'primereact/button';
import axios from 'axios';

const CouponPage: React.FC = () => {
  const navigate = useNavigate(); // Get the navigate function
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const generateId = queryParams.get('GenerateID');
  const [couponData, setCouponData] = useState<any>(null); // State to hold coupon data

  useEffect(() => {
    if (generateId) {
      // Fetch coupon data by GenerateID from the API
      // Fetch coupon data by GenerateID from the API
      axios
        .get(
          `https://arabian-hunter-backend.vercel.app/api/generate/GetGeneratedCouponByGenerateID/${generateId}`,
        )
        .then((response) => {
          if (response.data.success) {
            setCouponData(response.data.data);
          } else {
            console.error(
              'Failed to fetch coupon data:',
              response.data.message,
            );
          }
        })
        .catch((error) => {
          console.error('Error fetching coupon data:', error);
        });
    }
  }, [generateId]);

  // ... (rest of your component code remains the same)

  const print = () => {
    window.print();
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <Breadcrumb pageName="Coupon Page" />

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

      <Button
        onClick={print}
        className="font-semibold inline-flex items-center justify-center gap-2.5 rounded-lg bg-editButtonColor py-2 px-10 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-4 ml-4"
      >
        <span>
          <i
            className="pi pi-print font-semibold"
            style={{ fontSize: '12px' }}
          ></i>
        </span>
        Print
      </Button>

      <div className="w-full bg-[#F1F5F9] mt-4 layout-invoice-content print:!pr-12 print:!-mt-6">
        <div className="flex items-center justify-center">
          <div className="w-[80mm] h-[297mm] bg-white">
            <div className="flex justify-center items-center">
              <img src={logo} alt="logo" className="w-64 h-24 mt-4" />
            </div>

            <div>
              <p className="font-semibold text-center text-black mt-4">
                شركة بن حميد الوطنية للتجارة
              </p>
              <p className="text-center text-editButtonColor underline">
                info@benhumaidgroup.com
              </p>
              <p className="text-center text-black">
                https://arabianhunter.com
              </p>
              <p className="text-center text-black">الصياد العربي</p>
              <p className="text-center text-black">
                *** Customer Coupon Voucher ***
              </p>
              <p className="text-center text-black">
                ***********************************
              </p>
            </div>

            <div className="px-2 mt-4">
              <table className="w-full text-sm text-black">
                <tbody>
                  <tr>
                    <td className="">DATE</td>
                    <td className="w-2">:</td>
                    <td>
                      <p className="text-right">
                        {new Date().toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="">Created From</td>
                    <td className="w-2">:</td>
                    <td>
                      <p className="text-right">
                        {couponData?.CustomerDetails?.[0]?.CreatedFrom}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-28">Customer Name</td>
                    <td className="w-2">:</td>
                    <td>
                      <p className="text-right">
                        {couponData?.CustomerDetails?.[0]?.CustomerName}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="">National ID</td>
                    <td className="w-2">:</td>
                    <td>
                      <p className="text-right">
                        {couponData?.CustomerDetails?.[0]?.CustomerNationalID}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="">Contract No</td>
                    <td className="w-2">:</td>
                    <td>
                      <p className="text-right">
                        {couponData?.CustomerDetails?.[0]?.CustomerContactNo}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="">Address</td>
                    <td className="w-2">:</td>
                    <td>
                      <p className="text-right">
                        {couponData?.CustomerDetails?.[0]?.CustomerAddress}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* table end */}

            <div className="mt-4">
              <p className="text-center text-black mt-2 underline">
                Target Item Data
              </p>
              <p className="text-center text-black">
                {couponData?.CustomerDetails?.[0]?.ItemCode}
              </p>
              <p className="text-center text-black mt-4 border p-1 font-bold">
                Coupon Code: <br/>{couponData?.GenerateNo}
              </p>
              <p className="text-center text-black mt-1">USE IT ANY BRANCH</p>
              <p className="text-center text-black mt-2 border p-1 font-bold">
                Total Value SR: {couponData?.CustomerDetails?.[0]?.TotalValueSR}
              </p>
              <p className="text-center text-black mt-2 font-semibold">
                Coupon Validity : <span className="font-normal">7 Days</span>
              </p>
            </div>

            <div>
              <p className="text-start text-black mt-6 font-semibold">
                Branch Manager Signature:
              </p>

              <p className="border border-black mt-16"></p>

              <p className="text-center text-black mt-6">
                Customer & Branch Copy
              </p>
            </div>

            <div className="flex justify-center items-center mt-4">
              <img src={QRImage} alt="QRImage" className="w-40 h-40" />
            </div>

            {/* end */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponPage;
