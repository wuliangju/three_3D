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
      controls: null,
      renderer: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.scene = new THREE.Scene()
      const width = this.$refs.container.clientWidth
      const height = this.$refs.container.clientHeight
      
      const textureCube = new THREE.CubeTextureLoader().load([
        new URL('../../assets/环境贴图/环境贴图0/px.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图0/nx.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图0/py.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图0/ny.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图0/pz.jpg',import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图0/nz.jpg',import.meta.url).href,
      ])
      const loader = new GLTFLoader()
      loader.load(new URL('../../assets/金属.glb', import.meta.url).href, gltf => {
        this.scene.add(gltf.scene)
        gltf.scene.traverse(child => {
          if (child.isMesh) {
            child.material.metalness = 1.0  // 金属 
            child.material.roughness = 0.35  // 粗糙度 值越小越粗糙
            child.material.envMap = textureCube // 环境贴图
            child.material.envMapIntensity = 1.0  // 环境贴图强度
          }
        })
      })

      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
      this.camera.position.set(100, 100, 100)
      this.scene.add(this.camera)

      // const AmbientLight = new THREE.AmbientLight(0xffffff)
      // this.scene.add(AmbientLight)
      // 平行光
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
      directionalLight.position.set(200, 200, 200)
      this.scene.add(directionalLight)

      const axesHelper = new THREE.AxesHelper(250)
      this.scene.add(axesHelper)

      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(width, height)
      this.renderer.outputEncoding = THREE.sRGBEncoding // 输出编码，修复模型贴图颜色问题
      this.$refs.container.appendChild(this.renderer.domElement)
      this.renderer.render(this.scene, this.camera)

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.animate()
    },
    animate() {
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
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