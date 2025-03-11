<template>
    <div class="container" ref="container"></div>
</template>
<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  mounted() {
    const scene = new THREE.Scene();
    const width = this.$refs.container.clientWidth;
    const height = this.$refs.container.clientHeight;

    const textLoad = new THREE.TextureLoader();
    const texture = textLoad.load('https://img.qingmo.com/300225/2021/09/26/ce0b52a01ea411ec8cbb000c29a99215.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);

    const geometry = new THREE.PlaneGeometry(500, 500);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: texture
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    const axesHelper = new THREE.AxesHelper(250);
    scene.add(axesHelper);

    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(0, 200, 300);
    camera.lookAt(scene.position);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    this.$refs.container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
    const controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', () => {
      const width = this.$refs.container.clientWidth;
      const height = this.$refs.container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
    });

    const animate = () => {
      controls.update();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100vh;
}
</style>