<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import HeaderLayout from './HeaderLayout.vue'

  const router = useRouter()

  const menuItems = [
    {
      title: 'Navigator One',
      icon: 'message',
      subItems: [
        { label: 'Option 1', route: 'hello', icon: 'User' },
        { label: 'Option 2', route: 'dashboard', icon: 'User' }
      ]
    },
    {
      title: 'Navigator Three',
      icon: 'setting',
      subItems: [
        { label: 'Option 1', route: 'hello', icon: 'User' },
        { label: 'Option 2', route: 'dashboard', icon: 'User' },
        { label: 'Option 3', route: 'hello', icon: 'User' }
      ]
    },
    {
      title: 'Documentation',
      icon: 'Cloudy',
      route: 'documentation'
    },
    {
      title: 'Settings',
      icon: 'Collection',
      route: 'settings'
    },
    {
      title: 'Settings',
      icon: 'Collection',
      route: 'settings'
    },
    {
      title: 'Help',
      icon: 'help',
      subItems: [
        { label: 'FAQ', route: 'faq', icon: 'help' },
        { label: 'Contact Support', route: 'support', icon: 'Cloudy' }
      ]
    }
  ]
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderLayout />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-scrollbar>
            <el-menu :default-openeds="['0']">
              <template v-for="(menu, index) in menuItems" :key="index">
                <el-sub-menu v-if="menu.subItems" :index="index.toString()">
                  <template #title>
                    <el-icon><component :is="menu.icon" /></el-icon
                    >{{ menu.title }}
                  </template>
                  <el-menu-item-group>
                    <template
                      v-for="(item, subIndex) in menu.subItems"
                      :key="subIndex"
                    >
                      <el-menu-item
                        :index="`${index}-${subIndex}`"
                        @click="() => router.replace({ name: item.route })"
                      >
                        <el-icon
                          ><component :is="menu.subItems[subIndex].icon"
                        /></el-icon>
                        {{ item.label }}
                      </el-menu-item>
                    </template>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-menu-item
                  v-else
                  :index="index.toString()"
                  @click="() => router.replace({ name: menu.route })"
                >
                  <el-icon><component :is="menu.icon" /></el-icon
                  >{{ menu.title }}
                </el-menu-item>
              </template>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
  .el-menu-item.is-active {
    background-color: #f4f6f9;
  }
  .el-sub-menu.is-opened {
    background-color: #b3b5b9;
  }
</style>
