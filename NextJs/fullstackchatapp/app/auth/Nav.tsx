import Link from "next/link"
import Login from "./Login"
export default async function Nav()

{
    return (
    <nav className="flex justify-between items-center py-8">
        <Link href ={"/"}>
            <h1 className="font-bold text-lg">Send it:</h1>
        </Link>
        <ul className="flex items-center gap-6">
            <Login />
        </ul>

    </nav>
    )

}