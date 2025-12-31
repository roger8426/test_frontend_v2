<template>
  <button :class="['e-btn', `e-btn-${color}`]" :disabled="disabled">
    {{ text || '' }}
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from '~/type/type'

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'success',
  disabled: false,
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

  @media (max-width: 480px) {
    padding: 6px 16px;
  }

  @media (max-width: 368px) {
    padding: 4px 8px;
  }

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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
