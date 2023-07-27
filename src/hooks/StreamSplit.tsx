import React, { useEffect, useRef } from 'react';

interface StreamSplitProps {
  stream: MediaStream;
  audioPlayer: string;
  player: string;
}

export class StreamSplit {
  stream: MediaStream;
  context: AudioContext;
  listener: AudioListener;
  panner: PannerNode;

  constructor (stream: MediaStream) {
    this.stream = stream;
    
    const track = stream.getAudioTracks()[0];
    this.context = new AudioContext();
    this.listener = this.context.listener;

    const source = this.context.createMediaStreamSource(
      new MediaStream([track])
    )
    
    this.listener.positionX.value = 0;
    this.listener.positionY.value = 0;
    this.listener.positionZ.value = 0;

    this.panner = this.context.createPanner();

    this.panner.refDistance = 1;
    this.panner.panningModel = "HRTF";
    this.panner.distanceModel = "linear";
    this.panner.rolloffFactor = 10;
    this.panner.coneOuterAngle = 30;
    this.panner.coneOuterGain = 1;
    this.panner.coneInnerAngle = 10;
    this.panner.maxDistance = 50;

    this.panner.positionX.value = 0;
    this.panner.positionY.value = 0;
    this.panner.positionZ.value = 0;
    
    source.connect(this.panner).connect(this.context.destination);
  }
  
  public setPlayerPosition (x: number, y: number, z: number) {
    if (this.listener) {
      this.listener.positionX.value = x;
      this.listener.positionY.value = y;
      this.listener.positionZ.value = z;
    }
  }

  public setAudioPosition (x: number, y: number, z: number) {
    if (this.panner) {
      this.panner.positionX.value = x;
      this.panner.positionY.value = y;
      this.panner.positionZ.value = z;
    }
  }


  public close () {
    return this.context.close();
  }
}