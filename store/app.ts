import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/type/type'
import { createUser, updateUser, deleteUser, getUserList } from '@/api/api'
import { validateForm, type ValidationError } from '@/utils/validate'

export type DialogType = 'add' | 'update' | 'delete' | null

export const useAppStore = defineStore('app', () => {
  // 表單輸入值
  const formData = ref<User>({
    name: '',
    age: '',
  })
  // 列表數據
  const tableData = ref<User[]>([])
  // 正在編輯的用戶 ID
  const editingUserId = ref<number | string>('')
  // 彈出框類型
  const dialogType = ref<DialogType>(null)
  // 驗證錯誤
  const validationErrors = ref<ValidationError[]>([])
  const loading = ref(false)

  // 重置表單
  const resetForm = () => {
    formData.value = {
      name: '',
      age: '',
    }
    validationErrors.value = []
    editingUserId.value = ''
  }

  // 驗證表單
  const validateFormData = (): boolean => {
    const errors = validateForm(formData.value.name, formData.value.age)
    validationErrors.value = errors
    return errors.length === 0
  }

  // 新增用戶
  const addPerson = async () => {
    if (!validateFormData()) {
      console.error('驗證未通過，無法新增')
      return
    }

    try {
      loading.value = true

      const newPerson: User = {
        name: formData.value.name,
        age: Number(formData.value.age),
      }

      // 調用 API - 實現後啟用
      await createUser(newPerson)
      await getDataList()

      resetForm()
      dialogType.value = null
      return true
    } catch (error) {
      console.error('新增失敗:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  // 編輯（加載用戶數據到表單）
  const editPerson = (userId: number) => {
    const user = tableData.value.find((u) => u.id === userId)

    if (!user) {
      console.error('用戶未找到，無法編輯')
      return
    }

    editingUserId.value = userId
    formData.value = {
      name: user.name,
      age: user.age,
    }
    validationErrors.value = []
  }

  // 更新（保存編輯結果）
  const updatePerson = async () => {
    if (!validateFormData()) {
      console.error('驗證未通過，無法更新')
      return false
    }

    try {
      loading.value = true

      if (!editingUserId.value) {
        console.error('無效的用戶 ID')
        return false
      }

      const updatedPerson: User = {
        id: Number(editingUserId.value),
        name: formData.value.name,
        age: Number(formData.value.age),
      }
      await updateUser(updatedPerson)
      await getDataList()

      resetForm()
      dialogType.value = null
    } catch (error) {
      console.error('更新失敗:', error)
    } finally {
      loading.value = false
    }
  }

  // 刪除
  const deletePerson = async (userId: number): Promise<boolean> => {
    try {
      loading.value = true

      await deleteUser(userId)
      await getDataList()

      resetForm()
      dialogType.value = null
      return true
    } catch (error) {
      console.error('刪除失敗:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  // 獲取用戶列表
  const getDataList = async () => {
    try {
      loading.value = true
      const data = await getUserList()

      tableData.value = data.data
    } catch (error) {
      console.error('獲取數據失敗:', error)
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    formData,
    tableData,
    editingUserId,
    dialogType,
    validationErrors,
    loading,
    getDataList,
    resetForm,
    validateFormData,
    addPerson,
    editPerson,
    updatePerson,
    deletePerson,
  }
})
