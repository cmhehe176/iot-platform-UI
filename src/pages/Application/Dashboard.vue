<script lang="ts" setup>
  import { useAuthStore } from '@/stores/auth'

  const auth = useAuthStore()
</script>

<template>
  Dashboard
  {{ auth.user }}
</template>

<style lang="scss" scoped></style>
