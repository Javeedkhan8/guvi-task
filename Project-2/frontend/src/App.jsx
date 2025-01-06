import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentRegistration from './components/StudentRegistration';
import Dashboard from './components/Dashboard';
import ApplicationList from './components/ApplicationList';
import ApplicationForm from './components/ApplicationForm';
import CompanyList from './components/CompanyList';
import CompanyPage from './pages/CompanyPage';
import WelcomePage from './pages/WelcomePage';
import CreateCompanyForm from './components/CreateCompanyForm';
import Company from './pages/Company';
import HomePage from './pages/HomePage';
import StudentList from './components/StudentList';
import ReportsPage from './pages/ReportsPage';
import UpdateApplicationStatus from './components/UpdateApplicationStatus';
import InterviewDashboard from './components/InterviewDashboard';
import InterviewSchedule from './components/InterviewSchedule';
import InterviewPage from './pages/InterviewPage';
import ApplicationPage from './pages/ApplicationPage';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './components/AdminRegister';
import MainPage from './pages/MainPage';
import StudentDashboard from './pages/StudentDashboard';
import ReadOnlyDashboard from './components/ReadOnlyDashboard';
import AboutPage from './pages/AboutPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<ApplicationList />} />
        <Route path="/companies" element={<CompanyPage />} />
        <Route path="/interviewsSchedule" element={<InterviewSchedule />} />
        <Route path="/companieslist" element={<CompanyList />} />
        <Route path="/create-company" element={<CreateCompanyForm />} />
        <Route path="/reports" element= {<ReportsPage/>}/>
        <Route path="/company" element={<Company />} />
        <Route path ="/login" element = {<Login/>}/>
        <Route path="/students" element={<StudentList />} />
        <Route path="/applications/new" element={<ApplicationForm />} />
        <Route path="/applications/:applicationId/status" element={<UpdateApplicationStatus />} />
        <Route path="/interviews" element={<InterviewDashboard />} />
        <Route path="/interviewpage" element={<InterviewPage />} />
        <Route path="/applicationpage" element={<ApplicationPage />} />
        <Route path = "/adminlogin"  element = {<AdminLogin/>}/>
        <Route path = "/adminregister" element = {<AdminRegister/>}/>
        <Route path ="/mainpage" element ={<MainPage/>}/>
        <Route path ="/studentdashboard" element = {<StudentDashboard/>}/>
        <Route path="/readonlydashboard" element = {<ReadOnlyDashboard/>}/>
        <Route path ="/about" element ={<AboutPage/>}/>


      </Routes>
    </Router>
  );
}

export default App;
