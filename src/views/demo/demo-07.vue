<template>
  <div>
    <div class="container" ref="container"></div>
  </div>
</template>
<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    const scene = new THREE.Scene()
    const width = this.$refs.container.clientWidth
    const height = this.$refs.container.clientHeight
    
    const loadTex = new THREE.TextureLoader()
    const textLoad = loadTex.load('https://n.sinaimg.cn/spider20230314/680/w1403h877/20230314/7e25-53f4fc7f8e8857d6cfb824444a2e01e2.png')
    // const geometry = new THREE.BoxGeometry(100, 100, 100)
    const geometry = new THREE.SphereGeometry(50)
    const material = new THREE.MeshLambertMaterial({ 
      // color: 0x00ffff,
      map: textLoad
    })
    const mesh = new THREE.Mesh(geometry, material)
    
    scene.add(mesh)

    const axesHelper = new THREE.AxesHelper(250)
    scene.add(axesHelper)
    
    // const light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(100, 200, 100);
    // scene.add(light);
    // const point = new THREE.PointLight(0xffffff);
    // point.position.set(0, 200, 200);
    // scene.add(point)
    // 环境光
    const ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
    camera.position.set(0, 200, 300)
    camera.lookAt(0, 0, 0)
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    this.$refs.container.appendChild(renderer.domElement)
    renderer.render(scene, camera)
    const controls = new OrbitControls(camera, renderer.domElement)

    window.addEventListener('resize', () => {
      const width = this.$refs.container.clientWidth
      const height = this.$refs.container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.render(scene, camera)
    })

    const animate = () => {
      controls.update()
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
  }
}
</script>
<style>
.container {
  width: 100%;
  height: 100vh;
}
</style>