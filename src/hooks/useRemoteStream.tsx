import React, { useState, useCallback } from 'react';

interface RemoteStream {
    peerId: string;
    stream: MediaStream;
}

type AddRemoteStreamFunction = (stream: MediaStream, peerId: string) => void;
type RemoveRemoteStreamFunction = (peerId: string) => void;

export default function useRemoteStreams(): [RemoteStream[], AddRemoteStreamFunction, RemoveRemoteStreamFunction] {
    const [remoteStreams, setRemoteStreams] = useState<RemoteStream[]>([]);

    const addRemoteStream: AddRemoteStreamFunction = useCallback(
        (stream, peerId) => {
            setRemoteStreams((prevRemoteStreams) => {
                if (!stream || !peerId) return [...prevRemoteStreams];
                if (prevRemoteStreams.some((remote) => remote.peerId === peerId)) return [...prevRemoteStreams];
                return [...prevRemoteStreams, { peerId: peerId, stream: stream }];
            });
        },
        [],
    );

    const removeRemoteStream: RemoveRemoteStreamFunction = useCallback(
        (peerId) => {
            setRemoteStreams((prevRemoteStreams) => {
                const index = prevRemoteStreams.findIndex((remote) => remote.peerId === peerId);
                if (index < 0) return [...prevRemoteStreams];
                prevRemoteStreams.splice(index, 1);
                return [...prevRemoteStreams];
            });
        },
        [],
    );

    return [remoteStreams, addRemoteStream, removeRemoteStream];
}
