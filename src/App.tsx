import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './pages/dashboard';
import NewProject from './pages/new';
import ProjectDetail from './pages/detail';
import EditProject from './pages/edit';
import Login from './pages/login';

// Protected Route 컴포넌트
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
}

// Public Route 컴포넌트 (로그인한 사용자는 대시보드로 리다이렉트)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return user ? <Navigate to="/" /> : <>{children}</>;
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/new" element={
          <ProtectedRoute>
            <NewProject />
          </ProtectedRoute>
        } />
        <Route path="/detail/:id" element={
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditProject />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
