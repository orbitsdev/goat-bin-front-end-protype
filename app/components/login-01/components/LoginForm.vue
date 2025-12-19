<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

// ✅ Sanctum
const { login } = useSanctumAuth()

// ✅ Reusable form state
const {
  form,
  errors,
  loading,
  resetErrors
} = useForm({
  email: 'admin@example.com',
  password: 'password'
})

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

// ✅ Submit handler
const submit = async () => {
  resetErrors()
  loading.value = true

  try {
    await login({
      email: form.email,
      password: form.password,
    })
    // redirect handled by sanctum config
  } catch (err: any) {
   if (err.status === 422 && err.data?.errors) {
    errors.value = err.data.errors
  }

  // Invalid credentials (401)
  if (err.status === 401) {
    errors.value = {
      email: ['Invalid email or password'],
      password: ['Invalid email or password'],
    }
  }
  } finally {
    loading.value = false
  }
}
</script>
<template>
  {{ loading ? 'loading' : 'not loading' }}

  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="submit">
          <FieldGroup>

            <Field>
              <FieldLabel for="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" v-model="form.email" />
              <p v-if="errors.email" class="text-sm text-red-500">
                {{ errors.email[0] }}
              </p>
            </Field>

            <Field>
              <FieldLabel for="password">Password</FieldLabel>
              <Input id="password" type="password" v-model="form.password" />
              <p v-if="errors.password" class="text-sm text-red-500">
                {{ errors.password[0] }}
              </p>
            </Field>

          </FieldGroup>

          <!-- ✅ BUTTONS OUTSIDE FieldGroup -->
          <div class="flex flex-col gap-3 mt-4">
            <Button type="submit" :disabled="loading">
              {{ loading ? 'Logging in...' : 'Login' }}
            </Button>

            <Button variant="outline" type="button">
              Login with Google
            </Button>

            <FieldDescription class="text-center">
              Don't have an account?
              <a href="#">Sign up</a>
            </FieldDescription>
          </div>

        </form>
      </CardContent>
    </Card>
  </div>
</template>
