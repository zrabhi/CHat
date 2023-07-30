import { useCallback, useContext, useState } from "react";
import { chatContext, ChatContextState,User } from "../context/chatContext";
import { Container, Stack } from "react-bootstrap";
import PotentialChat from  "../components/potentialsChat"
import { UserChat } from "../components/userChat";
import { baseURL, postRequest } from "../utils/service";
interface ChatProp {
    user: User;
}
const Chat = ({user}: any) => 
{
    const { userChat, isUserChatLoading, userChatError } =  useContext(chatContext) as ChatContextState;
    const [uChat, setUChat] = useState();
    const createChat = useCallback(async (firstId: string, secondId: string) =>
    { 
        const response = await postRequest(`${baseURL}/chat`, JSON.stringify({firstId, secondId}))
        if (response.error)
          return console.log("Error creating chat ");
          setUChat(response);
    },[])
  return <Container>
    <PotentialChat user={user} uChat={userChat} createChat={createChat}/>
    {userChat?.length < 1 ? "ChatList" :
        (<Stack direction="horizontal" gap={4} 
            className="align-items-start" >
        <Stack className="message-box flex-grow-0 pe-3" gap={3}>
            {isUserChatLoading && <p> loading Chats... </p>}
            {userChat?.map((chat: any, index: number) => {
                
                console.log("before component ", chat, index);                
                return (
                <div key={index}>
                  <UserChat chat={chat} user={user} />
                </div>
                )
            })
        }
        {!userChat && (<p> yout Chat List</p>)}
        </Stack>
        <p>ChatBox</p>
        </Stack>)
    }

  </Container>;
};

export default Chat;
