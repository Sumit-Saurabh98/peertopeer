import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () =>{
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              © {currentYear} Peer to Peer. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <nav className="flex gap-4 text-sm">
              <Link to="#" className="text-gray-500 hover:text-blue-600">Terms</Link>
              <Link to="#" className="text-gray-500 hover:text-blue-600">Privacy</Link>
              <Link to="#" className="text-gray-500 hover:text-blue-600">Contact</Link>
            </nav>
            
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                <span>Made with</span>
                <Heart className="mx-1 h-3 w-3 text-red-500" />
                <span>by Sumit Saurabh</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer