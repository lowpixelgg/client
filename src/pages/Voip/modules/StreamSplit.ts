export class StreamSplit {
  stream: MediaStream;
  context: AudioContext;
  listener: AudioListener;
  panner: PannerNode;
  gain: GainNode;

  constructor (stream: MediaStream) {
    this.stream = stream;
    
    const track = stream.getAudioTracks()[0];
    this.context = new AudioContext();
    this.listener = this.context.listener;

    const source = this.context.createMediaStreamSource(stream)
    
    this.listener.positionX.value = 0;
    this.listener.positionY.value = 0;
    this.listener.positionZ.value = 0;

    this.panner = this.context.createPanner();
    this.gain = this.context.createGain();


    this.panner.panningModel = "equalpower";
    this.panner.distanceModel = "exponential";
    this.panner.rolloffFactor = 1.2;
    this.panner.coneOuterAngle = 360;
    this.panner.coneOuterGain = 1;
    this.panner.coneInnerAngle = 360;
    this.panner.maxDistance = 50;

    this.panner.positionX.value = 0;
    this.panner.positionY.value = 0;
    this.panner.positionZ.value = 0;
    
    source.connect(this.panner).connect(this.gain).connect(this.context.destination);
  }


  public setPannerGain (value: number) {
    if (this.gain) {
      this.gain.gain.value = value;
    }
  }

  
  public setPlayerPosition (x: number, y: number, z: number) {
    if (this.panner) {
      this.listener.positionX.value = x;
      this.listener.positionY.value = y;
      this.listener.positionZ.value = z;
    }
  }

  public setAudioPosition (x: number, y: number, z: number) {
    if (this.panner) {
      this.panner.positionX.setValueAtTime(x, this.panner.context.currentTime);
      this.panner.positionY.setValueAtTime(y, this.panner.context.currentTime);
      this.panner.positionZ.setValueAtTime(z, this.panner.context.currentTime);
    }
  }


  public close () {
    return this.context.close();
  }
}