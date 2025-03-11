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
            {
              title: '点模型',
              key: '/example3',
              path: '/example3',
            },
            {
              title: '线模型',
              key: '/example4',
              path: '/example4',
            },
            {
              title: '三角形（面）',
              key: '/example5',
              path: '/example5',
            },
            {
              title: '组对象', 
              key: '/example6',
              path: '/example6',
            },
            {
              title: '纹理贴图',
              key: '/example7',
              path: '/example7',
            },
            {
              title: '地板示例',
              key: '/example8',
              path: '/example8',
            },
            {
              title: 'UV贴图动画',
              key: '/example9',
              path: '/example9',
            },
            {
              title: '复习',
              key: '/example10',
              path: '/example10',
            }
          ],
        },
        {
          title: '模型',
          key: '/school',
          path: '/school',
          children: [
            {
              title: '工厂',
              key: '/school-01',
              path: '/school-01',
            },
            {
              title: '简易小区',
              key: '/school-02',
              path: '/school-02',
            },
            {
              title: '金属',
              key: '/school-03',
              path: '/school-03',
            },
            {
              title: '车模',
              key: '/school-04',
              path: '/school-04',
            },
            {
              title: '学校',
              key: '/school-05',
              path: '/school-05',
            },
          ]
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
