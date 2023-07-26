import { Footer } from "@/components/Footer";
import { Container } from "./styles";
import { SideNav } from "@/components/SideNav";
import { TopStatus } from "../Main/TopStatus";
import RocketMap from "@/assets/FullMap.png";
import UIcon from "@/assets/playerMapIcon.png";
// import PIcon from "@/assets/images/avatar1.png";

import {
  ImageOverlay,
  MapContainer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Avatar } from "@/components/Avatar";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { MdHeadphones, MdHeadsetOff } from "react-icons/md";
import { BsGearFill } from "react-icons/bs";
import useAccount from "@/services/hooks/useAccount";

import muteSoundFile from "@/assets/sounds/muteSound.mp3";
import unmuteSoundFile from "@/assets/sounds/unmuteSound.mp3";
import usePeer from "@/hooks/usePeer";
import { ipcRenderer } from "electron";
import useUserMedia from "@/hooks/useUserMedia";
import useRemoteStreams from "@/hooks/useRemoteStream.js";
import { MediaConnection } from "peerjs";

interface StreamPlayer {
  id: string,
  coords: {
    x: number,
    y: number,
    z: number,
  }
}

interface game  { 
    location: string,
    coords: { x: number, y: number }
    streamInPlayers: StreamPlayer[]
}

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
  const [myPeer, myPeerID ] = usePeer(user._id);
  const localstream = useUserMedia();
  const [remoteStreams, addRemoteStream, removeRemoteStream] = useRemoteStreams();

  const [voiceStatus, setVoiceStatus] = useState({
    micOn: true,
    audioOn: true,
  });

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


  // Events
  ipcRenderer.on('onServerHeartBeat', (_, data) => {
    const { coords, location, streamInPlayers } = data as unknown as game;
  });

  ipcRenderer.on('onServerCallPeer', (_, peer) => {
    if (localstream && myPeer) {
      const call = myPeer.call(peer, localstream) as MediaConnection;

      call.on('stream', (remoteStream) => {
        addRemoteStream(remoteStream, call.peer);
        console.log('Connected to ' + call.peer);
      });

      call.on('close', () => {
        console.log('Disconnected from ' + call.peer);
      })

      call.on('error', (error) => {
        console.log("call error", error);
        removeRemoteStream(call.peer);
        call.close();
      });
    }
  });

  ipcRenderer.on('onServerDisconectPeer', (event, peer) => {

  })


  return (
    <Container>
      <TopStatus />

      <SideNav />

      <Footer />

      <div className="voiceControls">
        <Avatar size={40} />

        <div className="username">
          <strong>{user.username}</strong>
          <p>{user.username}</p>
        </div>

        <button
          onClick={() => handleVoiceAction("mic")}
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
    </Container>
  );
};

const Map = () => {
  // 98.5, 161

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
  ]);

  const map = useMap();

  // map.addEventListener("click", (e) => {

  // });

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
