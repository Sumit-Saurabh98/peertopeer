import {Routes, Route, Navigate} from "react-router-dom"
import { Toaster } from "react-hot-toast";
import RoomsPage from "./pages/RoomsPage"
import CallPage from "./pages/CallPage"
import AuthForm from "./pages/AuthForm"
import { authStore } from "./store/authStore";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const {checkAuth, user, checkingAuth} = authStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (checkingAuth) return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="flex flex-col items-center p-6 rounded-lg">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="mt-4 text-sm font-medium text-gray-600">Loading authentication status...</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {user && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={user ? <Navigate to={'/rooms'}/> : <AuthForm/>}/>
          <Route path="/rooms" element={user ? <RoomsPage/> : <Navigate to="/"/>}/>
          <Route path="/room/:id" element={user ? <CallPage/> : <Navigate to='/'/>}/>
          <Route path="*" element={user ? <Navigate to="/rooms"/> : <AuthForm/>}/>
        </Routes>
      </div>
      {user && <Footer />}
      <Toaster/>
    </div>
  )
}

export default App