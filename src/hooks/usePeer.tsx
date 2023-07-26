import Peer from 'peerjs';
import React, { useState, useEffect } from 'react';

const audioOnlyConfig = { audio: true, video: false };
const userMediaConfig = {
    audio: { echoCancellation: true, noiseSuppression: true },
    video: { facingMode: "user" }
};

const config = { 'iceServers': [{ 'urls': ['stun:stun.l.google.com:19302'] }] };

export default function usePeer(peerId: string) {
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
        // host: "9000-peers-peerjsserver-91xyiv47wpj.ws-us102.gitpod.io",
        secure: true,
        // path: '/'
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302'}, 
            { urls: 'stun:stun1.l.google.com:19302'}, 
            { urls: 'stun:stun2.l.google.com:19302'}, 
        ]
    };

      const peer: Peer = myPeer ? myPeer : new Peer(peerId, Config)

      peer.on('open', () => {
        console.log("ok connected")
      });

      peer.on('connection', () => {
        console.log("connection established");
      })

      peer.on('error', (err) => {
        console.log(err);
      })

      peer.on('call', (call) => {
        console.log('receiving call from ' + call.peer)
      });
    });

    return () => {
      cleanUp();
    }
  }, [])

  return [myPeer, myPeerID];
}