<script lang="ts" setup>
  import { useAuthStore } from '@/stores/auth'
  import { computed, reactive, ref } from 'vue'
  const auth = useAuthStore()

  const projects = computed(() =>
    auth.user.data.project.map(
      (item: { name: string; description: string }) => {
        return {
          name: item.name,
          description: item.description
        }
      }
    )
  )

  const openSetting = ref(false)

  const form = reactive({
    name: '',
    description: ''
  })
</script>

<template>
  <el-space wrap size="large">
    <el-card
      v-for="(item, index) in projects"
      :key="index"
      class="box-card"
      style="width: 250px; height: 200px"
    >
      <template #header>
        <div class="card-header" @click="() => console.log('eeds')">
          <span>{{ item.name }}</span>
          <el-icon style="cursor: pointer" @click.stop="openSetting = true"
            ><Setting
          /></el-icon>
        </div>
      </template>
      <div class="text item">
        {{ item.description }}
      </div>
    </el-card>
  </el-space>

  <el-dialog
    v-model="openSetting"
    title="Sửa thông tin Project"
    width="500"
    destroy-on-close
    center
  >
    <el-form> </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="openSetting = false">Cancel</el-button>
        <el-button type="primary" @click="openSetting = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .box-card {
    width: 250px;
    height: 200px;

    .card-header {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
