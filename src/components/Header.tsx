import LanguageSwitcher from "@/components/LanguageSwitcher"
import Image from 'next/image'
import Logo from '@/components/Logo'

export default async function Header(){
    return (
        <header className="bg-[#FF6B35] text-white .fixed .items-center">
            <Logo/>
        </header>
    )
}