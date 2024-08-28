<template>
  <div>
    <a-layout>
      <a-layout-sider style="background: #fff;" width="300px">
        <a-menu
          style="width: 100%"
          :default-selected-keys="['/rumen']"
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
  data() {
    return {
      openKeys: ['ru-men'],
      menuList: [
        {
          title: '入门',
          key: 'ru-men',
          children: [
            {
              title: '创建3D场景',
              key: '/rumen',
              path: '/rumen', // 路由路径
            },
            {
              title: '其他内容',
              key: '/rumen1',
              path: '/rumen/rumen1', // 路由路径
            },
          ],
        },
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
