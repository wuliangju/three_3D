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
    // 创建场景
    const scene = new THREE.Scene()
    const width = this.$refs.container.clientWidth
    const height = this.$refs.container.clientHeight

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 200, 400)
    camera.lookAt(scene.position)
    scene.add(camera)

    // 添加辅助线
    const axesHelper = new THREE.AxesHelper(100)
    scene.add(axesHelper)
    
    // 创建集合体
    const geometry = new THREE.BoxGeometry(100, 100, 100)
    const material = new THREE.MeshLambertMaterial({ color: 0x00ffff })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // 创建光源
    const pointLight = new THREE.PointLight(0xffffff, 1.0)
    pointLight.position.set(200, 200, 200)
    scene.add(pointLight)
    // 环境光
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    // scene.add(ambientLight)
    // 平行光
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
    // directionalLight.position.set(200, 200, 200)
    // scene.add(directionalLight)

    // 渲染
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    this.$refs.container.appendChild(renderer.domElement)
    renderer.render(scene, camera)

    // 相机控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', () => {
      renderer.render(scene, camera)
    })
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
</style>