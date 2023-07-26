import Peer from 'peerjs';
import React, { useState, useEffect } from 'react';

const audioOnlyConfig = { audio: true, video: false };
const userMediaConfig = {
    audio: { echoCancellation: true, noiseSuppression: true },
};

const config = { 'iceServers': [{ 'urls': ['stun:stun.l.google.com:19302'] }] };

export default function usePeer(peerId: string, addRemoteStream: any, removeRemoteStream: any) {
  const [ myPeer, setPeer ] = useState<Peer | null>(null);
  const [ myPeerID, setMyPeerID ] = useState(null);

  const cleanUp = () => {
    if (myPeer) {
        myPeer.disconnect();
        myPeer.destroy();
    }
    setPeer(null);
    setMyPeerID(null);
  }

  useEffect(() => {
    import('peerjs').then(() => {
      const Config = {
        host: "9000-peers-peerjsserver-91xyiv47wpj.ws-us102.gitpod.io",
        secure: true,
        path: '/'
    };

      const peer: Peer = myPeer ? myPeer : new Peer(peerId, Config)

      peer.on('open', () => {
        console.log("ok connected")

        setPeer(peer);
      });

      peer.on('connection', () => {
        console.log("connection established");
      })

      peer.on('error', (err) => {
        console.log(err);
      })

      peer.on('call', (call) => {
        navigator.mediaDevices.getUserMedia(userMediaConfig).then((stream) => {
          call.answer(stream);

          console.log('streaming')

          call.on('stream', (remoteStream) => {
            addRemoteStream(remoteStream, call.peer);
            console.log(remoteStream, 'stream')
          });

          call.on('close', () => {
            console.log("The call has ended");
            removeRemoteStream(call.peer);
          });

          call.on('error', (error) => {
            console.log(error);
            removeRemoteStream(call.peer);
          });
        }).catch(err => console.log(err));
      });
    });

    return () => {
      cleanUp();
    }
  }, [])

  return [myPeer, myPeerID];
}