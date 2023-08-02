import Peer from 'peerjs';
import freeice from "freeice"
import  { useState, useEffect } from 'react';


export default function usePeer(peerId: string, addRemoteStream: (stream: MediaStream, peerId: string) => void, removeRemoteStream: (peerId: string) => void) {
  const [ myPeer, setPeer ] = useState<Peer | null>(null);
  

  const cleanUp = () => {
    if (myPeer) {
        myPeer.disconnect();
        myPeer.destroy();
    }
    setPeer(null);
  }
  
 
  useEffect(() => {
    import('peerjs').then(() => {
      const Config = {
        host: "agenciaab.com.br",
        port: 9000,
        path: '/peerjs',
        iceServers: freeice()
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
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          call.answer(stream);
          
          call.on('stream', (remoteStream) => {
            addRemoteStream(remoteStream, call.peer);
          });

          call.on('close', () => {
            removeRemoteStream(call.peer);
          });


          call.on('error', (error) => {
            console.log(error);

            removeRemoteStream(call.peer)
          });
        });

        
        peer.on('disconnected', () => {
          console.log('[PEER]: Peer disconnected');
          cleanUp();
        })

        peer.on('close', () => {
          console.log('[PEER]: Peer closed');
          cleanUp();
        })


        peer.on('error', (error) => {
          console.log(error);
          cleanUp();
        })
        
        console.log('[PEER]: Receiving Call from ' + call.peer)
      });
    }).catch(err => console.log(err));

    return () => {
      cleanUp();
    }
  }, [])


  return [ myPeer ];
}