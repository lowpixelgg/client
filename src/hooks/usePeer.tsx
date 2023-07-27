import Peer, { CallOption, MediaConnection } from 'peerjs';
import React, { useState, useEffect } from 'react';
import { StreamSplit } from './StreamSplit';
import useRemoteStreams from './useRemoteStream';

const userMediaConfig = {
    audio: { echoCancellation: true, noiseSuppression: true },
};

interface Streams {
  peer: string,
  stream: any,
}

function getAudioStream() {
  return navigator.mediaDevices.getUserMedia({ audio: true });
}

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
        host: "agenciaab.com.br",
        port: 9000,
        path: '/peerjs'
        // iceServers: [
        //     { urls: 'stun:stun.l.google.com:19302'}, 
        //     // { urls: 'stun:stun1.l.google.com:19302'}, 
        //     // { urls: 'stun:stun2.l.google.com:19302'}, 
        // ]
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

      peer.on('call', async (call) => {
        call.answer(await getAudioStream());
        
        call.on('stream', (stream) => {
          addRemoteStream(stream, call.peer)
        });
        //

        console.log("Connected to peer")
      });
    });

    return () => {
      cleanUp();
    }
  }, [])


  return [ myPeer, myPeerID, ];
}