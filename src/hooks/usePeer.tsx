import Peer from 'peerjs';
import React, { useState, useEffect } from 'react';

const audioOnlyConfig = { audio: true, video: false };
const userMediaConfig = {
    audio: { echoCancellation: true, noiseSuppression: true },
    video: { facingMode: "user" }
};


export default function usePeer(addRemoteStream: any, removeRemoteStream: any) {
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
      const peer: Peer = myPeer ? myPeer : new Peer('1', {
        host: 'localhost',
        secure: false,
        port: 9000,
        path: '/voip',
        debug: 0,
      })

      peer.on('open', () => {
        console.log("connection established")
      })
    });

    return () => {
      cleanUp();
    }
  }, [])

  return [myPeer, myPeerID];
}