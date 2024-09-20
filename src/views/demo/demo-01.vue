<template>
  <div class="container" ref="container"></div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  mounted() {
    // 创建一个场景
    const scene = new THREE.Scene();
    const width = this.$refs.container.clientWidth;
    const height = this.$refs.container.clientHeight;

    // 创建一个相机
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 200, 400)

    //添加辅助线
    const axesHelper = new THREE.AxesHelper(240)
    scene.add(axesHelper)

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    this.$refs.container.appendChild(renderer.domElement)

    // 相机控件器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', () => {
      renderer.render(scene, camera)
    })

    // 添加光源
    const pointLight = new THREE.PointLight(0xffffff, 1.0)
    pointLight.position.set(0, 200, 200)
    scene.add(pointLight)

    // 光源辅助线
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
    scene.add(pointLightHelper)

    // 创建地面
    const groundGeometry = new THREE.PlaneGeometry(600, 400)  // 创建一个平面
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080, // 灰色
      roughness: 0.8, // 较高的粗糙度，模拟混凝土效果
     }) // 创建一个材质, 颜色为绿色, 渲染面为双面
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2  // 平面默认是垂直的, 这里旋转-90度, 使平面垂直于地面
    scene.add(ground)

    // 创建建筑物
    const geometry01 = new THREE.BoxGeometry(50, 100, 50)  // 创建一个立方体
    const material01 = new THREE.MeshStandardMaterial({ 
      color: 0x2a5d78, // 蓝绿色，模拟玻璃幕墙
      roughness: 0.3, // 较低的粗糙度，模拟光滑表面
      metalness: 0.5, // 金属感，增加光泽度
     }) // 材质
    const building01 = new THREE.Mesh(geometry01, material01)
    building01.position.set(-200, 50, 100)
    scene.add(building01)

    // 创建建筑物
    const geometry02 = new THREE.BoxGeometry(50, 100, 50)  // 创建一个立方体
    const material02 = new THREE.MeshStandardMaterial({ 
      color: 0x2a5d78, // 蓝绿色，模拟玻璃幕墙
      roughness: 0.3, // 较低的粗糙度，模拟光滑表面
      metalness: 0.5, // 金属感，增加光泽度
     }) // 材质
    const building02 = new THREE.Mesh(geometry02, material02)
    building02.position.set(-200, 50, -100)
    scene.add(building02)
    
    // 创建建筑物
    const geometry03 = new THREE.BoxGeometry(50, 100, 50)  // 创建一个立方体
    const material03 = new THREE.MeshStandardMaterial({ 
      color: 0x2a5d78, // 蓝绿色，模拟玻璃幕墙
      roughness: 0.3, // 较低的粗糙度，模拟光滑表面
      metalness: 0.5, // 金属感，增加光泽度
     }) // 材质
    const building03 = new THREE.Mesh(geometry03, material03)
    building03.position.set(0, 50, -100)
    scene.add(building03)

    // 创建建筑物
    const geometry04 = new THREE.BoxGeometry(50, 100, 50)  // 创建一个立方体
    const material04 = new THREE.MeshStandardMaterial({ 
      color: 0x2a5d78, // 蓝绿色，模拟玻璃幕墙
      roughness: 0.3, // 较低的粗糙度，模拟光滑表面
      metalness: 0.5, // 金属感，增加光泽度
     }) // 材质
    const building04 = new THREE.Mesh(geometry04, material04)
    building04.position.set(200, 50, -100)
    scene.add(building04)

    // 创建建筑物
    const geometry05 = new THREE.BoxGeometry(50, 100, 50)  // 创建一个立方体
    const material05 = new THREE.MeshStandardMaterial({ 
      color: 0x2a5d78, // 蓝绿色，模拟玻璃幕墙
      roughness: 0.3, // 较低的粗糙度，模拟光滑表面
      metalness: 0.5, // 金属感，增加光泽度
     }) // 材质
    const building05 = new THREE.Mesh(geometry05, material05)
    building05.position.set(200, 50, 100)
    scene.add(building05)

    // 创建道路
    const roadGeometry01 = new THREE.PlaneGeometry(400,20)
    const roadMaterial01 = new THREE.MeshStandardMaterial({ 
      color: 0x333333, // 深灰色，模拟沥青道路
      roughness: 0.7, // 较高的粗糙度，模拟道路纹理
     })
    const road01 = new THREE.Mesh(roadGeometry01, roadMaterial01)
    road01.rotation.x = -Math.PI / 2
    road01.position.set(0, 1, 100)
    scene.add(road01)

    // 创建道路
    const roadGeometry02 = new THREE.PlaneGeometry(20,200)
    const roadMaterial02 = new THREE.MeshBasicMaterial({ 
      color: 0x333333, // 深灰色，模拟沥青道路
      roughness: 0.7, // 较高的粗糙度，模拟道路纹理
     })
    const road02 = new THREE.Mesh(roadGeometry02, roadMaterial02)
    road02.rotation.x = -Math.PI / 2
    road02.position.set(-100, 1, 0)
    scene.add(road02)

    // 创建道路
    const roadGeometry03 = new THREE.PlaneGeometry(20,200)
    const roadMaterial03 = new THREE.MeshBasicMaterial({ 
      color: 0x333333, // 深灰色，模拟沥青道路
      roughness: 0.7, // 较高的粗糙度，模拟道路纹理
     })
    const road03 = new THREE.Mesh(roadGeometry03, roadMaterial03)
    road03.rotation.x = -Math.PI / 2
    road03.position.set(100, 1, 0)
    scene.add(road03)

    // 创建道路
    const roadGeometry04 = new THREE.PlaneGeometry(400,20)
    const roadMaterial04 = new THREE.MeshBasicMaterial({ 
      color: 0x333333, // 深灰色，模拟沥青道路
      roughness: 0.7, // 较高的粗糙度，模拟道路纹理
     })
    const road04 = new THREE.Mesh(roadGeometry04, roadMaterial04)
    road04.rotation.x = -Math.PI / 2
    road04.position.set(0, 1, -100)
    scene.add(road04)

    // 渲染循环
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate(); // 启动动画
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