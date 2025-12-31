import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/type/type'
import { createUser, updateUser, deleteUser, getUserList } from '@/api/api'
import { validateForm, type ValidationError } from '@/utils/validate'

export type DialogType = 'add' | 'update' | 'delete' | null

export const useAppStore = defineStore('app', () => {
  // 狀態
  const formData = ref({
    name: '',
    age: '',
  })

  const tableData = ref<User[]>([])
  const editingIndex = ref<number | null>(null)
  const dialogType = ref<DialogType>(null)
  const validationErrors = ref<ValidationError[]>([])
  const loading = ref(false)

  // 重置表單
  const resetForm = () => {
    formData.value = {
      name: '',
      age: '',
    }
    validationErrors.value = []
    editingIndex.value = null
  }

  // 驗證表單
  const validateFormData = (): boolean => {
    const errors = validateForm(formData.value.name, formData.value.age)
    validationErrors.value = errors
    return errors.length === 0
  }

  // 新增
  const addPerson = async (): Promise<boolean> => {
    if (!validateFormData()) {
      return false
    }

    try {
      loading.value = true

      const newPerson: User = {
        name: formData.value.name,
        age: parseInt(formData.value.age),
        id: tableData.value.length + 1,
      }

      await createUser(newPerson)
      await getUserList()

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

  // 編輯（加載數據到表單）
  const editPerson = (index: number): boolean => {
    const person = tableData.value[index]
    if (!person) {
      return false
    }

    editingIndex.value = index
    formData.value = {
      name: person.name,
      age: person.age.toString(),
    }
    validationErrors.value = []
    return true
  }

  // 更新（保存編輯結果）
  const updatePerson = async (): Promise<boolean> => {
    if (!validateFormData()) {
      return false
    }

    try {
      loading.value = true

      if (editingIndex.value === null) {
        return false
      }

      const person = tableData.value[editingIndex.value]
      if (!person) {
        return false
      }

      const updatedPerson: User = {
        ...person,
        name: formData.value.name,
        age: parseInt(formData.value.age),
      }

      // 調用 API
      // await updateUser(person.id, updatedPerson)

      tableData.value[editingIndex.value] = updatedPerson
      resetForm()
      dialogType.value = null
      return true
    } catch (error) {
      console.error('更新失敗:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  // 刪除
  const deletePerson = async (index: number): Promise<boolean> => {
    try {
      loading.value = true

      const person = tableData.value[index]
      if (!person) {
        return false
      }

      // 調用 API
      // await deleteUser(person.id)

      tableData.value.splice(index, 1)
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
      console.log(data)

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
    editingIndex,
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
