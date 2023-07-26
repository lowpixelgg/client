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
      const peer: Peer = myPeer ? myPeer : new Peer(peerId, {
        host: '26.96.232.44',
        port: 9000,
        secure: false,
        path: '/voip',
      })

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