import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react"

interface SideBarItems {
    icon: ReactNode;
    name: string;
    href?: string;
    className?: string;
    onClick?: () => void;
}

export default function SideBarItems({icon, name, href, className, onClick}: SideBarItems){
    const [active, setActive] = useState<boolean>(false);
    const router = useRouter();
   
    useEffect(() => {
        if(router.pathname === href) {
            setActive(true)
        }else {
            setActive(false)
        }
    },[])
    return (
        <Link href={href ? href : ''}>
            <li className={`
                flex flex-col gap-1 justify-center items-center
                cursor-pointer  
                w-20 h-20
                text-sm 
                ease-in-out
                bg-white hover:bg-gray-200
                dark:bg-gray-900 dark:hover:bg-gray-700
                dark:text-white 
                ${active && 'bg-gray-300/80 dark:bg-gray-700'}
                ${className}
            `}
                onClick={onClick}
            >
                {icon}
                <p className="text-center">{name}</p>
            </li>
        </Link>
    )
}