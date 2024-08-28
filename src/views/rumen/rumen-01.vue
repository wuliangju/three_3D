<template>
  <div class="container">
    
  </div>
</template>
<script>
import * as THREE from 'three';
export default {
  mounted() {
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(100, 100, 100); 
    //创建一个材质对象Material
    const material = new THREE.MeshBasicMaterial({
        color: 0xff0000,//0xff0000设置材质颜色为红色
    });
    // 两个参数分别为几何体geometry、材质material
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(0,10,0);
    scene.add(mesh);
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
  height: 100%;
  background-color: #fff;
}
title {
  color: #000;
}
</style>