<script lang="ts" setup>
  import { useAuth } from '@/composables/useAuth'
  import { useAuthStore } from '@/stores/auth'

  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Button } from 'ant-design-vue'

  const auth = useAuthStore()
  const { LogOut } = useAuth()
  const router = useRouter()

  const collapsed = ref<boolean>(false)
  const selectedKeys = ref<string[]>(['0-0'])
  const openKeys = ref<string[]>(['0'])

  const menuItems = [
    {
      title: 'Management',
      icon: 'OfficeBuilding',
      subItems: [
        { label: 'Dashboard', route: 'dashboard', icon: 'Histogram' },
        { label: 'My Project', route: 'project', icon: 'SetUp' }
        // { label: 'Device', route: 'device', icon: 'Iphone' }
      ]
    },
    {
      title: 'Navigator',
      icon: 'setting',
      role: 'admin',
      subItems: [
        { label: 'Option 1', route: '', icon: 'User' },
        { label: 'Option 2', route: '', icon: 'User' },
        { label: 'Option 3', route: '', icon: 'User' }
      ]
    },
    {
      title: 'Documentation',
      icon: 'Cloudy',
      role: 'admin',
      route: 'project'
    },
    {
      title: 'Settings',
      icon: 'Collection',
      route: 'project'
    },
    {
      title: 'Settings',
      icon: 'Collection',
      route: 'project'
    },
    {
      title: 'Help',
      icon: 'help',
      subItems: [
        { label: 'FAQ', route: 'project', icon: 'help' },
        { label: 'Contact Support', route: 'project', icon: 'Cloudy' }
      ]
    }
  ]
</script>

<template>
  <a-layout class="container">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      style="background: #fff"
    >
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
      >
        <div
          v-for="(item, index) in auth.isAdmin
            ? menuItems
            : menuItems.filter((item) => item.role !== 'admin')"
        >
          <a-sub-menu v-if="item.subItems" :key="index.toString()">
            <template #title>
              <span>
                <el-icon style="margin-right: 5px">
                  <component :is="item.icon" />
                </el-icon>
                <span>{{ item.title }}</span>
              </span>
            </template>
            <a-menu-item
              v-for="(subItem, subIndex) in item.subItems"
              :key="`${index}-${subIndex}`"
              @click="() => router.replace({ name: subItem.route })"
            >
              {{ subItem.label }}
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item
            v-else
            :key="index.toString() || undefined"
            @click="() => router.replace({ name: item.route })"
          >
            <span>
              <el-icon style="margin-right: 5px"
                ><component :is="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
            </span>
          </a-menu-item>
        </div>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: bisque; padding: 0">
        {{ auth.user.profile.name }}
        <Button
          @click="
            () => {
              router.replace({ name: 'login' })
              LogOut()
            }
          "
        >
          Log out
        </Button>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <slot></slot>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Iot Platform ©2024 Created by ndmc
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .container {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100vw;
    min-height: 100vh;
  }

  .site-layout-background {
    background: #fff;
  }
</style>
