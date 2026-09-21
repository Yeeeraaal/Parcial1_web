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
    <div>
      <Link 
        href={redirectedPathname('es')} 
        onClick={() => handleLanguageChange('es')}
      >
        Español (ES)
      </Link>
      {' | '}
      <Link 
        href={redirectedPathname('en')} 
        onClick={() => handleLanguageChange('en')}
      >
        English (EN)
      </Link>
    </div>
  )
}