<template>
  <div>
    <div class="container" ref="container"></div>
  </div>
</template>
<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    const scene = new THREE.Scene();
    const width = this.$refs.container.clientWidth;
    const height = this.$refs.container.clientHeight;

    const camera = new THREE.PerspectiveCamera();
    camera.position.set(0, 200, 300);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);
    
    // const light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(40, 60, 10);
    // scene.add(light);
    // 点光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(0, 200, 300);
    scene.add(point);

    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    this.$refs.container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
    const controls = new OrbitControls(camera, renderer.domElement);

    const group1 = new THREE.Group();
    group1.name = '高层楼房'
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BoxGeometry(20, 60, 10)
      const material = new THREE.MeshLambertMaterial({ color: 0x00ffff })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.name = `${i + 1}号楼`
      mesh.position.x = i * 30
      group1.add(mesh)
    }
    scene.add(group1)
    
    const group2 = new THREE.Group()
    group2.name = '低层楼房'
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BoxGeometry(20, 30, 10)
      const material = new THREE.MeshLambertMaterial({ color: 0x00ffff })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.name = `${i + 5 + 1}号楼`
      mesh.position.x = i * 30
      mesh.position.z = 50
      group2.add(mesh)
    }
    scene.add(group2)
    
    const model = new THREE.Group()
    model.add(group1, group2)
    scene.add(model)
    
    // 遍历
    model.traverse( obj => {
      if (obj.isMesh) console.log(obj.name)
    })
    // 查找
    model.getObjectByName('1号楼').material.color.set(0xff0000)
    const animate = () => {
      controls.update();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
      // 监听窗口变化
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)
    })
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100vh;
}
</style>
