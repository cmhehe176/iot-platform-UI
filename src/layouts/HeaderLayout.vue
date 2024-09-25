<script lang="ts" setup>
  import { useAuth } from '@/composables/useAuth'
  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router'

  const auth = useAuthStore()
  const { LogOut } = useAuth()
  const router = useRouter()
</script>

<template>
  <div class="container">
    {{ auth.user.profile.name }}
    <button
      type="button"
      @click="
        () => {
          router.replace({ name: 'login' })
          LogOut()
        }
      "
    >
      Log out
    </button>
  </div>
</template>

<style lang="scss" scoped>
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 7vh;
    background-color: bisque;
  }
</style>
