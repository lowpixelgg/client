import { useRef, useCallback } from "react";

export default function useStream() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const setStream = useCallback((stream: MediaStream | null) => {
    if (stream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
  }, []);

  const handleCanPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return [setStream, videoRef, handleCanPlay] as const;
}
