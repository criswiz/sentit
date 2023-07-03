import { getServerSession } from "next-auth"
import { authOptions } from "../../pages/api/auth/[...nextauth]"


export default async function Dashboard(){
    return (
        <main>
            <h1 className="text-2xl font-bold">Welcome back</h1>
        </main>
    )
}