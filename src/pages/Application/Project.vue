<script lang="ts" setup>
  import { Roles } from '@/common/const'
  import { useProject } from '@/composables/useProject'
  import { useUser } from '@/composables/useUser'
  import { useAuthStore } from '@/stores/auth'
  import { useProjectStore } from '@/stores/project'
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'
  import { computed, onMounted, reactive } from 'vue'

  const auth = useAuthStore()
  const {
    updateProject,
    getListpProjectByUser,
    createProject,
    getListpUserOfProject
  } = useProject()

  const { getListUser } = useUser()
  const projectStore = useProjectStore()
  const { projects } = storeToRefs(projectStore)
  const userStore = useUserStore()
  const { listUser } = storeToRefs(userStore)

  onMounted(() => {
    getListpProjectByUser()

    getListUser(Roles.USER)
  })

  const state = reactive({
    showForm: false,
    projectId: 0,
    action: ''
  })

  const form = reactive({
    name: '',
    description: '',
    userId: undefined
  })

  const clearForm = () => {
    state.showForm = false
    state.projectId = 0
    state.action = ''
    Object.assign(form, {
      name: '',
      description: '',
      userId: undefined
    })
  }

  const users = computed(() =>
    listUser.value.map((item: { id: number; email: string }) => {
      return {
        value: item.id,
        label: item.email
      }
    })
  )
</script>

<template>
  <button
    v-if="auth.isAdmin"
    type="button"
    @click="
      () => {
        state.showForm = true
        state.action = 'create'
      }
    "
  >
    add project
  </button>
  <el-space wrap size="large">
    <el-card
      v-for="(item, index) in projects"
      :key="index"
      class="card"
      style="width: 250px; height: 200px"
    >
      <template #header>
        <div class="header" @click="() => console.log('eeds')">
          <span>{{ item.project.name }}</span>
          <el-icon
            style="cursor: pointer"
            @click.stop="
              async () => {
                state.showForm = true
                state.projectId = index
                state.action = 'edit'
                form.name = item.project.name
                form.description = item.project.description
                const users = await getListpUserOfProject(item.project.id)
                form.userId = users.map((user: any) => user.id)
              }
            "
            ><Setting
          /></el-icon>
        </div>
      </template>
      <div class="description">
        {{ item.project.description }}
      </div>
    </el-card>
  </el-space>
  <el-dialog
    v-model="state.showForm"
    title="Project Detail "
    width="350"
    center
  >
    <span v-if="state.action === 'edit'">
      CreatedBy : {{ projects[state.projectId].createdBy.name }}
    </span>

    <el-form :model="form" @submit.prevent>
      <el-form-item label="Project Name:" label-position="top">
        <el-input v-if="auth.isAdmin" v-model="form.name" />
        <el-text v-else size="large">{{ form.name }}</el-text>
      </el-form-item>
      <el-form-item
        :label="auth.isAdmin ? `Add User in Project` : `User in Project`"
        label-position="top"
      >
        <el-select-v2
          v-model="form.userId"
          filterable
          :options="users"
          placeholder="Please select"
          multiple
          value-key="id"
          :disabled="!auth.isAdmin"
        >
          <template #label="{ label }">
            <span style="font-weight: bold">{{ label }}</span>
          </template>
        </el-select-v2>
      </el-form-item>

      <el-form-item label="Project Description" label-position="top">
        <el-input
          v-if="auth.isAdmin"
          v-model="form.description"
          type="textarea"
          :rows="5"
        />
        <el-text v-else size="large">{{ form.description }}</el-text>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer" v-if="auth.isAdmin">
        <el-button @click="clearForm">Cancel</el-button>
        <el-button
          type="primary"
          @click="
            (state.action === 'edit'
              ? updateProject({ ...form, id: state.projectId })
              : createProject(form)
            ).then(() => clearForm())
          "
        >
          Submit
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .card {
    width: 250px;
    height: 200px;

    .header {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
    }

    .description {
      white-space: pre-wrap;
    }
  }

  .el-form-item {
    margin-top: 15px;
  }
</style>
