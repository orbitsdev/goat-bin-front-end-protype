<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const router = useRouter()

const handleCancel = () => {
  router.push('/admin/users')
}
</script>

<template>
<div class="max-w-3xl mx-auto px-2.5 mt-8">
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Create User</FieldLegend>
          <FieldDescription>
           Add a new user to the system. Fill in all required fields below.
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel for="user-name">
                Full Name
              </FieldLabel>
              <Input
                id="user-name"
                placeholder="John Doe"
                required
              />
            </Field>
            
            <Field>
              <FieldLabel for="user-email">
                Email Address
              </FieldLabel>
              <Input
                id="user-email"
                type="email"
                placeholder="john.doe@example.com"
                required
              />
              <FieldDescription>
                Enter a valid email address for the user
              </FieldDescription>
            </Field>
            
            <Field>
              <FieldLabel for="user-password">
                Password
              </FieldLabel>
              <Input
                id="user-password"
                type="password"
                placeholder="••••••••"
                required
              />
              <FieldDescription>
                Password must be at least 8 characters long
              </FieldDescription>
            </Field>
            
            <Field>
              <FieldLabel for="user-role">
                Role
              </FieldLabel>
              <Select>
                <SelectTrigger id="user-role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>
                Assign a role to the user
              </FieldDescription>
            </Field>
            
          </FieldGroup>
        </FieldSet>
        
        <FieldSeparator />
        
        <Field orientation="horizontal">
          <Button type="submit">
            Create User
          </Button>
          <Button variant="outline" type="button" @click="handleCancel">
            Cancel
          </Button>
        </Field>
      </FieldGroup>
    </form>
</div>
</template>