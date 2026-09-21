import { getDictionary } from './dictionaries'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{dict.welcome}</h1>
      <p>{dict.profile}</p>
    </main>
  )
}