
import { useCallback, useContext, useState } from "react"
import { ChatContextState, chatContext } from "../context/chatContext"
import { baseURL, postRequest } from "../utils/service";

const PotentialChat = ({user, uChat,  createChat} :any) =>
{
    const { potentialsChat } =  useContext(chatContext) as ChatContextState;
   
    
    console.log("pChats" + JSON.stringify(potentialsChat));
    return (
      <>
      <div className="all-users">
          {
          potentialsChat && potentialsChat?.map((u:any , index: number) =>
          {
              return (
                  <div className="single-user" key={index} onClick={ ()=> createChat(user?._id, u?._id)} >
                    {u?.name}
                  <span className="user-online"></span>
                  </div>)})
          }
      </div>
      </>
    )
}

export default PotentialChat;