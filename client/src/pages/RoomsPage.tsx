import { useEffect, useState } from "react";
import { getSocket, initializeSocket } from "@/socket";
import { authStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, User } from "lucide-react";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";

const RoomsPage = () => {
  const { users, user, getAllUsers } = authStore();
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const navigate = useNavigate();

  // Fetch all users once on mount
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  // Setup and handle socket connection
  useEffect(() => {
    if (!user?._id) return;
  
    let socket: Socket;
    try {
      socket = getSocket();
    } catch {
      socket = initializeSocket(user._id as string);
    }
  
    const handleConnectedUsers = (users: string[]) => {
      setConnectedUsers(users.map(String));
    };
  
    socket.on("connected-users", handleConnectedUsers);
  
    return () => {
      socket.off("connected-users", handleConnectedUsers);
    };
  }, [user?._id]);
  

  const filteredUsers = users.filter(u => u._id !== user?._id);

  const isUserOnline = (userId: string) => {
    return connectedUsers.includes(userId);
  };

  const initiateCall = (userId: string) => {
    if (!isUserOnline(userId)) {
      toast.error("User is offline. Cannot initiate call.");
      return;
    }
    navigate(`/room/${userId}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Available Users</h1>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-8">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-500">No users available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredUsers.map((u) => (
            <Card key={u._id as string} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-500" />
                        </div>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                            isUserOnline(u._id as string) ? 'bg-green-500' : 'bg-gray-400'
                          } ring-2 ring-white`}
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium">{u.username || "User"}</h3>
                        <span className={`text-xs ${isUserOnline(u._id as string) ? 'text-green-500' : 'text-gray-400'}`}>
                          {isUserOnline(u._id as string) ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => initiateCall(u._id as string)}
                    disabled={!isUserOnline(u._id as string)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {isUserOnline(u._id as string) ? 'Call' : 'Offline'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredUsers.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          {connectedUsers.length-1} user(s) online
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
