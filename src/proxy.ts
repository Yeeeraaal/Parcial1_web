import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let locales = ['es', 'en']
let defaultLocale = 'es'

function getLocale(request: NextRequest) {
    const headers = { 'accept-language': request.headers.get('accept-language') || '' }
    const languages = new Negotiator({ headers }).languages()
    return match(languages, locales, defaultLocale)
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
    if (pathnameHasLocale) return

    // Si no tiene un idioma usa el del navegador y redirige
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl) }

    export const config = {
  matcher: [
    // Omite rutas internas de next
    '/((?!_next|favicon.ico|.*\\.).*)',
  ],


}