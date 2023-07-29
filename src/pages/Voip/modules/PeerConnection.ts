import chalk from 'chalk';
import Peer, { CallOption, MediaConnection } from 'peerjs';
import React, { useState, useEffect } from 'react';
import { StreamSplit } from './StreamSplit';

function getAudioStream() {
  return navigator.mediaDevices.getUserMedia({ audio: true });
}

export default function usePeer(peerId: string, streams: any[], setStreams: React.Dispatch<React.SetStateAction<any[]>>) {
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


  // const handleCallPlayer = async (player: any) => {
  //   if (myPeer) {
  //     const exists = streams.some((stream) => stream.id === player.id);
      
  //     if (!exists) {
  //       const call: MediaConnection = myPeer.call(
  //         player.id,
  //         await getAudioStream()
  //       );

  //       if (call) {
  //         streams.push(player);

  //         console.log(`${chalk.cyan("[PEER]:")} Requested call to: ` + player.id);
  //         const index = streams.findIndex(s => s.id === player.id);

          
  //         call.on('stream', (stream: MediaStream) => {
  //           const newState = [...streams]
  //           newState[index].stream = stream
  //           newState[index].context = new StreamSplit(stream)

  //           setStreams(newState)

  //           console.log(`${chalk.cyan("[PEER]:")} Created call with: ` + player.id);
  //         });
  //       }
  //     } else {
  //       return streams.findIndex(s => s.id === player.id);
  //     }
  //   }
  // };

  
 
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

        console.log(`${chalk.cyan('[PEER]:')} Connection established`);
      });

      peer.on('error', (err) => {
        console.log(err)
      })

      peer.on('call', async (call) => {    
        call.answer(await getAudioStream());

        streams.push({ id: call.peer });

        console.log(`${chalk.cyan("[PEER]:")} Requested call to: ` + call.peer);
        const index = streams.findIndex(s => s.id === call.peer);

        
        call.on('stream', (stream: MediaStream) => {
          const newState = [...streams]
          newState[index].stream = stream
          newState[index].context = new StreamSplit(stream)

          setStreams(newState)

          console.log(`${chalk.cyan("[PEER]:")} Created call with: ` + call.peer);
        });

        console.log(`${chalk.cyan('[PEER]:')} Receiving Call from: ` + call.peer);
      });
    });

    return () => {
      cleanUp();
    }
  }, [])


  return [ myPeer, myPeerID ];
}