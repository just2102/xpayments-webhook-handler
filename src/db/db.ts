export function getDbUri() {
  const dbUri = process.env.MONGO_URI;
  if (!dbUri) {
    throw new Error('MONGO_URI is not defined');
  }

  return dbUri;
}
