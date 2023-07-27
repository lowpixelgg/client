import { useState, useCallback } from 'react';
import { StreamSplit } from './StreamSplit';

interface RemoteStream {
  peerId: string;
  split: StreamSplit;
  stream: MediaStream;
  coords: {
    x: number;
    y: number;
    z: number;
  }
}

type AddRemoteStreamFunction = (stream: MediaStream, peerId: string) => void;
type RemoveRemoteStreamFunction = (peerId: string) => void;
type SetStreamPosition = (peerId: string, x: number, y: number, z: number) => void;

export default function useRemoteStreams(): [RemoteStream[], AddRemoteStreamFunction, RemoveRemoteStreamFunction] {
  const [remoteStreams, setRemoteStreams] = useState<RemoteStream[]>([]);

  const addRemoteStream = useCallback((stream: MediaStream, peerId: string) => {
    if (!stream || !peerId) return;

    setRemoteStreams(prevRemoteStreams => {
      if (prevRemoteStreams.some(remote => remote.peerId === peerId)) {
        return prevRemoteStreams;
      }

      return [...prevRemoteStreams, { peerId: peerId, coords: { x: 0, y: 0, z: 0 }, split: new StreamSplit(stream), stream: stream }];
    });
  }, []);

  const removeRemoteStream = useCallback((peerId: string) => {
    setRemoteStreams(prevRemoteStreams => {
      return prevRemoteStreams.filter(remote => remote.peerId !== peerId);
    });
  }, []);

  const setStreamPosition = useCallback((peerId: string, x: number, y: number, z: number) => {
    const index = remoteStreams.findIndex(remote => remote.peerId === peerId);

    if (index !== -1) {
      remoteStreams[index].coords = { x, y, z }
    }
  }, []);

  return [remoteStreams, addRemoteStream, removeRemoteStream];
}
