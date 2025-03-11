<template>
  <div class="main">
    <div class="container" ref="container"></div>
    <div class="btn-group">
      <div class="btn" @click="change(1)">整体</div>
      <div class="btn" @click="change(2)">仓库</div>
      <div class="btn" @click="change(3)">停车场</div>
      <div class="btn" @click="change(4)">设备A</div>
      <div class="btn" @click="change(5)">设备B</div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GUI } from   'three/examples/jsm/libs/lil-gui.module.min.js'
import TWEEN, { Group } from '@tweenjs/tween.js'

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      overall: null,
      warehouse: null,
      parking: null,
      deviceA: null,
      deviceB: null,
      tweenGroup: new Group(),
      gui: null, // GUI 实例
      cameraSettings: {
        x: -100,
        y: 100,
        z: 100,
        lookAtX: 0,
        lookAtY: 0,
        lookAtZ: 0
      }
    }
  },
  mounted() {
    this.initThree()
    this.initGUI() // 初始化 GUI
    window.addEventListener('resize', this.onWindowResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {
    initThree() {
      const gui = new GUI()
      const container = this.$refs.container
      const width = container.clientWidth
      const height = container.clientHeight

      // 创建场景
      this.scene = new THREE.Scene()

      // 设置相机
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      this.camera.position.set(-100, 100, 100)
      this.camera.lookAt(0, 0, 0)
      this.scene.add(this.camera)

      // 添加环境贴图
      const textureCube = new THREE.CubeTextureLoader().load([
        new URL('../../assets/环境贴图/环境贴图3/px.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图3/nx.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图3/py.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图3/ny.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图3/pz.jpg', import.meta.url).href,
        new URL('../../assets/环境贴图/环境贴图3/nz.jpg', import.meta.url).href,
      ])
      // this.scene.enviroment = textureCube
      // 直接把环境贴图添加到场景中，这样所有物体都会使用这个环境贴图
      this.scene.background = textureCube

      // 加载 GLTF 模型
      const loader = new GLTFLoader()
      loader.load(new URL('../../assets/学校.glb', import.meta.url).href, (gltf) => {
        //  修改模型颜色
        gltf.scene.traverse(obj => {
          if (obj.isMesh) {
            // obj.material = new THREE.MeshBasicMaterial({
            //   color: 0xffffff,
            //   transparent: true,
            //   opacity: 0.5
            // })
            // obj.material.envMap = textureCube  // 设置环境贴图
          }
        })
        this.warehouse = gltf.scene.getObjectByName('仓库')
        this.parking = gltf.scene.getObjectByName('大货车1')
        const storageTank = gltf.scene.getObjectByName('存储罐')
        console.log(storageTank)
        if (storageTank) {
          this.deviceA = storageTank.children.find(ele => ele.name === '设备A')
          this.deviceB = storageTank.children.find(ele => ele.name === '设备B')
        }
        console.log(this.warehouse, this.parking, this.deviceA, this.deviceB)

        this.scene.add(gltf.scene)
      })

      // 添加坐标辅助线
      const axesHelper = new THREE.AxesHelper(100)
      this.scene.add(axesHelper)

      // 添加光源
      // const pointLight = new THREE.PointLight(0xffffff)
      // pointLight.position.set(0, 200, 300)
      // this.scene.add(pointLight)
      // 环境光
      const AmbientLight = new THREE.AmbientLight(0xffffff, 2)
      this.scene.add(AmbientLight)

      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(width, height)
      this.renderer.outputEncoding = THREE.sRGBEncoding // 输出编码
      container.appendChild(this.renderer.domElement)

      // 添加轨道控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true // 使控制器带阻尼

      // 开始动画循环
      this.animate()
    },
    initGUI() {
      this.gui = new GUI()
      
      // 相机位置
      const cameraFolder = this.gui.addFolder('Camera Position')
      cameraFolder.add(this.cameraSettings, 'x', -500, 500).onChange(value => {
        this.camera.position.x = value
      })
      cameraFolder.add(this.cameraSettings, 'y', -500, 500).onChange(value => {
        this.camera.position.y = value
      })
      cameraFolder.add(this.cameraSettings, 'z', -500, 500).onChange(value => {
        this.camera.position.z = value
      })
      
      // 相机 LookAt 目标
      const lookAtFolder = this.gui.addFolder('Camera LookAt')
      lookAtFolder.add(this.cameraSettings, 'lookAtX', -500, 500).onChange(value => {
        this.camera.lookAt(new THREE.Vector3(value, this.cameraSettings.lookAtY, this.cameraSettings.lookAtZ))
      })
      lookAtFolder.add(this.cameraSettings, 'lookAtY', -500, 500).onChange(value => {
        this.camera.lookAt(new THREE.Vector3(this.cameraSettings.lookAtX, value, this.cameraSettings.lookAtZ))
      })
      lookAtFolder.add(this.cameraSettings, 'lookAtZ', -500, 500).onChange(value => {
        this.camera.lookAt(new THREE.Vector3(this.cameraSettings.lookAtX, this.cameraSettings.lookAtY, value))
      })

      cameraFolder.open()
      lookAtFolder.open()
    },
    animate(time) {
      requestAnimationFrame(this.animate)
      this.tweenGroup.update(time)
      this.controls.update() // 更新控制器
      this.renderer.render(this.scene, this.camera)
      // 实时输出相机位置
      // console.log("Position:", this.camera.position)
    },
    onWindowResize() {
      const container = this.$refs.container
      const width = container.clientWidth
      const height = container.clientHeight

      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
    },
    change(key) {
      let targetObj = null
      const pos = new THREE.Vector3()
      if (key === 1) {
        this.createCameraTween(new THREE.Vector3(-100, 100, 100), new THREE.Vector3(0, 0, 0))
        return
      } else if (key === 2) {
        this.createCameraTween(new THREE.Vector3(-50, 15, 10), pos)
        return
        // targetObj = this.warehouse
      } else if (key === 3) {
        targetObj = this.parking
      } else if (key === 4) {
        targetObj = this.deviceA
      } else if (key === 5) {
        targetObj = this.deviceB
      }
      if (!targetObj) return
      this.$nextTick(() => {
        const pos = new THREE.Vector3()
        targetObj.getWorldPosition(pos)
        const pos2 = pos.clone().add(new THREE.Vector3(30, 30, 30))
        console.log(pos, pos2)
        this.createCameraTween(pos2, pos)
      })
      
      
    },
    createCameraTween(entPos, endTarget) {
      new TWEEN.Tween({
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z,
        tx: this.controls.target.x,
        ty: this.controls.target.y,
        tz: this.controls.target.z
      }, this.tweenGroup).to({
        x: entPos.x,
        y: entPos.y,
        z: entPos.z,
        tx: endTarget.x,
        ty: endTarget.y,
        tz: endTarget.z
      }, 1000).onUpdate(obj => {
        this.camera.position.set(obj.x, obj.y, obj.z)
        this.controls.target.set(obj.tx, obj.ty, obj.tz)
        this.controls.update()
      }).start()
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
  width: 400px;
  align-items: center;
  justify-content: space-between;
}
.btn {
  width: 60px;
  height: 30px;
  border: 1px solid #fff;
  border-radius: 2px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  color: #fff;
} 
.container {
  width: 100%;
  height: 100vh;
}
</style>