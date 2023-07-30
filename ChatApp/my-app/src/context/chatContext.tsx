import {
  Children,
  FC,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getRequest, baseURL, postRequest } from "../utils/service";
import { UserChat } from "../components/userChat";
export interface User {
  email: string;
  name: string;
  token: string;
  _id: string;
}

export interface ChatContextState 
{
  userChat: any;
  isUserChatLoading: boolean;
  userChatError: any; 
  potentialsChat: any;
  createChat: (firstId: string, secondId: string) => Promise<void>
}

const initialChatContextState: ChatContextState = {
  userChat: null,
  isUserChatLoading: false,
  userChatError: null,
  potentialsChat:null,
  createChat: async (firstId: string, secondId: string) => {
    // Your existing implementation of the createChat function.
  },
};

export const chatContext = createContext<ChatContextState | null>(null);

interface ChatContextProviderProps {
  user: User;
  children: ReactNode;
}

export const ChatContextProvider: FC<ChatContextProviderProps> = ({
  user,
  children,
}) => {
  const [chatState, setChatState] = useState<ChatContextState>(
    initialChatContextState
  );
    useEffect(() =>
    { 
      const getUsers = async ()  =>
      {
        const response = await getRequest(`${baseURL}/users `);
        if (response.error) return console.log("Error while feetching data ");
        const pChats = response.filter((u : any) =>
        {
          let isChatCreated = false;
          if (user._id === u._id )
            return (false);
          if (chatState.userChat)
          {
            isChatCreated = chatState.userChat?.some((chat : any) =>
            {
              return chat.members[0]=== u._id || chat.members[1] === u._id;
            }) 
          }
          return !isChatCreated;
        })
        setChatState((prevState) => ({
          ...prevState,
          potentialsChat: pChats
        }));
      }
      getUsers();
    },[]);
  
  useEffect(() => {
    const getUserChats = async () => {
      setChatState((prevState) => ({
        ...prevState,
        isUserChatLoading: true,
        userChatError: null,
      }));

      try {
        if (user) {
          const response = await getRequest(`${baseURL}/chat/${user._id}`);

          setChatState((prevState) => ({
            ...prevState,
            isUserChatLoading: false,
            userChat: response,
          }));
        }
      } catch (error) {
        setChatState((prevState) => ({
          ...prevState,
          isUserChatLoading: false,
          userChatError: error,
        }));
      }
    };
    getUserChats();
  }, [user]);

  return (
    <chatContext.Provider value={chatState}>{children}</chatContext.Provider>
  );
};
