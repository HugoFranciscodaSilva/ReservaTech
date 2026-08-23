import { NextRequest, NextResponse } from "next/server"

export function proxy(request:NextRequest){
    const token = request.cookies.get('token')?.value

    const {pathname} = request.nextUrl

    if(pathname.startsWith('/dashboard') || pathname.startsWith('/relatorio') || pathname.startsWith('/historico')){
        if(!token){
            return NextResponse.redirect(new URL('/?error=unauthorized',request.url))
        }
    }
    if(pathname === '/'){
        if(token){
            return NextResponse.redirect(new URL('/dashboard',request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher:['/dashboard/:path*',"/relatorio/:path*","/historico/:path",'/']
}