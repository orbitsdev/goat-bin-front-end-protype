import type { User } from '~/types/user'


export const useUser = () => {
  return useState<User>('user', () => ({
    name: 'John Doe',
    age: 30
  }))
}
