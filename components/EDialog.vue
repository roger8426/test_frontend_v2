<template>
  <dialog v-if="isOpen" class="e-dialog" @click="handleBackdropClick">
    <div class="e-dialog-content" @click.stop>
      <div class="e-dialog-header">
        <h3>{{ title }}</h3>
        <button type="button" class="e-dialog-close" @click="handleCancel">&times;</button>
      </div>
      <div class="e-dialog-body">
        <slot></slot>
      </div>
      <div class="e-dialog-footer">
        <slot name="footer">
          <EBtn color="warn" @click="handleCancel">{{ cancelText }}</EBtn>
          <EBtn color="success" @click="handleConfirm">{{ confirmText }}</EBtn>
        </slot>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EBtn from './EBtn.vue'

interface Props {
  isOpen: boolean
  title?: string
  confirmText?: string
  cancelText?: string
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  confirmText: 'OK',
  cancelText: 'Cancel',
  closeOnBackdrop: true
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    handleCancel()
  }
}
</script>

<style scoped lang="scss">
.e-dialog {
  all: revert;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  padding: 0;
  z-index: 1000;

  &::backdrop {
    background-color: transparent;
  }
}

.e-dialog-content {
  background-color: #444;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  min-width: 320px;
  max-width: 500px;
  width: 90%;
  padding: 0;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.e-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #666;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
}

.e-dialog-close {
  background: none;
  border: none;
  color: #ccc;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }
}

.e-dialog-body {
  padding: 20px;
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
}

.e-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #666;
}

/* RWD */
@media (max-width: 768px) {
  .e-dialog-content {
    max-width: 100%;
    width: calc(100% - 40px);
  }
}

@media (max-width: 480px) {
  .e-dialog-content {
    width: calc(100% - 20px);
  }

  .e-dialog-header,
  .e-dialog-body,
  .e-dialog-footer {
    padding: 15px;
  }

  .e-dialog-header {
    h3 {
      font-size: 16px;
    }
  }
}
</style>
