import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/appLayout";
import Dashboard from "./pages/Dashboard/dashboard";
import Product from "./pages/Products/products";
import Coupon from "./pages/Coupon/coupon";

import Login from "./pages/Auth/login";
import Profile from "./common/profile";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ProtectedRoute>
          <Dashboard /> </ProtectedRoute>} />
        <Route path="product" element={<ProtectedRoute>
          <Product /> </ProtectedRoute>} />
        <Route path="coupon" element={<ProtectedRoute>
          <Coupon />  </ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute>
          <Profile /> </ProtectedRoute>} />
        <Route path="*" element={<ProtectedRoute>
          <div>404 Not Found</div></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
