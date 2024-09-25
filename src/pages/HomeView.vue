<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()
</script>

<template>
  <el-button @click="router.replace({ name: 'dashboard' })"
    >Iot - platform</el-button
  >
</template>
