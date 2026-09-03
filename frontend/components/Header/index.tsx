'use client'

import { useAuthStore } from "@/store/store"
import { EllipsisVertical } from "lucide-react"
import ButtonLogout from "../ButtonLogout"
import Image from "next/image"
import { usePathname } from "next/navigation"


export default function Header(){

    const userInfo = useAuthStore((state)=>state.userInfo)
    const URL = usePathname()
    const palavras = userInfo.user?.name.split(' ') || ""
    const primeiraLetra = palavras[0][0]
    const segundaLetra = palavras[palavras?.length-1][0]

    return(
        <header className="bg-fundoPrincipal py-3 flex items-center justify-between px-10 relative">
            <div className="flex items-center space-x-2">
                <Image src={'/icons/favicon.png'} width={50} height={50} alt="Icone do sistema" />
                <h2 className="text-2xl font-bold text-textoPrincipal">Reserva<strong className="font-bold text-primaria">Tech</strong></h2>
            </div>
            <h2 className="text-xl text-textoPrincipal text-center absolute left-1/2 -translate-x-1/2">
                {URL === "/dashboard" ? "Equipamentos" : ""}
                {URL === "/historico" ? "Minhas Reservas" : ""}
            </h2>
            <section className="flex gap-5 items-center">
                <div className="border-2 border-t-borda border-x-primaria/40 border-b-primaria rounded-full px-3 py-2.5 ">
                    <p className="text-textoPrincipal">{primeiraLetra}{segundaLetra}</p>
                </div>
                <div>
                    <h3 className="text-textoPrincipal">{userInfo.user?.name}</h3>
                    <p className="text-textoSecundario">{userInfo.user?.role}</p>
                </div>
                <EllipsisVertical className="text-textoSecundario"/>
                <ButtonLogout/>
            </section>
        </header>
    )
}