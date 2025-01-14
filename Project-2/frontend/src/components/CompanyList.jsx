import React, { useEffect, useState } from 'react';
import { fetchCompanies } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCompaniesData = async () => {
      const data = await fetchCompanies();
      setCompanies(data);
    };

    loadCompaniesData();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-semibold text-center text-gray-900 mb-8">
        Companies List
      </h1>
      <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        > <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg></button>
      <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
        <table className="table-auto w-full text-sm text-gray-800">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-4 py-2 sm:px-8 py-4 text-left">Company Name</th>
              <th className="px-4 py-2 sm:px-8 py-4 text-left">Email</th>
              <th className="px-4 py-2 sm:px-8 py-4 text-left">Job Openings</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id} className="border-t hover:bg-gray-100 transition-all duration-300">
                <td className="px-4 py-3 sm:px-8 py-5 font-medium text-gray-700">{company.name}</td>
                <td className="px-4 py-3 sm:px-8 py-5 text-blue-600 hover:underline">{company.email}</td>
                <td className="px-4 py-3 sm:px-8 py-5 text-green-600">
                  {Array.isArray(company.jobOpenings)
                    ? company.jobOpenings.join(', ')
                    : 'No job openings'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyList;
