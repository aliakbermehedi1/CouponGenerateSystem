import { Button } from 'primereact/button';
import React from 'react';

const TableThree: React.FC = () => {
  return (
    <div className="text-sm">
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-2 border border-tableBorder bg-white">
        <div className="ml-1">
          <Button
            className="font-semibold inline-flex items-center justify-center gap-2.5 rounded-lg bg-newButtonColor py-2 px-10 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-4"
            onClick={() => {}}
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
        </div>

        <div className="relative mx-8 mr-4">
          <input
            type="text"
            id="table-search-users"
            className="block py-2 ps-10 text-md text-gray-900 border border-gray-300 rounded-full w-56 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
          />

          <div className="absolute inset-y-0 flex items-center p-3 ">
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
                Customer Name
              </th>
              <th className="border border-tableBorder text-center">
                Short Name
              </th>
              <th className="border border-tableBorder text-center">
                Customer Address
              </th>
              <th className="border border-tableBorder text-center">
                Contact No.
              </th>
              <th className="border border-tableBorder text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="border border-tableBorder w-8">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 mx-2 text-blue-600 bg-gray-100 border-tableBorder rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>

              <td className="border border-tableBorder pl-1">Ala Uddin</td>
              <td className="border border-tableBorder pl-1">Sahin</td>
              <td className="border border-tableBorder pl-1">Dhaka</td>
              <td className="border border-tableBorder pl-1">+8801854430058</td>
              <td className="border border-tableBorder pl-1">
                {/* Modal toggle */}

                <div className="flex justify-center items-center py-2">
                  <Button
                    className="font-semibold gap-2.5 rounded-lg bg-editButtonColor text-white py-2 px-4"
                    onClick={() => {}}
                  >
                    <span>
                      <i
                        className="pi pi-plus font-semibold"
                        style={{ fontSize: '12px' }}
                      ></i>
                    </span>
                    EDIT
                  </Button>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="border border-tableBorder">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 mx-2 text-blue-600 bg-gray-100 border-tableBorder rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>

              <td className="border border-tableBorder pl-1">Ali Akber</td>
              <td className="border border-tableBorder pl-1">Mehedi</td>
              <td className="border border-tableBorder pl-1">Feni</td>
              <td className="border border-tableBorder pl-1">+8801809999999</td>
              <td className="border border-tableBorder pl-1">
                {/* Modal toggle */}
                <div className="flex justify-center items-center py-2">
                  <Button
                    className="font-semibold gap-2.5 rounded-lg bg-editButtonColor text-white py-2 px-4"
                    onClick={() => {}}
                  >
                    <span>
                      <i
                        className="pi pi-plus font-semibold"
                        style={{ fontSize: '12px' }}
                      ></i>
                    </span>
                    EDIT
                  </Button>
                </div>
              </td>
            </tr>
            {/* Repeat similar structure for other rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
