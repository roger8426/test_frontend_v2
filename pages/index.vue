<template>
  <div class="dashboard">
    <!-- 操作表單區 -->
    <div class="form-section">
      <h2>{{ t('operation') }}</h2>

      <form class="form-content" @submit.prevent>
        <div class="form-group">
          <label for="name">{{ t('name') }}</label>
          <ETextField v-model:value="store.formData.name" />
          <span v-if="getFieldError('name')" class="error-text">
            {{ getFieldError('name') }}
          </span>
        </div>
        <div class="form-group">
          <label for="age">{{ t('age') }}</label>
          <ETextField v-model:value="store.formData.age" type="number" />
          <span v-if="getFieldError('age')" class="error-text">
            {{ getFieldError('age') }}
          </span>
        </div>
        <div class="form-actions">
          <div>
            <EBtn @click="handleSwitchLanguage">{{ t('switchLanguage') }}</EBtn>
          </div>
          <div class="action">
            <template v-if="store.editingUserId">
              <EBtn color="success" @click="openDialog('update')">{{ t('save') }}</EBtn>
              <EBtn color="warn" @click="handleCancel">{{ t('cancel') }}</EBtn>
            </template>
            <template v-else>
              <EBtn color="warn" @click="openDialog('add')">{{ t('add') }}</EBtn>
            </template>
          </div>
        </div>
      </form>
    </div>

    <!-- 列表區 -->
    <div class="list-section">
      <template v-if="store.tableData.length">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{{ t('name') }}</th>
                <th>{{ t('age') }}</th>
                <th>{{ t('operation') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in store.tableData" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.age }}</td>
                <td class="action-cell">
                  <EBtn color="success" @click="handleEditRow(item.id as number)">{{
                    t('edit')
                  }}</EBtn>
                  <EBtn color="error" @click="openDialog('delete', item.id)">{{
                    t('delete')
                  }}</EBtn>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template v-else>
        <p class="no-data">{{ t('noData') }}</p>
      </template>
    </div>

    <!-- 確認對話框 -->
    <EDialog
      :is-open="store.dialogType !== null"
      :title="getDialogTitle"
      :confirm-text="t('save')"
      :cancel-text="t('cancel')"
      @confirm="handleDialogConfirm"
      @cancel="handleDialogCancel"
    >
      {{ getDialogMessage }}
    </EDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore, type DialogType } from '~/store/app'
import type { ValidationError } from '~/utils/validate'
import EBtn from '~/components/EBtn.vue'
import ETextField from '~/components/ETextField.vue'
import EDialog from '~/components/EDialog.vue'

const { t, locale } = useI18n()
const store = useAppStore()
const deleteUserId = ref<number | null>(null)

// 初始化數據
useAsyncData('tableData', async () => {
  await store.getDataList()
  return true
})

// 獲取字段錯誤信息
const getFieldError = (fieldName: string): string | null => {
  const error = store.validationErrors.find((e: ValidationError) => e.field === fieldName)
  return error?.message ?? null
}

// 獲取 Dialog 標題
const getDialogTitle = computed((): string => {
  if (!store.dialogType) return ''
  const typeMap: Record<string, string> = {
    add: t('confirmAdd'),
    update: t('confirmUpdate'),
    delete: t('confirmDelete'),
  }
  return typeMap[store.dialogType] || ''
})

// 獲取 Dialog 消息
const getDialogMessage = computed((): string => {
  if (!store.dialogType) return ''
  const messageMap: Record<string, string> = {
    add: t('addWarning'),
    update: t('updateWarning'),
    delete: t('deleteWarning'),
  }
  return messageMap[store.dialogType] || ''
})

// 打開 Dialog
const openDialog = (type: DialogType, userId?: number) => {
  store.dialogType = type

  if (userId) {
    deleteUserId.value = userId
  }
}

// Dialog 確認
const handleDialogConfirm = async () => {
  if (store.dialogType === 'add') {
    await store.addPerson()
  } else if (store.dialogType === 'update') {
    await store.updatePerson()
  } else if (store.dialogType === 'delete' && deleteUserId.value) {
    await store.deletePerson(deleteUserId.value)
    deleteUserId.value = null
  }
}

// Dialog 取消
const handleDialogCancel = () => {
  store.dialogType = null
  deleteUserId.value = null
}

const handleEditRow = (id: number) => {
  store.editPerson(id)
}

const handleCancel = () => {
  store.resetForm()
}

const handleSwitchLanguage = () => {
  locale.value = locale.value === 'zh-TW' ? 'en-US' : 'zh-TW'
}
</script>

<style scoped lang="scss">
.dashboard {
  background-color: #333;
  color: #fff;
  min-height: 100vh;
  padding: 20px;
}

.form-section {
  border: 1px solid #999;
  border-radius: 20px;
  margin: 0 auto 40px;
  padding: 30px;
  width: 80%;
  max-width: 800px;

  h2 {
    text-align: center;
    margin: 0 0 20px 0;
    font-size: 24px;
  }
}

.message {
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 14px;

  &.success {
    background-color: #4caf50;
    color: #fff;
  }

  &.error {
    background-color: #f44336;
    color: #fff;
  }
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 500;
  }
}

.error-text {
  color: #ff6b6b;
  font-size: 12px;
  margin-top: -5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  flex-wrap: wrap;
  gap: 10px;

  & .action {
    display: flex;
    gap: 10px;
  }
}

.list-section {
  border: 1px solid #999;
  border-radius: 20px;
  margin: 0 auto;
  padding: 30px;
  width: 80%;
  max-width: 800px;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  thead {
    tr {
      border-bottom: 1px solid #666;
    }

    th {
      padding: 15px 10px;
      text-align: center;
      font-weight: 600;
      font-size: 13px;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #555;

      td {
        padding: 12px 8px;
        text-align: center;
        font-size: 13px;
      }
    }
  }
}

.action-cell {
  display: flex;
  justify-content: center;
  gap: 8px;
}

@media (max-width: 480px) {
  .action-cell {
    flex-direction: column;
  }
}

.no-data {
  text-align: center;
  padding: 30px 20px;
  color: #ccc;
  font-size: 14px;
}
</style>
