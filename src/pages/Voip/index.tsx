import { Container } from "./styles";
import { SideNav } from "@/components/SideNav";
import { TopStatus } from "../Main/TopStatus";
import RocketMap from "@/assets/FullMap.png";
import UIcon from "@/assets/playerMapIcon.png";

import {
  ImageOverlay,
  MapContainer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Avatar } from "@/components/Avatar";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { MdHeadphones, MdHeadsetOff } from "react-icons/md";
import { BsGearFill } from "react-icons/bs";
import useAccount from "@/services/hooks/useAccount";

import muteSoundFile from "@/assets/sounds/muteSound.mp3";
import unmuteSoundFile from "@/assets/sounds/unmuteSound.mp3";
import { SocketContext } from "@/contexts/socket";
import usePeer from "@/hooks/usePeer";
import useRemoteStreams from "@/hooks/useRemoteStream";
import PlayAudioStream from "@/hooks/useMediaStream";

const MuteSound = new Audio(muteSoundFile);
const UnmuteSound = new Audio(unmuteSoundFile);

MuteSound.volume = 0.1;
UnmuteSound.volume = 0.1;

const UserIcon = L.icon({
  iconUrl: UIcon,
  iconSize: [20, 20],
});



export const Voip = () => {
  const { user } = useAccount();
  const [ remoteStreams, addRemoteStream, removeRemoteStream, getRemoteStream ] = useRemoteStreams()
  const [ myPeer ] = usePeer(user._id, addRemoteStream, removeRemoteStream);

  const [voiceStatus, setVoiceStatus] = useState({
    micOn: true,
    audioOn: true,
  });


  const localStream = () => navigator.mediaDevices.getUserMedia({ audio: true })


  const handleCallEveryone = async (id: string) => {
    if (getRemoteStream(id)) {
      return console.log('Stream already exists');
    }

    if (myPeer) {
      let call = myPeer.call(id, await localStream());

      call.on('stream', (stream) => {
        addRemoteStream(stream, call.peer);

        console.log('connected to ' + call.peer);
      });


      call.on('close', () => {
        console.log('call closed  with: ' + call.peer);
        removeRemoteStream(call.peer);
        call.close();
      });


      call.on('error', (error) => {
        console.log(error);
        removeRemoteStream(call.peer);
        call.close();
      });
    }
  }


  const handleVoiceAction = (action: string) => {
    if (voiceStatus.micOn || voiceStatus.audioOn) {
      MuteSound.play();
    }
    if (!voiceStatus.micOn || !voiceStatus.audioOn) {
      UnmuteSound.play();
    }

    if (action === "mic") {
      setVoiceStatus({ ...voiceStatus, micOn: !voiceStatus.micOn });
    } else {
      setVoiceStatus({ ...voiceStatus, audioOn: !voiceStatus.audioOn });
    }
  };

  return (
    <Container>
      <TopStatus />

      <SideNav />

      <div className="voiceControls">
        <Avatar size={40} />

        <div className="username">
          <strong>{user.username}</strong>
          <p>{user.username}</p>
        </div>

        <button
          onClick={() => handleCallEveryone('de7a65b6-9cd4-4092-b748-f3bab9e0400d')}
          style={{ width: 24, margin: "0 -2px" }}
        >
          {voiceStatus.micOn ? (
            <FaMicrophone size={18} />
          ) : (
            <FaMicrophoneSlash size={24} />
          )}
        </button>

        <button onClick={() => handleVoiceAction("audio")}>
          {voiceStatus.audioOn ? (
            <MdHeadphones size={24} />
          ) : (
            <MdHeadsetOff size={24} />
          )}
        </button>

        <button>
          <BsGearFill size={20} />
        </button>
      </div>

      <Map />

      {remoteStreams.map(r => <PlayAudioStream stream={r.stream}  target={r.peerId} key={r.peerId} />)}
    </Container>
  );
};

const Map = () => {
  const [userPosition, setUserPosition] = useState({
    posX: 161,
    posY: 98.5,
  });

  return (
    <MapContainer
      zoom={5}
      zoomControl={false}
      scrollWheelZoom={false}
      center={[userPosition.posY, userPosition.posX]}
      style={{ height: "100%", width: "100%", zIndex: 1, outline: "none" }}
      dragging={false}
      bounds={[
        [0, 0],
        [240, 240],
      ]}
      maxBounds={[
        [0, 0],
        [240, 240],
      ]}
      maxBoundsViscosity={1}
      crs={L.CRS.Simple}
      doubleClickZoom={false}
    >
      <ImageMap userPosition={userPosition} setUserPosition={setUserPosition} />
    </MapContainer>
  );
};

type ImageMapProps = {
  userPosition: {
    posX: number;
    posY: number;
  };
  setUserPosition: Dispatch<
    SetStateAction<{
      posX: number;
      posY: number;
    }>
  >;
};

const ImageMap = ({ userPosition, setUserPosition }: ImageMapProps) => {
  const [playersList, setPlayerList] = useState([
    {
      id: 1,
      posX: 160,
      posY: 99.5,
      isTalking: false,
      name: "lontrinha",
      avatar:
        "https://media.discordapp.net/attachments/916053830272155652/1055839901184163842/FkaPYQdXEAMlFD8.png?width=450&height=437",
    },
    {
      id: 2,
      posX: 160,
      posY: 97.5,
      isTalking: true,
      name: "Bozo",
      avatar:
        "https://i.pinimg.com/564x/de/30/d6/de30d6b0e6e02510b7f7d74b56cfeb11.jpg",
    },
    {
      id: 3,
      posX: 162,
      posY: 98,
      isTalking: false,
      name: "Konima",
      avatar:
        "https://i.pinimg.com/564x/e0/73/4c/e0734c4ed53a4dacde032be644c7abc7.jpg",
    },
    {
      id: 4,
      posX: 162.4,
      posY: 101.2,
      isTalking: true,
      name: "flashii",
      avatar:
        "https://i.pinimg.com/564x/84/56/7b/84567be65df5b8663af8bffd49542e01.jpg",
    },
  ]);

  const map = useMap();



  useEffect(() => {
    map.setView([userPosition.posY, userPosition.posX]);
  }, [userPosition]);

  return (
    <>
      <ImageOverlay
        url={RocketMap}
        zIndex={1}
        bounds={[
          [0, 0],
          [240, 240],
        ]}
        opacity={1}
      />

      <Marker
        interactive={false}
        position={[userPosition.posY, userPosition.posX]}
        icon={UserIcon}
      />

      {playersList.map((item) => {
        return (
          <Marker
            key={item.id}
            position={[item.posY, item.posX]}
            icon={L.icon({
              iconUrl: item.avatar,
              iconSize: [36, 36],
              className: `playerIcon ${item.isTalking ? "isTalking" : ""}`,
            })}
            title={item.name}
          >
            <Popup>{item.name}</Popup>
          </Marker>
        );
      })}
    </>
  );
};