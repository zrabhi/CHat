import { Stack } from "react-bootstrap";
import { User } from "../context/chatContext";
import { useFetchRecipient } from "../hooks/useFetchRecipient";
import avatar  from '../assets/undraw_drink_coffee_v3au.svg'
export interface ChatProp {
  chat: any;
  user: User;
}

export const UserChat: React.FC<ChatProp> = ({ chat, user }) => {
  const { recipientUser }: any = useFetchRecipient(chat, user);

  return (
    <Stack
      direction="horizontal"
      gap={4}
      className="user-card align-items-center p-2 justify-content-between "
    >
      <div className="d-flex">
        <div className="me-2">
            <img src={avatar} height="35px" / >
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Last maessage </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">2023/7/27</div>
            <div className="this-user-notifications">2</div>
            <span className="user-online"></span>
        </div>
      </div>
    </Stack>
  );
};
