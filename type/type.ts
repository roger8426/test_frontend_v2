export interface User {
  name: string
  age: number | string
  id?: number
}

export interface InputProps {
  id?: string
  label?: string
  modelValue?: string | number
  type?: string
}

export interface ButtonProps {
  text?: string
  color?: 'success' | 'error' | 'warn'
}
