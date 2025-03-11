<template>
  <div class="container" ref="container"></div>
</template>
<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export default {
  mounted() {
    const scene = new THREE.Scene()
    const width = this.$refs.container.clientWidth
    const height = this.$refs.container.clientHeight
    
    // 创建几何体
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array([
      0, 0, 0,
      50, 0, 1,
      0, 100, 0,
      0, 0, 10,
      0, 0, 100,
      50, 0, 10
    ])
    const attribute = new THREE.BufferAttribute(vertices, 3)
    geometry.attributes.position = attribute

    // 网格模型
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      // side: THREE.DoubleSide  // 双面可见
      // side: THREE.FrontSide // 前面可见
      side: THREE.BackSide  // 后面可见
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    
    // 环境光
    const ambient = new THREE.AmbientLight(0xffffff)
    scene.add(ambient)

    // 三维坐标
    const axesHelper = new THREE.AxesHelper(100)
    scene.add(axesHelper)
    
    // 相机
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 0, 150)
    camera.lookAt(0, 0, 0)
    scene.add(camera)
    
    // 渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    this.$refs.container.appendChild(renderer.domElement)
    renderer.render(scene, camera)
    // 轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    
    const animate = () => {
      controls.update()
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
    window.onresize = () => {
      const width = this.$refs.container.clientWidth
      const height = this.$refs.container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
  }
}
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100vh;
  }
</style>