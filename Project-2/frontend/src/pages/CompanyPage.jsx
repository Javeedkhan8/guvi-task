import React, { useEffect, useState } from 'react'; 
import { fetchCompanies } from '../utils/api';

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const loadCompanies = async () => {
      const data = await fetchCompanies();
      setCompanies(data);
    };
    loadCompanies();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Companies</h1>
      
      <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
        <table className="table-auto w-full text-sm text-gray-800">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Contact Number</th>
              <th className="px-6 py-3 text-left">Job Openings</th>
              <th className="px-6 py-3 text-left">Website</th>
              <th className="px-6 py-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id} className="border-t hover:bg-gray-100 transition duration-200">
                <td className="px-6 py-4">{company.name}</td>
                <td className="px-6 py-4">{company.email}</td>
                <td className="px-6 py-4">{company.contactNumber}</td>
                {/* Safely handle jobOpenings */}
                <td className="px-6 py-4">
                  {Array.isArray(company.jobOpenings) ? company.jobOpenings.join(', ') : 'No openings'}
                </td>
                <td className="px-6 py-4">
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {company.website}
                  </a>
                </td>
                <td className="px-6 py-4">{company.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyPage;
