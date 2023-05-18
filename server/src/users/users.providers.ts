import { User } from '../users/models/user.model'

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
]