import chalk from 'chalk';
import Peer, { CallOption, MediaConnection } from 'peerjs';
import React, { useState, useEffect } from 'react';
import { StreamSplit } from './StreamSplit';

function getAudioStream() {
  return navigator.mediaDevices.getUserMedia({ audio: true });
}

export function usePeer(peerId: string, addRemoteStream: any, removeRemoteStream: any) {
  const [ myPeer, setPeer ] = useState<Peer | null>(null);

  const cleanUp = () => {
    if (myPeer) {
        myPeer.disconnect();
        myPeer.destroy();
    }
    setPeer(null);
  }

  const getAudioStream = () => {
    return navigator.mediaDevices.getUserMedia({ audio: true });
  };


 
  useEffect(() => {
    import('peerjs').then(() => {
      const Config = {
        host: "agenciaab.com.br",
        port: 9000,
        path: '/peerjs',
      };

      const peer: Peer = myPeer ? myPeer : new Peer(peerId, Config)

      peer.on('open', () => {
        setPeer(peer);

        console.log(`${chalk.cyan('[PEER]:')} Connection established`);
      });


      peer.on('call', async (call) => {    
        call.answer(await getAudioStream());
        console.log(`${chalk.cyan('[PEER]:')} Receiving call from ${call.peer}`);
        
        call.on('stream', (remoteStream) => {
          addRemoteStream(remoteStream, call.peer);
        })

        call.on('close', () => {
          console.log(`${chalk.cyan('[PEER]:')} Stream with ${call.peer} has been closed`);

          removeRemoteStream(call.peer);
        })

        call.on('error', (err) => {
          console.log(err);
          removeRemoteStream(call.peer);
        })
      });

      peer.on('disconnected', () => {
        cleanUp();
      })

      peer.on('close', () => {
        cleanUp();
      })

      peer.on('error', () => {
        cleanUp();
      })
    });

    return () => {
      cleanUp();
    }
  }, [])


  return [ myPeer ];
}