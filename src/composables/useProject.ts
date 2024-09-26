import api from '@/common/api'
import { ElMessage } from 'element-plus'
import { useAuth } from './useAuth'
import { useProjectStore } from '@/stores/project'

interface iProject {
  userId?: number[]
  name?: string
  description?: string
}

export const useProject = () => {
  const projectStore = useProjectStore()

  const updateProject = async (projectId: number, data: iProject) => {
    try {
      const response = await api.put(`/project/${projectId}`, data)

      if (response) ElMessage.success('Update Project success !')

      return response
    } catch {
      ElMessage.error('Update Project failed !')
    }
  }

  const createProject = async (data: {
    name: string
    userId?: number
    description: string
  }) => {
    try {
      const response = await api.post('/project', data)

      if (response) ElMessage.success('Create Project success !')
      await getListpProjectByUser()

      return response
    } catch {
      ElMessage.error('Create Project failed !')
    }
  }

  const getListpProjectByUser = async () => {
    try {
      const response = await api.get('/project')

      if (response) {
        projectStore.setProjects(response.data.data)
        projectStore.setTotal(response.data.total)
        return response
      }
    } catch {
      ElMessage.error('Get Project failed !')
    }
  }

  const getListpUserOfProject = async (projectId: number) => {
    try {
      const response = await api.get(`/project/${projectId}`)

      if (response.data) {
        return response.data.data
      }
    } catch {
      ElMessage.error('Get User failed !')
    }
  }

  const deleteProject = async (id: number) => {
    try {
      const response = await api.delete(`/project/${id}`)

      if (response) ElMessage.success('Delete Project done')
      await getListpProjectByUser()
    } catch {
      ElMessage.error('Delete Project failed !')
    }
  }

  return {
    updateProject,
    getListpProjectByUser,
    createProject,
    getListpUserOfProject,
    deleteProject
  }
}
