import { FC, useEffect, useState } from "react";
import { ChatProp } from "../components/userChat";
import { baseURL, getRequest } from "../utils/service";
export const useFetchRecipient = (chat: any, user: any ) => {
   
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members.find((id: string) => id != user?._id);
  console.log("idddd " + recipientId );
  
  useEffect(() => {
    const getUser = async () => {
      const response = await getRequest(`${baseURL}/users/find/${recipientId}`);
      if (response.error) return setError(response.error);
      setRecipientUser(response);
    };

    getUser();
  }, []);
  return {recipientUser, error};
};
