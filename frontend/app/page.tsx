import FormLogin from "@/components/FormLogin";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function Home(){
  return(
    <main className="flex h-dvh w-full">
      <section className="bg-fundoSecundairo w-[60%] relative">
        <Image src={'/images/bannerLogin.png'} alt="Foto do banner login" fill style={{objectFit:'contain'}}/>
      </section>
      <section className="w-[40%] flex flex-col justify-center items-center">
        <div className="w-[80%] my-3">
          <div className="w-[13%] bg-primaria h-1 rounded mb-5"></div>
          <h1 className="text-5xl font-semibold mb-4 mt-10">Login</h1>
          <p className="text-xl text-textoSecundario mb-20">Acesse sua conta</p>
          <FormLogin/>  
        </div>
        <div className="flex w-[80%] items-center gap-4 my-3">
          <Separator className={"flex-1"}/>      
          <span>ou</span>
          <Separator className={'flex-1'}/>
        </div>
        <div className="space-x-2">
          <span>Ainda não tem uma conta?</span>
          <Link href={'/cadastro'} className="text-primaria font-semibold">Cadastra-se</Link>
        </div>
      </section>
    </main>
  )
}