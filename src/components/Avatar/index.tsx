import { Container } from "./styles";
import AvatarImg from "@/assets/images/avatar1.png";
import useAccount from "@/services/hooks/useAccount";
import { useEffect } from "react";

type AvatarProps = {
  size?: number;
};

export const Avatar = ({ size }: AvatarProps) => {
  const { user } = useAccount();

  return (
    <Container className="avatar" size={size}>
      <img src={user.avatar} style={{ borderRadius: "50%" }} />

      <span style={{ background: "#3BA55C" }} />
    </Container>
  );
};
