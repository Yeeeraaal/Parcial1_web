import {lang} from 'next/root-params'
import {notFound} from 'next/navigation'

//diccionarios disponibles
const dictionaries = {
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

//función que valida si el idioma existes
export const hasLocale = (locale:string): locale is Locale => locale in dictionaries

//función asíncrona que obtiene el diccionario según el idioma
export const getDictionary = async () => {
    const locale = await lang()
    if (!hasLocale(locale)) notFound()
    return dictionaries[locale]()
}