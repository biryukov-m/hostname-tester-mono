import bcrypt from 'bcrypt';

async function hashString(string: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(string, salt);
  return hash;
}

export default hashString;
