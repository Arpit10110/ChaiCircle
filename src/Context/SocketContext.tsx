import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { io } from "socket.io-client";

interface SocketContextType {
    name: string;
    isUser: boolean;
    onlineUsers: any[];
    setupSocketUser: (username: string) => void;
    sendmessage: (username:string, message:string) => void;
}
    
interface Message {
    username: string;
    message: string;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
    children: ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {

    const socket = io("http://localhost:5000");
    const [Isuser, SetIsUser] = useState(false);
    const [OnlineUsers, SetOnlineUser] = useState([]);
    const [Adminusername, SetAdminusername] = useState("")
    const [Revcivedmassage, SetRevcivedmassage] = useState<Message[]>([]);


    const setupsocketuser = (username: string) => {
        socket.emit("setupuser", username);

        socket.on("onlineusers", (users) => {
            SetOnlineUser(users);
        });
    };

    const getuser = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_HOST}/getuserdata`, { withCredentials: true });
            if (data.success == false) {
                SetIsUser(false);
            } else {
                SetIsUser(true);
                SetAdminusername(data.adminusername);
                setupsocketuser(data.adminusername);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const sendmessage = async (username:string, message:string) => {
        socket.emit('sendmessage',{reciver:username, message,sender:Adminusername})
    };

    socket.on("recivemessage", (handleReceiveMessage) => {
        SetRevcivedmassage((prevMessages) => [...prevMessages, handleReceiveMessage]);
    });

    useEffect(() => {
        getuser();
    }, []);

    return (
        <SocketContext.Provider
            value={{
                name: "SocketContext",
                isUser: Isuser,
                onlineUsers: OnlineUsers,
                setupSocketUser: setupsocketuser,
                sendmessage: sendmessage
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketProvider };