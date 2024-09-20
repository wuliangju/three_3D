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
    // const geometry = new THREE.BoxGeometry(100, 100, 100) // 正方体&长方体
    // const geometry = new THREE.CylinderGeometry(50, 50, 100, 32)  // 圆柱体
    // const geometry = new THREE.ConeGeometry(50, 100, 32)  // 圆锥体
    // const geometry = new THREE.SphereGeometry(50, 32, 32) // 球体
    // const geometry = new THREE.TorusGeometry(50, 20, 32, 32)  // 圆环体
    // const geometry = new THREE.TorusKnotGeometry(50, 10, 32, 32)  // 圆环形纽结体
    // const geometry = new THREE.PlaneGeometry(100, 100)  // 平面
    const geometry = new THREE.CircleGeometry(50, 32)
    const material = new THREE.MeshLambertMaterial({ color: 0x00ffff })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // 创建光源
    const pointLight = new THREE.PointLight(0xffffff, 1.0)
    pointLight.position.set(400, 200, 300)
    scene.add(pointLight)

    // 创建相机
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
    camera.position.set(500, 0, 200)
    camera.lookAt(mesh.position)
    scene.add(camera)

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    this.$refs.container.appendChild(renderer.domElement)
    renderer.render(scene, camera)

    // 创建相机拖动控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', () => {
      renderer.render(scene, camera)
    })

    // 动画循环
    const animate = () => {
      mesh.rotateX(0.01)
      // mesh.rotateY(0.1)
      // mesh.rotateZ(0.1)
      renderer.render(scene, camera)
      controls.update()
      requestAnimationFrame(animate)
    }
    animate()
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100vh;
}
</style>