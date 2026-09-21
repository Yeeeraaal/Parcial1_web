'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguageChange = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`
    router.refresh()
  }

  // Función que genera la nueva URL
  const redirectedPathname = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale // ESto es lo que  reemplaza /es o /en en la URL
    return segments.join('/')
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-blue-200 rounded-lg w-fit">
      <Link 
        href={redirectedPathname('es')} 
        onClick={() => handleLanguageChange('es')}
        className="px-3 py-1 font-medium bg-white-45 rounded-md shadow-sm hover:bg-blue-50 hover: text-gray-900 transition-colors border shadow-sm"
      >
        ES
      </Link>
      
      <Link 
        href={redirectedPathname('en')} 
        onClick={() => handleLanguageChange('en')}
        className="px-3 py-1 font-medium bg-white-55 rounded-md shadow-sm hover:bg-blue-50 hover: text-gray-900 transition-colors border shadow-sm"
      >
        EN
      </Link>
    </div>
  )
}