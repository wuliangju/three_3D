<template>
  <div class="container" ref="container"></div>
</template>

<script>
import * as THREE from 'three';
// 引入相机控件
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  mounted() {
    const scene = new THREE.Scene()
    const width = this.$refs.container.clientWidth
    const height = this.$refs.container.clientHeight

    // 创建几何体
    const geometry = new THREE.BoxGeometry(100, 100, 100) // 创建几何体, 长宽高为100

    // 网格材质
    // const material = new THREE.MeshBasicMaterial({ 
    //   color: 0x00ffff,  // 颜色
    //   transparent: true, // 透明
    //   opacity: 0.5 // 透明度
    // })
    const material = new THREE.MeshLambertMaterial({ 
      color: 0x00ffff,  // 颜色
    })
    const mesh = new THREE.Mesh(geometry, material) // 创建网格模型
    scene.add(mesh)

    // 创建相机
    const camera = new THREE.PerspectiveCamera(100, width/height, 0.1, 2000)
    camera.position.set(100, 100, 100)
    camera.lookAt(0, 0, 0)

    // 三纬坐标轴
    const axesHelper = new THREE.AxesHelper( 100 )
    scene.add( axesHelper )

    // 创建光源
    const pointLight = new THREE.PointLight(0xffffff, 1.0)
    pointLight.position.set(100, 200, 100)
    scene.add(pointLight)

    // 可视化光源
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
    scene.add(pointLightHelper)

    // 环境光
    const ambient = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambient)

    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(200, 0, 100)
    scene.add(directionalLight)

    // 可视化平行光
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000)
    scene.add(directionalLightHelper)

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    this.$refs.container.appendChild(renderer.domElement)
    renderer.render(scene, camera)

    // 添加相机控件
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', () => { // 监听相机的移动
      renderer.render(scene, camera)
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


<style scoped>
.container {
  width: 100%;
  height: 100vh; /* 设置高度为视口高度 */
  background-color: #fff;
}
</style>
