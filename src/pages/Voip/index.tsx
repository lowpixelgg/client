import { Footer } from "@/components/Footer";
import { Container } from "./styles";
import { SideNav } from "@/components/SideNav";
import { TopStatus } from "../Main/TopStatus";
import RocketMap from "@/assets/FullMap.png";
import PIcon from "@/assets/playerMapIcon.png";
import MIcon from "@/assets/images/avatar1.png";

import { ImageOverlay, MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const PlayerIcon = L.icon({
  iconUrl: PIcon,
  iconSize: [20, 20],
});

const MemberIcon = L.icon({
  iconUrl: MIcon,
  iconSize: [32, 32],
});

export const Voip = () => {
  return (
    <Container>
      <TopStatus />

      <SideNav />

      <Footer />

      <Map />
    </Container>
  );
};

const Map = () => {
  return (
    <MapContainer
      zoom={6}
      zoomControl={false}
      scrollWheelZoom={false}
      center={[60, 134.3]}
      maxBounds={[
        [0, 0],
        [200, 200],
      ]}
      style={{ height: "100%", width: "100%", zIndex: 1 }}
    >
      <ImageOverlay
        url={RocketMap}
        zIndex={1}
        bounds={[
          [0, 0],
          [200, 200],
        ]}
        opacity={1}
      />

      <Marker position={[60, 134.3]} icon={PlayerIcon} />

      <Marker position={[62, 132.3]} icon={MemberIcon}>
        <Popup>Zé da manga</Popup>
      </Marker>

      <Marker position={[61, 130.8]} icon={MemberIcon}>
        <Popup>Bozo</Popup>
      </Marker>

      <Marker position={[59, 138.3]} icon={MemberIcon}>
        <Popup>Konima</Popup>
      </Marker>
    </MapContainer>
  );
};
