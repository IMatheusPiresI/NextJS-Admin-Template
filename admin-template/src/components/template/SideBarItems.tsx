import Link from "next/link";
import { ReactNode } from "react"

interface SideBarItems {
    icon: ReactNode;
    name: string;
    href: string;
    className?: string;
    onClick?: () => void;
}

export default function SideBarItems({icon, name, href, className, onClick}: SideBarItems){
    return (
        <Link href={href}>
            <li className={`
                flex flex-col gap-1 justify-center items-center
                cursor-pointer hover:bg-gray-200
                w-20 h-20
                text-sm 
                dark:text-white dark:hover:bg-gray-700
                ${className}
            `}
                onClick={onClick}
            >
                {icon}
                <p>{name}</p>
            </li>
        </Link>
    )
}