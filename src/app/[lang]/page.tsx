import { getDictionary } from './dictionaries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type LayoutProps from "next";
import Link from 'next/link'



interface Razas {
  name: string
  image: string
}

async function getRazas(): Promise<Razas[]> {
  const res = await fetch('https://dog.ceo/api/breeds/image/random')
  const data = await res.json()


  const razas = await Promise.all(
    data.results.map(async (razas: { name: string; url: string }) => {
      const DogRes = await fetch(razas.url)
      const DogData = await DogRes.json()

      
      return {
        name: DogData.name,
        image: DogData.sprites.front_default
      }
    })
)

return razas}


export default async function Page(){
  //parámetro dinámico del idioma
    const dict = await getDictionary()
  //consumo de la API
  const razas = await getRazas()

  return (
    <main className="p-8 max-w-6xl mx-auto">
      {/* Título desde el diccionario */}
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols- gap-6">
        {razas.map((raza) => (
          <div
            key={raza.name}
            className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-32 h-32 mb-4 flex items-center justify-center bg-gray-50 rounded-full p-2 group-hover:scale-110 transition-transform">
              <img
                src={raza.image}
                alt={raza.name}
                className="w-full h-full object-contain"
              />
            </div>


            {/* Nombre dinámico traído de la API */}
            <h2 className="text-xl font-bold text-gray-800 capitalize mt-1 mb-4">
              {raza.name}
            </h2>

            {/* Texto traducido en el botón */}
        <Link
              href={`/pokemon/${raza.name}`}
              className="w-full mt-auto bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl text-center block"
            >
              detalle
            </Link>
          </div>
        ))}
         </div>
    </main>
  )
}