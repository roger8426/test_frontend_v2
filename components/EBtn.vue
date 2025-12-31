<template>
  <button :class="['e-btn', `e-btn-${color}`]">
    {{ text || '' }}
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn' // 預設為 success
}

const props = withDefaults(defineProps<Props>(), {
  color: 'success'
})
</script>

<style scoped lang="scss">
.e-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: none;

  &-success {
    background-color: #4caf50;
    color: #fff;

    &:hover {
      background-color: #45a049;
      opacity: 0.9;
    }
  }

  &-error {
    background-color: #f44336;
    color: #fff;

    &:hover {
      background-color: #da190b;
      opacity: 0.9;
    }
  }

  &-warn {
    background-color: #ffc107;
    color: #333;

    &:hover {
      background-color: #e0a800;
      opacity: 0.9;
    }
  }
}
</style>
