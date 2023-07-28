import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const useThreeAudioScene = () => {
  const camera = useRef<THREE.PerspectiveCamera>();
  const scene = useRef<THREE.Scene>();
  const renderer = useRef<THREE.WebGLRenderer>();
  const listener = useRef<THREE.AudioListener>();

  useEffect(() => {
    camera.current = new THREE.PerspectiveCamera(70, 1, 0.01, 10);
    scene.current = new THREE.Scene();
    listener.current = new THREE.AudioListener();
    camera.current.add(listener.current);

    const rendererInstance = new THREE.WebGLRenderer({ antialias: true });
    renderer.current = rendererInstance;
    rendererInstance.setSize(100, 100);

    const animate = (time: number) => {
      if (renderer.current && camera.current && scene.current) {
        renderer.current.render(scene.current, camera.current);
      }

      requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (renderer.current) {
        renderer.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (renderer.current) {
      document.body.appendChild(renderer.current.domElement);
    }

    return () => {
      if (renderer.current) {
        document.body.removeChild(renderer.current.domElement);
      }
    };
  }, []);

  const addStream = (uuid: string, stream: MediaStream) => {
    if (scene.current && listener.current) {
      const sphere = new THREE.SphereGeometry(20, 32, 16);
      const material = new THREE.MeshPhongMaterial({ color: 0xff2200 });
      const object = new THREE.Mesh(sphere, material);
      const audioSource = new THREE.PositionalAudio(listener.current);

      audioSource.setMediaStreamSource(stream);
      audioSource.setVolume(1);
      audioSource.setRefDistance(1);
      audioSource.setMaxDistance(200);

      object.uuid = uuid;
      scene.current.add(object);
      object.position.set(0, 0, 0);
      object.add(audioSource);
    }
  };

  const updateListener = (data: { x: number; y: number; z: number; angle: number }) => {
    if (camera.current) {
      camera.current.position.set(data.x, data.y, data.z);
      camera.current.rotation.y = THREE.MathUtils.degToRad(data.angle);
    }
  };

  const removeAudioSource = (uuid: string) => {
    if (scene.current) {
      const object = scene.current.getObjectByProperty('uuid', uuid) as THREE.Mesh;
      if (object) {
        object.geometry.dispose();
        (object.material as THREE.MeshPhongMaterial).dispose(); // Use type assertion
        scene.current.remove(object);
      }
    }
  };

  const updateAudioSource = (player: { uuid: string; x: number; y: number; z: number; angle: number }) => {
    if (scene.current) {
      const object = scene.current.getObjectByProperty('uuid', player.uuid) as THREE.Mesh;
      if (object) {
        object.position.set(player.x, player.y, player.z);
        object.rotation.y = THREE.MathUtils.degToRad(player.angle);
      }
    }
  };


  const alreadyExistsAudioSource = (uuid:string) => {
    if (scene.current) {
      const object = scene.current.getObjectByProperty('uuid', uuid) as THREE.Mesh;

      if (object) {
        return true
      } else {
        return false;
      }
    }
  }

  return { addStream, updateListener, removeAudioSource, updateAudioSource, alreadyExistsAudioSource };
};

export default useThreeAudioScene;
