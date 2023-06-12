import { ErrorObject } from '@vuelidate/core'
export interface ErrorParams {
  max: number
  min: number
}
export function useInputValidations() {
  const errorMessages = (param: ErrorObject, modelValue: string) => {
    const params = param.$params as ErrorParams
    if (param.$validator === "required" || modelValue === 'Select') {
      return "The field is required";
    } else if (param.$validator === "maxLength") {
      return `Maximum character is ${params.max} `;
    } else if (param.$validator === "minLength") {
      return `Must be at least ${params.min} characters`;
    } else if (param.$validator === "email") {
      return "The value should be valid email";
    } else if (
      param.$validator === "containsValidPassword" &&
      modelValue !== "" &&
      modelValue.length > 12 &&
      modelValue.length < 80
    ) {
      return param.$message;
    } else if (param.$validator === "sameAs") {
      return "The passwords should be the same";
    } else if (param.$validator === 'checkBusinessType') {
      return "The field is required";
    }
  }
  // Check valid password
  const containsValidPassword = (value: string) => {
    if (value !== '' && value.length > 12 && value.length < 80) {
      const containsUppercase = /[A-Z]/.test(value)
      const containsLowercase = /[a-z]/.test(value)
      const containsNumber = /[0-9]/.test(value)
      const containsSpecial = /[_#?!@$%^&*-]/.test(value)
      return (
        containsUppercase && containsLowercase && containsNumber && containsSpecial
      )
    }
  }
  // Check valid BusinessType
  const checkBusinessType = (value: string) => {
    if (value === 'Select') {
      return false
    } else return true
  }

  return { errorMessages, checkBusinessType, containsValidPassword }
}