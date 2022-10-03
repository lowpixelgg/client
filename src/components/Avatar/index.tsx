import { Container } from "./styles";
import AvatarImg from "@/assets/images/avatar1.png";

export const Avatar = () => {
  return (
    <Container className="avatar">
      <img src={AvatarImg} />

      <span style={{ background: "#3BA55C" }} />
    </Container>
  );
};
