export default async () => {
  const { text, subject } = await renderEmailComponent('Welcome', {}, { plainText: true })
  return { text, subject }
}
