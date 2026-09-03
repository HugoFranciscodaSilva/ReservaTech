'use client'

import { useAuthStore } from "@/store/store"
import { Calendar, Layers } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar(){

    const userRole = useAuthStore((state) => state.userInfo.user?.role)
    const URL = usePathname()
    
    return(
         <nav className="w-full h-20 bg-card border-y-2 border-borda">
            <ul className="flex h-full px-4 gap-15">
                <li >
                    <Link href={'/dashboard'} className={`flex gap-3 h-full items-center ${URL === "/dashboard" ? " text-primaria border-b-2 border-primaria " : "text-textoSecundario"}`}>
                        <Layers/>
                        <span>Equipamentos</span>
                    </Link>
                </li>
                <li>
                    <Link href={userRole === "Administrador" ? '/relatorio' : '/historico'} className={`flex gap-3 h-full items-center ${URL !== "/dashboard" ? " text-primaria border-b-2 border-primaria " : "text-textoSecundario"}`}>
                        <Calendar/>
                        <span>{userRole === "Administrador" ? 'Relatório de Reservas' : "Minhas Reservas"}</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}