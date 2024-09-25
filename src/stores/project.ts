import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', () => {
  const projects: any = ref()
  const total: any = ref()

  const setProjects = (data: any) => {
    projects.value = data
  }

  const setTotal = (data: any) => {
    total.value = data
  }

  return { setProjects, projects, total, setTotal }
})
