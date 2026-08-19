'use client'

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function FormLogin(){
    return(
        <form>
            <div>
                <Label htmlFor="email">Digite seu email:</Label>
                <Input type="email" id="email" placeholder="exemplo@exemplo.com"/>
            </div>
            <div>
                <Label htmlFor="password">Digite sua senha:</Label>
                <Input type="password" id="password" placeholder="•••••••••"/>
            </div>
            <Button type="submit" className={'w-full'}>Entrar</Button>
        </form>
    )
}