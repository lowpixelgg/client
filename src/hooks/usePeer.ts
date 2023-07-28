import Peer, { CallOption, MediaConnection } from 'peerjs';
import React, { useState, useEffect } from 'react';

function getAudioStream() {
  return navigator.mediaDevices.getUserMedia({ audio: true });
}

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
        host: "agenciaab.com.br",
        port: 9000,
        path: '/peerjs'
      };

      const peer: Peer = myPeer ? myPeer : new Peer(peerId, Config)

      peer.on('open', () => {
        setPeer(peer);

        console.log('[PEER]: Connection established')
      });

      peer.on('connection', () => {
        console.log('[PEER]: On Peer Connection')
      })

      peer.on('error', (err) => {
        console.log('[PEER]: New Error  throwed on usePeer: ' + err);
      })

      peer.on('call', async (call) => {
        call.answer(await getAudioStream());
      });
    });

    return () => {
      cleanUp();
    }
  }, [])


  return [ myPeer, myPeerID ];
}