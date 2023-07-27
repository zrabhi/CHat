import { useContext } from "react";
import { chatContext, ChatContextState,User } from "../context/chatContext";
import { Container, Stack } from "react-bootstrap";
import { UserChat } from "../components/userChat";
interface ChatProp {
    user: User;
}
const Chat = ({user}: any) => 
{
    const { userChat, isUserChatLoading, userChatError } =  useContext(chatContext) as ChatContextState;

    console.log("UserChat==> ",userChat);
  return <Container>
    {userChat?.length < 1 ? null :
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
        </Stack>
        <p>ChatBox</p>
        </Stack>)
    }

  </Container>;
};

export default Chat;
