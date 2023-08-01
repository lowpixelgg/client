import { Container } from "./styles";
import { Footer } from "@/components/Footer";
import { TopStatus } from "./TopStatus";
import { Post } from "./Post";
import { SideNav } from "@/components/SideNav";

export const Main = () => {
  return (
    <Container>
      <TopStatus />

      <div className="main">
        <Post />

        <SideNav />
      </div>

      {/* <Download /> */}
      <Footer />

    </Container>
  );
};
