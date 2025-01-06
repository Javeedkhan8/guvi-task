import React from "react";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Heading Section */}
        <h1 className="text-5xl md:text-6xl font-bold text-center text-blue-700 mb-12">
          About <span className="text-blue-500">Placement Management</span>
        </h1>

        {/* Introduction Section */}
        <div className="text-center mb-12">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Placement Management is a cutting-edge platform designed to empower students in their career journey. Our mission is to connect aspiring professionals with the best career opportunities, simplify the placement process, and provide seamless communication between students, companies, and colleges.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Track Opportunities
            </h2>
            <p className="text-gray-600">
              Stay updated with job postings, internships, and placement drives tailored to your interests and career goals.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Seamless Applications
            </h2>
            <p className="text-gray-600">
              Submit applications effortlessly and track their progress in real time, all from one platform.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Engage with Companies
            </h2>
            <p className="text-gray-600">
              Build meaningful connections with top companies and explore opportunities that align with your skills and aspirations.
            </p>
          </div>
        </div>

        {/* Vision and Mission Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
            Our Vision and Mission
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed text-center">
            Our vision is to become a bridge between education and employment, helping students achieve their professional dreams while enabling companies to discover the best talent. We aim to streamline the placement process, making it efficient, transparent, and accessible for everyone involved.
          </p>
        </div>

        {/* Call-to-Action */}
        <div className="mt-16 text-center">
          <a
            href="/mainpage"
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
