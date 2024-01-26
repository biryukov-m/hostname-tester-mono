import bcrypt from 'bcrypt';

async function hashPassword(string: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(string, salt);
  return hash;
}

export default hashPassword;
