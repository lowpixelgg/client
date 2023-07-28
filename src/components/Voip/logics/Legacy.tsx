import { StreamSplit } from "../StreamSplit";

interface LegacyStreams {
  uuid: string;
  streamSplit: StreamSplit 
}

export default class LegacyAudio {
  streams: LegacyStreams[] = [];
  
  constructor () {
    console.log("[AUDIO] Using AudioContext API (LegacyAudio)")
  }

  public addStream(uuid: string, stream: MediaStream): void {
    const exists = this.streams.some(s => s.uuid === uuid);

    if (!exists) {
      this.streams.push({
        uuid: uuid,
        streamSplit: new StreamSplit(stream)
      })
    }
  }

  public updateListener(data: { x: number; y: number; z: number; angle: number }): void {
    if (this.streams.length > 0) {
      this.streams.map((s, d) => {
        s.streamSplit.setPlayerPosition(data.x, data.y, data.z);
      })
    }
  }


  public removeAudioSource(uuid: string): void {
    const index = this.streams.findIndex(s => s.uuid === uuid);

    if (index !== -1) {
      this.streams[index].streamSplit.close();
      
      delete this.streams[index] 
    }
  }


  public updateAudioSource(player: { uuid: string; x: number; y: number; z: number; angle: number }): void {
    const index = this.streams.findIndex(s => s.uuid === player.uuid);

    if (index !== -1) {
      this.streams[index].streamSplit.setPlayerPosition(player.x, player.y, player.z);
    }
  }


  public isObjectExistent(uuid: string): boolean {
    const index = this.streams.findIndex(s => s.uuid === uuid);

    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  }
}