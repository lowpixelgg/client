export class StreamSplit {
  stream: MediaStream;
  context: AudioContext;
  listener: AudioListener;
  panner: PannerNode;
  gainNode: GainNode; // Novo nó de ganho

  constructor(stream: MediaStream) {
    this.stream = stream;

    const track = stream.getAudioTracks()[0];
    this.context = new AudioContext();
    this.listener = this.context.listener;

    const source = this.context.createMediaStreamSource(new MediaStream([track]));

    this.listener.positionX.value = 0;
    this.listener.positionY.value = 0;
    this.listener.positionZ.value = 1; // Ajuste da posição Z para cima, de acordo com as coordenadas do GTA: SA

    this.panner = this.context.createPanner();
    this.gainNode = this.context.createGain(); // Criar o nó de ganho

    this.panner.refDistance = 1;
    this.panner.panningModel = "HRTF";
    this.panner.distanceModel = "linear";
    this.panner.rolloffFactor = 1; // Ajuste para uma curva de atenuação mais suave
    this.panner.coneOuterAngle = 360; // Definir o ângulo externo do cone como 360 para som omnidirecional
    this.panner.coneOuterGain = 0; // Desligar o cone para evitar perdas
    this.panner.coneInnerAngle = 360; // Definir o ângulo interno do cone como 360 para som omnidirecional

    source.connect(this.panner).connect(this.gainNode).connect(this.context.destination);
  }

  public setPlayerPosition(x: number, y: number, z: number) {
    // Ajustar as coordenadas do GTA: SA para a escala do contexto de áudio
    if (this.listener) {
      this.listener.positionX.value = x;
      this.listener.positionY.value = y;
      this.listener.positionZ.value = z + 1; // Ajuste da posição Z para cima, de acordo com as coordenadas do GTA: SA
      
      // Calcula a distância entre a posição do jogador e a posição do áudio
      const distance = Math.sqrt(
        (this.listener.positionX.value - this.panner.positionX.value) ** 2 +
        (this.listener.positionY.value - this.panner.positionY.value) ** 2 +
        (this.listener.positionZ.value - this.panner.positionZ.value) ** 2
      );

      // Ajusta o ganho com base na distância
      this.gainNode.gain.value = 1 / (1 + 0.1 * distance); // Use um fator adequado para controlar a atenuação
    }
  }

  
  public setAudioPosition(x: number, y: number, z: number) {
    // Ajustar as coordenadas do GTA: SA para a escala do contexto de áudio
    if (this.panner) {
      this.panner.positionX.value = x;
      this.panner.positionY.value = y;
      this.panner.positionZ.value = z + 1; // Ajuste da posição Z para cima, de acordo com as coordenadas do GTA: SA
    }
  }

  public setVolume(volume: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = volume;
    }
  }

  public close() {
    return this.context.close();
  }
}
