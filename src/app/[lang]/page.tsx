import { getDictionary } from './dictionaries'
import Link from 'next/link'

interface Razas {
  message: string
}

async function getRazas(): Promise<Razas[]> {
  const res = await fetch('https://dog.ceo/api/breeds/image/random')
  const data = await res.json()


  const razas = await Promise.all(
    data.results.map(async (razas: { message: string }) => {
      const DogRes = await fetch(razas.message)
      const DogData = await DogRes.json()


      return {
        message: DogData.message
      }
    })
  )

  return razas
}


export default async function Page() {
  //parámetro dinámico del idioma
  const dict = await getDictionary()
  //consumo de la API
  const razas = await getRazas()

  return (
    <main className="p-8 max-w-6xl mx-auto">
     


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols- gap-6">
        {razas.map((raza) => (
          <div
            key={raza.message}
            className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-32 h-32 mb-4 flex items-center justify-center bg-gray-50 rounded-full p-2 group-hover:scale-110 transition-transform">
              <img
                src={raza.message}
                alt={raza.message}
                className="w-full h-full object-contain"
              />
            </div>


  

          </div>
        ))}
      </div>
    </main>
  )
}