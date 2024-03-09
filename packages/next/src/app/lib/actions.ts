'use server';

const signIn = async (formData: FormData) => {
  const baseUrl = process.env.BACKEND_BASE_URL;
  const password = formData.get('password');
  const result = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ password })
  });
  const json = await result.json();
  if (json?.data?.authenticated === true) {
    return true;
  }
  throw new Error('AUTH FAIL');
};

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn(formData);
    console.log('Auth ok');
  } catch (error) {
    if (error) {
      console.log('not auth');
      return 'Ауторизація неуспішна';
    }
    throw error;
  }
}
