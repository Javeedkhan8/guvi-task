import React, { useEffect, useState } from 'react';
import { fetchCompanies } from '../utils/api';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const loadCompaniesData = async () => {
      const data = await fetchCompanies();
      setCompanies(data);
    };

    loadCompaniesData();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold text-center text-gray-900 mb-8">
        Companies List
      </h1>
      <div className="overflow-hidden bg-white shadow-xl rounded-lg">
        <table className="table-auto w-full text-sm text-gray-800">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-8 py-4 text-left">Company Name</th>
              <th className="px-8 py-4 text-left">Email</th>
              <th className="px-8 py-4 text-left">Job Openings</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id} className="border-t hover:bg-gray-100 transition-all duration-300">
                <td className="px-8 py-5 font-medium text-gray-700">{company.name}</td>
                <td className="px-8 py-5 text-blue-600 hover:underline">{company.email}</td>
                <td className="px-8 py-5 text-green-600">
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
