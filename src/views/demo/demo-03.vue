<template>
  <div class="container" ref="container"></div>
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
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array([
      0, 0, -10,
      50, 0, 1,
      0, 100, 0,
      0, 0, 10,
      0, 0, 100,
      50, 0, 10
    ])
    const attribute = new THREE.BufferAttribute(vertices, 3)
    console.log(geometry)
    geometry.attributes.position = attribute
    // geometry.setAttribute('position', attribute)

    // 创建点材质
    const material = new THREE.PointsMaterial({
      color: 0xff0000,
      size: 5
    })
    // 定义点模型
    const point = new THREE.Points( geometry, material )
    scene.add(point)

    // 创建三维坐标
    const axesHelper = new THREE.AxesHelper(100)
    scene.add(axesHelper)
    
    // 创建环境光
    const ambient = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambient)

    // 创建相机
    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 )
    camera.position.set(0, 0, 150)
    camera.lookAt(0, 0, 0)
    scene.add(camera)
    const controls = new OrbitControls(camera, this.$refs.container)

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    this.$refs.container.appendChild(renderer.domElement)
    renderer.render(scene, camera)
    
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
<style>
.container {
  width: 100%;
  height: 100vh;
}
</style>