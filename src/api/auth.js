const AUTH_ENDPOINT = 'https://serverless-api-teal.vercel.app/api/auth/signin'

export async function signIn(email, password) {
  const response = await fetch(AUTH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const body = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(body.message || body.error || 'Unable to sign in. Please try again.')
  }

  const data = body.data || body

  const token =
    data.jwt_token || data.token || data.jwtToken || (data.data && data.data.token)

  const user = data.user || (data.data && data.data.user)

  if (!token) {
    throw new Error('Sign in succeeded but no token was returned.')
  }

  return { token, user }
}
