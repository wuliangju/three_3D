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
    const scene = new THREE.Scene()
    const width = this.$refs.container.clientWidth
    const height = this.$refs.container.clientHeight

    // 创建几何体
    const geometry = new THREE.BoxGeometry(100, 100, 100)
    const material = new THREE.MeshLambertMaterial({ color: 0x0000ff })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // 创建光源
    const pointLight = new THREE.pointLight(0xffffff, 1)
    pointLight.position.set(300, 300, 300)
    scene.add(pointLight)

    // 创建相机
    const camera = new THREE.Camera()
    camera.position.set(0, 0, 400)
    camera.lookAt(0, 0 , 0)
    const controls = new OrbitControls(camera, this.$refs.container)
    controls.addEventListener('change', () => {
      
    } )
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>