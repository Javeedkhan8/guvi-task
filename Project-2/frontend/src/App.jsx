import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage';
import StudentRegistration from './components/StudentRegistration';
import Dashboard from './components/Dashboard';
import ApplicationList from './components/ApplicationList';
import ApplicationForm from './components/ApplicationForm';
import CompanyList from './components/CompanyList';
import CompanyPage from './pages/CompanyPage';
import WelcomePage from './pages/WelcomePage';
import CreateCompanyForm from './components/CreateCompanyForm';
import Company from './pages/Company';
import ReportsPage from './pages/ReportsPage';
import StudentList from './components/StudentList';
import UpdateApplicationStatus from './components/UpdateApplicationStatus';
import InterviewDashboard from './components/InterviewDashboard';
import InterviewSchedule from './components/InterviewSchedule';
import InterviewPage from './pages/InterviewPage';
import ApplicationPage from './pages/ApplicationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<ApplicationList />} />
        <Route path="/companies" element={<CompanyPage />} />
        <Route path="/interviewsSchedule" element={<InterviewSchedule />} />
        <Route path="/companieslist" element={<CompanyList />} />
        <Route path="/create-company" element={<CreateCompanyForm />} />
        <Route path="/reports" element= {<ReportsPage/>}/>
        <Route path="/company" element={<Company />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/applications/new" element={<ApplicationForm />} />
        <Route path="/applications/:applicationId/status" element={<UpdateApplicationStatus />} />
        <Route path="/interviews" element={<InterviewDashboard />} />
        <Route path="/interviewpage" element={<InterviewPage />} />
        <Route path="/applicationpage" element={<ApplicationPage />} />


      </Routes>
    </Router>
  );
}

export default App;
