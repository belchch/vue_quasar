import { AuthApi } from 'src/features/auth/api';


export const test = async () => {
  try {
    const response = await AuthApi.login({
      username: 'rb',
      password: 'pass'
    })
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}
