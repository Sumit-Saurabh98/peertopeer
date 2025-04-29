import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authStore } from "@/store/authStore";
import { Link } from "react-router-dom";

const Navbar = () =>{
    const {logout} = authStore()
  const handleLogout = () => {
    logout()
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link to={"/"} className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Peer to Peer</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
