import * as THREE from 'three';



export default class StandardAudio {
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private listener: THREE.AudioListener;
  private renderer: THREE.WebGLRenderer;

  
  constructor() {
    this.camera = new THREE.PerspectiveCamera(70, 1, 0.01, 10);
    this.scene = new THREE.Scene();

    this.camera.position.set(0, 0, 0);

    this.listener = new THREE.AudioListener();

    
    this.camera.add(this.listener);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, });
    this.renderer.setSize(10, 10);
    
    document.body.appendChild(this.renderer.domElement);
  }

  public render () {
    this.renderer.render(this.scene, this.camera);
  }

  private createAudioSource(stream: MediaStream, uuid: string): THREE.Mesh {
    const sphere = new THREE.SphereGeometry(20, 32, 16);
    const material = new THREE.MeshPhongMaterial({ color: 0xff2200 });

    const object = new THREE.Mesh(sphere, material);
    const audioSource = new THREE.PositionalAudio(this.listener);
    
    audioSource.setMediaStreamSource(stream);
    audioSource.setVolume(1);
    audioSource.setRefDistance(1);
    audioSource.setMaxDistance(50);

    object.uuid = uuid;
    object.add(audioSource);

    return object;
  }


  public addStream(uuid: string, stream: MediaStream): void {
    const object = this.createAudioSource(stream, uuid);
    this.scene.add(object);
  }

  public updateListener(data: { x: number; y: number; z: number; angle: number }): void {
    this.camera.position.set(data.x, data.y, data.z);
    this.camera.rotation.y = THREE.MathUtils.degToRad(data.angle);
  }
  
  
  public removeAudioSource(uuid: string): void {
    const object = this.scene.getObjectByProperty('uuid', uuid) as THREE.Mesh;
    if (object) {
      if (Array.isArray(object.material)) {
        object.material.forEach(material => material.dispose());
      } else {
        object.material.dispose();
      }

      
      object.geometry.dispose();
      this.scene.remove(object);
    }
  }

  public updateAudioSource(player: { uuid: string; x: number; y: number; z: number; angle: number }): void {
    const object = this.scene.getObjectByProperty('uuid', player.uuid) as THREE.Mesh;

    if (object) {
      object.position.set(player.x, player.y, player.z);
      object.rotation.y = THREE.MathUtils.degToRad(player.angle);
    }
  }


  public isObjectExistent (uuid: string) {
    const object = this.scene.getObjectByProperty('uuid', uuid) as THREE.Mesh;

    if (object) {
      return true
    } else {
      return false
    }
  }
}
