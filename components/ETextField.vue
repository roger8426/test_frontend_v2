<template>
  <div class="e-text-field">
    <label v-if="label" :for="computedId" class="e-label">{{ label }}</label>
    <input
      :id="computedId"
      :value="modelValue"
      :type="type"
      class="e-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { InputProps } from '~/type/type'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const generatedId = ref<string>('')

onMounted(() => {
  if (!props.id && !generatedId.value) {
    generatedId.value = `text-field-${Math.random().toString(36).substr(2, 9)}`
  }
})

const computedId = computed(() => {
  return props.id || generatedId.value || 'text-field-temp'
})
</script>

<style scoped lang="scss">
.e-text-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.e-label {
  font-size: 13px;
  font-weight: 500;
  color: #ccc;
}

.e-input {
  padding: 10px 12px;
  border: 1px solid #666;
  border-radius: 6px;
  background-color: #444;
  color: #fff;
  font-size: 14px;
  transition: all 0.3s ease;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #999;
    background-color: #4a4a4a;
  }

  /* 移除 number input 的箭頭 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
}
</style>
