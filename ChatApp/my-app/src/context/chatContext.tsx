import {
  Children,
  FC,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { getRequest, baseURL } from "../utils/service";
export interface User {
  email: string;
  name: string;
  token: string;
  _id: string;
  // Add other properties as needed
}

export interface ChatContextState {
  userChat: any; // Replace 'any' with the actual type of userChat data
  isUserChatLoading: boolean;
  userChatError: any; // Replace 'any' with the actual error type if possible
}

const initialChatContextState: ChatContextState = {
  userChat: null,
  isUserChatLoading: false,
  userChatError: null,
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
