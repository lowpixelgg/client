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
import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { Avatar } from "@/components/Avatar";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { MdHeadphones, MdHeadsetOff } from "react-icons/md";
import { BsGearFill } from "react-icons/bs";
import useAccount from "@/services/hooks/useAccount";

import muteSoundFile from "@/assets/sounds/muteSound.mp3";
import unmuteSoundFile from "@/assets/sounds/unmuteSound.mp3";
import useRemoteStreams from "@/hooks/useRemoteStream.js";
import useStream from "@/hooks/useStream";
import PlayAudioStream from "./MediaStream";
import { ipcRenderer } from "electron";
import { GamePlayer, StreamPlayer } from "../../../electron/game-props/main";
import usePeer from "@/hooks/usePeer";
import { io, SocketOptions } from "socket.io-client";
import { SocketContext } from "@/contexts/socket";
import { Socket } from "socket.io";


const MuteSound = new Audio(muteSoundFile);
const UnmuteSound = new Audio(unmuteSoundFile);

MuteSound.volume = 0.1;
UnmuteSound.volume = 0.1;

const UserIcon = L.icon({
  iconUrl: UIcon,
  iconSize: [20, 20],
});

function getAudioStream() {
  return navigator.mediaDevices.getUserMedia({ audio: true });
}

export const Voip = () => {
  const { user } = useAccount();
  const [
    remoteStreams,
    addRemoteStream,
    removeRemoteStream,
  ] = useRemoteStreams();
  const [myPeer, myPeerID] = usePeer(
    user._id,
    addRemoteStream,
    removeRemoteStream
  );
  const [userPosition, setUserPosition] = useState({ x: 0, y: 0  });
  const [ streamingPlayers, setStreamingPlayers] = useState<StreamPlayer[]>([])
  const socket = useContext(SocketContext) as Socket


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


  const handleCallPlayer = async (peerId: string) => {
    console.log("chegou até aqui")
    if (myPeer) {
      const call = myPeer.call(peerId, await getAudioStream());



      if (call) {
        call.on("stream", async (stream) => {
          addRemoteStream(stream, call.peer);

          console.log(stream, peerId)
        });


        call.on('error', (err) => console.log(err))
      }
    }
  }


  useEffect(() => {
    socket.on('onServerHeartBeat', (data) => {
      const {
        coords,
        location,
        streamInPlayers,
      } = (data as unknown) as GamePlayer;
  
      setUserPosition({
        x: 240 + coords.x / 1000,
        y: 240 + coords.y / 1000,
      });  


      setStreamingPlayers(streamInPlayers);

      Object.entries(streamInPlayers).map(async (c) => {
        const entity = c[1];
        const voip = remoteStreams.find((stream) => stream.peerId === entity.id);

        if (!voip) {
          await handleCallPlayer(entity.id);
        } else {
          const { x, y, z } = entity.coords;
          voip.coords = { x: x, y: y, z: z };
          voip.split.setAudioPosition(x, y, z);
    
          voip.split.setPlayerPosition(coords.x, coords.y, coords.z);
        }
      })

    })
  }, [socket])




  ipcRenderer.setMaxListeners(15);
  // ipcRenderer.on('onServerCallPeer', async (_, peer) => await );

  // ipcRenderer.on('onServerDisconectPeer', (event, peer) => {
  // })

  return (
    <>
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
          onClick={() => { handleCallPlayer('e8718e5b-53a4-43b9-b719-7603bf81ded2') }}
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

      <Map  userPosition={userPosition} />

      {remoteStreams.map((audio) => (
        <PlayAudioStream stream={audio.stream} target={audio.peerId} key={audio.peerId} />
      ))}
    </Container>
    </>
  );
};


type MapProps = {
  userPosition: {
    x: number;
    y: number;
  };
}

const Map = ({ userPosition }: MapProps) => {
  return (
    <MapContainer
      zoom={5}
      zoomControl={false}
      scrollWheelZoom={false}
      center={[userPosition.x, userPosition.y]}
      style={{ height: "100%", width: "100%", zIndex: 1, outline: "none" }}
      dragging={false}
      bounds={[
        [0, 0],
        [480, 480],
      ]}
      maxBounds={[
        [0, 0],
        [480, 480],
      ]}
      maxBoundsViscosity={1}
      crs={L.CRS.Simple}
      doubleClickZoom={false}
    >
      <ImageMap userPosition={userPosition} />
    </MapContainer>
  );
};



const ImageMap = ({ userPosition }: MapProps) => {
  const [playersList, setPlayerList] = useState([
    {
      id: 1,
      x: 160,
      y: 99.5,
      isTalking: false,
      name: "lontrinha",
      avatar:
        "https://media.discordapp.net/attachments/916053830272155652/1055839901184163842/FkaPYQdXEAMlFD8.png?width=450&height=437",
    },
  ]);

  const map = useMap();


  useEffect(() => {
    map.setView([userPosition.x, userPosition.y]);
  }, [userPosition]);

  return (
    <>
      <ImageOverlay
        url={RocketMap}
        zIndex={1}
        bounds={[
          [0, 0],
          [480, 480],
        ]}
        opacity={1}
      />

      <Marker
        interactive={false}
        position={[userPosition.x, userPosition.y]}
        icon={UserIcon}
      />

      {playersList.map((item) => {
        return (
          <Marker
            key={item.id}
            position={[item.x, item.y]}
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
