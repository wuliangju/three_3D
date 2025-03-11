<template>
  <div>
    <div class="container" ref="container"></div>
  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from   'three/examples/jsm/libs/lil-gui.module.min.js'
export default {
  mounted() {
    const gui = new GUI()
    const scene = new THREE.Scene()
    const width = this.$refs.container.clientWidth
    const height = this.$refs.container.clientHeight

    // 创建几何体
    const geometry = new THREE.BoxGeometry(100, 100, 100)
    const material = new THREE.MeshLambertMaterial({ color: 0x00ffff })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    // mesh.position.set(0, 0, 0)
    // 绕着X轴旋转
    mesh.rotation.x = Math.PI / 4
    // console.log(mesh.position)
    // gui.add(mesh.position, 'x', 0, 100).name('x轴').step(1)
    // gui.add(mesh.position, 'x', [-50, 0 , 50]) // 下拉框
    // gui.add(mesh.position, 'x', { // 下拉框
    //   Left: -50,
    //   Center: 0,
    //   Right: 50
    // }).name('位置')
    // gui.add(mesh.position, 'y', 0, 100).name('y轴').step(1)
    // gui.add(mesh.position, 'z', 0, 100).name('z轴').step(1)
    
    // 分组
    const group01 = gui.addFolder('位置')
    group01.add(mesh.position, 'x', 0, 100).name('x轴').step(1)
    group01.add(mesh.position, 'y', 0, 100).name('y轴').step(1)
    group01.add(mesh.position, 'z', 0, 100).name('z轴').step(1)
    
    const group02 = gui.addFolder('颜色')
    group02.addColor(mesh.material, 'color')
    // gui.addColor(mesh.material, 'color').name('颜色')

    const group03 = gui.addFolder('其他')
    group03.add(mesh.material, 'flatShading').name('平面着色')
    group03.add(mesh.material, 'wireframe').name('线框')
    group03.add(mesh, 'visible').name('是否显示')
    
    // 创建辅助坐标系
    const axesHelper = new THREE.AxesHelper(100)
    scene.add(axesHelper)
    
    // 创建光源
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(300, 300, 300)
    scene.add(pointLight)
    
    // 创建环境光
    const ambient = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambient)
    // gui.add(pointLight, 'intensity', 0, 2).name('环境光').step(0.1)
    group03.add(pointLight, 'intensity', 0, 2).name('环境光').step(0.1)
    
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera(100, width/height, 0.1, 3000)
    camera.position.set(100, 200, 200)
    camera.lookAt(0, 0, 0)
    scene.add(camera)
    const controls = new OrbitControls(camera, this.$refs.container)
    controls.enableDamping = true // 阻尼
    controls.dampingFactor = 0.01 // 阻尼系数
    // controls.autoRotate = true  // 自动旋转
    // controls.addEventListener('change', () => {
    //   renderer.render(scene, camera)
    // })

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    this.$refs.container.appendChild(renderer.domElement)
    renderer.render(scene, camera)
    
    const obj = {
      isRotate: true
    }
    // gui.add(obj, 'isRotate').name('是否旋转').onChange(val => {
    //   obj.isRotate = val
    // })
    group03.add(obj, 'isRotate').name('是否旋转').onChange(val => {
      obj.isRotate = val
    })
    // 渲染循环
    const animate = () => {
      if (obj.isRotate) {
        // mesh.rotateZ(0.01)
        // mesh.rotateY(0.01)
        // mesh.rotateX(0.01)
      }
      
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    // 启动渲染循环
    animate()
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    })
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style>
.container {
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
</style>