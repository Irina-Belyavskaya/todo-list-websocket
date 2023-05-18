import repository from "repository";
import { headers } from '../headers';

// ============== Types ==============
import { RegistrationDto } from "app/auth/types/registration.dto";
import { AuthenticationDto } from "app/auth/types/authentication.dto";

export const registration = async (user: RegistrationDto) => {
  return await repository.post('auth/register', user, headers)
}

export const authentication = async (user: AuthenticationDto) => {
  return await repository.post('auth/login', user, headers)
}

export const logout = async () => {
  return await repository.get('auth/logout', headers)
}
