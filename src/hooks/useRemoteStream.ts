import { useState, useCallback } from 'react';

interface RemoteStream {
  peerId: string;
  stream: MediaStream;
}

export default function useRemoteStreams(): [
  RemoteStream[],
  (stream: MediaStream, peerId: string) => void,
  (peerId: string) => void,
  (peerId: string) => RemoteStream | false
] {
  const [remoteStreams, setRemoteStreams] = useState<RemoteStream[]>([]);

  const addRemoteStream = useCallback(
    (stream: MediaStream, peerId: string) => {
      setRemoteStreams(remoteStreams => {
        if (!stream || !peerId) return [...remoteStreams];
        if (remoteStreams.some(remote => remote.peerId === peerId)) return [...remoteStreams];
        return [...remoteStreams, { peerId: peerId, stream: stream }];
      });
    },
    [],
  );

  const removeRemoteStream = useCallback(
    (peerId: string) => {
      setRemoteStreams(remoteStreams => {
        const index = remoteStreams.findIndex(remote => remote.peerId === peerId);
        if (index < 0) return [...remoteStreams];
        const updatedRemoteStreams = [...remoteStreams];
        updatedRemoteStreams.splice(index, 1);
        return updatedRemoteStreams;
      });
    },
    [],
  );

  
  const getRemoteStream = useCallback(
    (peerId: string) => {
      const foundStream = remoteStreams.find(remote => remote.peerId === peerId);
      return foundStream ? foundStream : false;
    },
    [remoteStreams],
  );
  

  return [ remoteStreams, addRemoteStream, removeRemoteStream, getRemoteStream ];
}