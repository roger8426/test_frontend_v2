/**
 * 驗證工具函數
 */

export interface ValidationError {
  field: string
  message: string
}

/**
 * 驗證名字
 */
export const validateName = (name: string): string | null => {
  if (!name || name.trim() === '') {
    return 'Name is required'
  }
  if (name.length < 2) {
    return 'Name must be at least 2 characters'
  }
  if (name.length > 50) {
    return 'Name must be less than 50 characters'
  }
  return null
}

/**
 * 驗證年齡
 */
export const validateAge = (age: string | number): string | null => {
  if (!age) {
    return 'Age is required'
  }

  const ageNum = typeof age === 'string' ? parseInt(age) : age

  if (isNaN(ageNum)) {
    return 'Age must be a number'
  }

  if (ageNum < 0 || ageNum > 150) {
    return 'Age must be between 0 and 150'
  }

  if (!Number.isInteger(ageNum)) {
    return 'Age must be an integer'
  }

  return null
}

/**
 * 驗證整個表單
 */
export const validateForm = (name: string, age: string | number): ValidationError[] => {
  const errors: ValidationError[] = []

  const nameError = validateName(name)
  if (nameError) {
    errors.push({ field: 'name', message: nameError })
  }

  const ageError = validateAge(age)
  if (ageError) {
    errors.push({ field: 'age', message: ageError })
  }

  return errors
}
