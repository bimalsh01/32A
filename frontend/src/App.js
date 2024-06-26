import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Navbar from './components/Navbar';

// Toast Config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './pages/admin/admin_dashboard/AdminDashboard';
import UpdateProduct from './pages/admin/update_product/UpdateProduct';
import AdminRoutes from './protected_routes/AdminRoutes';
import UserRoutes from './protected_routes/UserRoutes';
import Profile from './pages/profile/Profile';
import ForgotPassword from './pages/forgot_password/ForgotPassword';

// Task create for login and register
function App() {
  return (
    <Router>
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />


        {/* Admin routes */}
        <Route element={<AdminRoutes/>}>
           <Route path='/admin/dashboard' element={<AdminDashboard/>} />
           <Route path='/admin/update/:id' element={<UpdateProduct/>} />
        </Route>

        

        {/* User Routes */}
        <Route element={<UserRoutes/>}>

          <Route path='/profile' element={<Profile/>}/>

        </Route>

        <Route path='/forgot_password' element={<ForgotPassword/>} />

      </Routes>
    </Router>
  );
}

export default App;
