import * as THREE from 'three';
import StandardAudio from './logics/Standard';
import LegacyAudio from './logics/Legacy';



class AudioManager {
  logic: StandardAudio | LegacyAudio

  constructor() {
    this.logic = false ? new StandardAudio() : new LegacyAudio();
  }

  public render () {
    if (this.logic instanceof StandardAudio) {
      this.logic.render();
    } else {
      return false;
    }
  }

  public getMediaStreams () {
    if (this.logic instanceof LegacyAudio) {
      return this.logic.getMediaStreams();
    } else {
      return [];
    }
  }

  public addStream(uuid: string, stream: MediaStream): void {
    this.logic.addStream(uuid, stream);
  }

  public updateListener(data: { x: number; y: number; z: number; angle: number }): void {
    this.logic.updateListener(data);
  }
  
  public removeAudioSource(uuid: string): void {
    this.logic.removeAudioSource(uuid);
  }

  public updateAudioSource(player: { uuid: string; x: number; y: number; z: number; angle: number }): void {
    this.logic.updateAudioSource(player);
  }


  public isObjectExistent (uuid: string): boolean {
    return this.logic.isObjectExistent(uuid);
  }
}

export default AudioManager;
