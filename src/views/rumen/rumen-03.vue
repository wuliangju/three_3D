<template>
  <div>
    <div class="container" ref="container"></div>
  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  mounted() {
    const scene = new THREE.Scene()
    const width = this.$refs.container.clientWidth
    const height = this.$refs.container.clientHeight

    // 创建几何体
    const geometry = new THREE.BoxGeometry(100, 100, 100)
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5
     })
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const mesh = new THREE.Mesh(geometry, material)
          mesh.position.set(i * 100, 0,  j * 100)
          scene.add(mesh)
      }
    }

    // 创建相机
    const camera = new THREE.PerspectiveCamera(100, width/height, 0.1, 2000)
    camera.position.set(1000, 1000, 0)
    camera.lookAt(0, 0, 0)
    scene.add(camera)

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    this.$refs.container.appendChild(renderer.domElement)
    renderer.render(scene, camera)

    // 添加相控件
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', () => {
      renderer.render(scene, camera)
    })

    // 监听窗口变化
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100vh; /* 设置高度为视口高度 */
  background-color: #fff;
}
</style>