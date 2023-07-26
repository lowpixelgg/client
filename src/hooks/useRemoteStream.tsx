import { useState, useCallback } from 'react';
import { StreamSplit } from './StreamSplit';

interface RemoteStream {
  peerId: string;
  split: StreamSplit;
  stream: MediaStream;
}

type AddRemoteStreamFunction = (stream: MediaStream, peerId: string) => void;
type RemoveRemoteStreamFunction = (peerId: string) => void;

export default function useRemoteStreams(): [RemoteStream[], AddRemoteStreamFunction, RemoveRemoteStreamFunction] {
  const [remoteStreams, setRemoteStreams] = useState<RemoteStream[]>([]);

  const addRemoteStream = useCallback((stream: MediaStream, peerId: string) => {
    if (!stream || !peerId) return;

    setRemoteStreams(prevRemoteStreams => {
      // Check if the peerId already exists in remoteStreams
      if (prevRemoteStreams.some(remote => remote.peerId === peerId)) {
        return prevRemoteStreams;
      }

      // If the peerId is unique, add the new stream to remoteStreams
      return [...prevRemoteStreams, { peerId: peerId, split: new StreamSplit(stream), stream: stream }];
    });
  }, []);

  const removeRemoteStream = useCallback((peerId: string) => {
    setRemoteStreams(prevRemoteStreams => {
      // Filter out the remote stream with the given peerId
      return prevRemoteStreams.filter(remote => remote.peerId !== peerId);
    });
  }, []);

  return [remoteStreams, addRemoteStream, removeRemoteStream];
}
