import FormLogin from "@/components/FormLogin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home(){
  return(
    <Card className="w-[30%] m-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Acesse sua conta</CardDescription>
      </CardHeader>
      <CardContent>
        <FormLogin/>
      </CardContent>
    </Card>
  )
}