import { Container } from "./styles";
import AvatarImg from "@/assets/images/avatar1.png";
import useAccount from "@/services/hooks/useAccount";
import {useEffect} from 'react'

export const Avatar = () => {
  const { user } = useAccount();

  return (
    <Container className="avatar">
      <img src={user.avatar} style={{borderRadius: '50%'}} />

      <span style={{ background: "#3BA55C" }} />
    </Container>
  );
};
