<template>
  <div class="container" ref="container"></div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
export default {
  data() {
    return {
      scene: null,
      camera: null,
      point: null,
      renderer: null,
      controls: null,
    }
  },
  mounted() {
    this.init()
    window.addEventListener('resize', this.onWindowResize)
  },
  methods: {
    init() {
      this.scene = new THREE.Scene()
      const width = this.$refs.container.clientWidth
      const height = this.$refs.container.clientHeight

      const loader = new GLTFLoader()
      loader.load(new URL('../../assets/简易小区.glb', import.meta.url).href, gltf => {
        this.scene.add(gltf.scene)
        const nameNode = gltf.scene.getObjectByName('1号楼')
        nameNode.material.color.set(0xff0000)
        // nameNode.traverse(child => {
        //   if (child.isMesh) {
        //     child.material.color.set(0xff0000)
        //   }
        // })
        console.log(nameNode)
      })
      // loader.load(new URL('../../assets/gc.gltf', import.meta.url).href, (gltf) => {
      //   this.scene.add(gltf.scene)
      // })

      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
      this.camera.position.set(200, 200, 200)
      this.scene.add(this.camera)

      // this.point = new THREE.PointLight(0xffffff, 1, 1000)
      // this.scene.add(this.point)
      const AmbientLight = new THREE.AmbientLight(0xffffff, 1)
      this.scene.add(AmbientLight)

      const axesHelper = new THREE.AxesHelper(250)
      this.scene.add(axesHelper)

      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(width, height)
      this.$refs.container.appendChild(this.renderer.domElement)

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.animate()
    },
    animate() {
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    },
    onWindowResize() {
      const container = this.$refs.container
      const width = container.clientWidth
      const height = container.clientHeight

      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
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