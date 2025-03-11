<template>
  <div class="main">
    <div class="container" ref="container"></div>
    <div class="btn-group">
      <div class="btn btn-red" @click="changeColor(1)">红</div>
      <div class="btn btn-yellow" @click="changeColor(2)">黄</div>
      <div class="btn btn-blue" @click="changeColor(3)">蓝</div>
    </div>
  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GUI } from   'three/examples/jsm/libs/lil-gui.module.min.js'
export default {
  data() {
    return {
      scene: null,
      camera: null,
      controls: null,
      renderer: null,
      model: null,
      shellArr: [],
    }
  },
  mounted() {
    this.initThree()
    this.animate()
  },
  methods: {
    initThree() {
      const that = this
      this.scene = new THREE.Scene()
      const gui = new GUI()
      const loader = new GLTFLoader()

      const width = this.$refs.container.clientWidth
      const height = this.$refs.container.clientHeight
      
      const textureCube = new THREE.CubeTextureLoader().load([
        new URL('../../assets/环境贴图/环境贴图1/px.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图1/nx.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图1/py.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图1/ny.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图1/pz.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图1/nz.jpg', import.meta.url).href,
      ])
      textureCube.encoding = THREE.sRGBEncoding
      const materialFolder = gui.addFolder('车模型外壳材质')

      loader.load(new URL('../../assets/轿车.glb', import.meta.url).href, gltf => {
        this.scene.add(gltf.scene)
        this.shellArr = []
        const shellList = ['外壳01', '外壳02', '外壳03', '外壳04', '外壳05', '外壳06']
        this.shellArr = shellList.map(item => {
          const shell = gltf.scene.getObjectByName(item)
          console.log('shellshellshell', shell)
          if (shell) {
            shell.material = new THREE.MeshPhysicalMaterial({
              color: shell.material.color,
              metalness: 0.9,
              roughness: 0.5,
              envMap: textureCube,
              evnMapIntensity: 2.0
            })
            return shell
          }
        })
        console.log('shellArr', this.shellArr)
        // 车模型外壳材质
        
        if (this.shellArr.length > 0) {
          const firstShell = this.shellArr[0];
          materialFolder.addColor(firstShell.material, 'color');
          materialFolder.add(firstShell.material, 'metalness').min(0).max(1).step(0.01);
          materialFolder.add(firstShell.material, 'roughness').min(0).max(1).step(0.01);
          materialFolder.add(firstShell.material, 'envMapIntensity').min(0).max(10).step(0.01);
        }
      })

      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
      this.camera.position.set(-200, 400, 400)
      this.scene.add(this.camera)

      // 平行光
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(200, 200, -200)
      this.scene.add(directionalLight)
      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 1)
      this.scene.add(ambientLight)

      const axesHelper = new THREE.AxesHelper(300)
      this.scene.add(axesHelper)

      const ambientFolder = gui.addFolder('环境光')
      ambientFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.01)
      const directionalFolder = gui.addFolder('平行光')
      directionalFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.01)
      // 平行光的位置
      directionalFolder.add(directionalLight.position, 'x').min(-1000).max(1000).step(1)
      directionalFolder.add(directionalLight.position, 'y').min(-1000).max(1000).step(1)
      directionalFolder.add(directionalLight.position, 'z').min(-1000).max(1000).step(1)
      


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
    changeColor(key) {
      switch (key) {
        case 1:
          this.shellArr.forEach(item => {
            item.material.color.set(0xff0000)
          })
          break
        case 2:
          this.shellArr.forEach(item => {
            item.material.color.set(0xffff00)
          })
          break
        case 3:
          this.shellArr.forEach(item => {
            item.material.color.set(0x0000ff)
          })
          break
      }
    }
  }
}
</script>
<style scoped>
.main {
  width: 100%;
  height: 100vh;
  position: relative;
}
.btn-group {
  position: absolute;
  z-index: 999;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 200px;
  align-items: center;
  justify-content: space-between;
}
.btn {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  /* color: #fff; */
} 
.btn-red {
  background-color: #ff0000;
}
.btn-yellow {
  background-color: #ffff00;
}
.btn-blue {
  background-color: #0000ff;
  color: #fff;
}
.container {
  width: 100%;
  height: 100vh;
}
</style>