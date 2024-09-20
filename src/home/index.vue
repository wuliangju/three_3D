<template>
  <div>
    <a-layout>
      <a-layout-sider style="background: #fff;" width="300px">
        <a-menu
          style="width: 100%"
          :default-selected-keys="['/example1']"
          :open-keys.sync="openKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-sub-menu style="text-align: left;" v-for="item in menuList" :key="item.key" :title="item.title">
            <a-menu-item 
              v-for="ite in item.children" 
              :key="ite.key" 
              :to="ite.path"
            >
              {{ ite.title }}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="height: 100vh">
        <a-layout-content style="padding: 20px;">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  mounted() {
    
  },
  data() {
    return {
      openKeys: ['/example'],
      menuList: [
        {
          title: '入门',
          key: 'ru-men',
          children: [
            {
              title: '创建3D场景',
              key: '/rumen1',
              path: '/rumen1', // 路由路径
            },
            {
              title: '动画效果',
              key: '/rumen2',
              path: '/rumen2', // 路由路径
            },
            {
              title: '阵列模型',
              key: '/rumen3',
              path: '/rumen3',
            },
            {
              title: '常用模型',
              key: '/rumen4',
              path: '/rumen4',
            }
          ],
        },
        {
          title: '示例',
          key: '/example',
          path: '/example',
          children: [
            {
              title: '示例1',
              key: '/example1',
              path: '/example1',
            },
            {
              title: 'guijs',
              key: '/example2',
              path: '/example2',
            },
          ],
        }
        // 你可以继续添加更多的菜单项
      ],
    };
  },
  methods: {
    handleClick(e) {
      this.$router.push(e.key);  // 点击菜单项后，进行路由跳转
    },
  },
};
</script>
