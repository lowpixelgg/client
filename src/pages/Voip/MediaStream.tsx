import React, { useEffect, useRef } from 'react';
// Importe o jQuery caso esteja usando-o

type Props = {
  stream: MediaStream | undefined
  target: string;
};

const PlayAudioStream: React.FC<Props> = ({ stream, target }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.muted = false;
      videoRef.current.setAttribute('data-peer', target);
      videoRef.current.onloadedmetadata = () => videoRef.current?.play();
      
      console.log("play")
    }
  }, [stream, target]);

  return <div className="audiostream-container"><video ref={videoRef} /></div>;
};

export default PlayAudioStream;