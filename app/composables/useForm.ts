export function useForm<T extends object>(initial: T) {
  const form = reactive({ ...initial })
  const errors = ref<Record<string, string[]>>({})
  const loading = ref(false)

  const resetErrors = () => {
    errors.value = {}
  }

  return {
    form,
    errors,
    loading,
    resetErrors
  }
}