import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CompanySetup } from './components/CompanySetup';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { UserList } from './components/users/UserList';
import { TransactionList } from './components/transactions/TransactionList';
import { ReportList } from './components/reports/ReportList';
import { InventoryList } from './components/inventory/InventoryList';
import { AuditList } from './components/audit/AuditList';
import { storage } from './utils/storage';

function App() {
  const [isCompanySetup, setIsCompanySetup] = useState(false);

  useEffect(() => {
    const company = storage.getCompany();
    if (company) {
      setIsCompanySetup(true);
    }
  }, []);

  if (!isCompanySetup) {
    return <CompanySetup onComplete={() => setIsCompanySetup(true)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="transactions" element={<TransactionList />} />
          <Route path="reports" element={<ReportList />} />
          <Route path="inventory" element={<InventoryList />} />
          <Route path="audit" element={<AuditList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;