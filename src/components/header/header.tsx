import Link from "next/link";

export  default function Header(){
    return (
        <nav className="bg-white">
            <div className="h-12 flex items-center  mx-auto px-4 max-w-7xl">
                <div className="logo flex-none w-32">
                    <Link href="/">
                        LOGO
                    </Link>
                </div>
                <div className="links flex items-center gap-4">
                    <Link href="/college-listing">college</Link>
                    <Link href="/">Study Abroad</Link>
                    <Link href="/">Exam</Link>
                </div>
            </div>
        </nav>
    )
}