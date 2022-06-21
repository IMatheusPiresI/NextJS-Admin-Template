import { ReactNode } from "react";
import { useAppContext } from "../../data/hooks/useAppContext";
import AuthenticateConfig from "../auth/AuthenticateConfig";
import Header from "./Header";
import SideBar from "./SideBar";

interface LayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export default function Layout({title, subtitle, children}: LayoutProps) {
    const { theme } = useAppContext();

    return (
        <AuthenticateConfig>
            <div className={`${theme} flex`}>
                <header>
                    <SideBar/> 
                </header>
                <main className={`
                    flex flex-col
                    w-full min-h-screen
                    pl-24 pr-4
                    sm:pl-28 sm:pr-8
                    py-5
                    bg-gray-200
                    dark:bg-gray-800
                    text-gray-700
                    dark:text-white
                `}>
                    <Header title={title} subtitle={subtitle}/>
                    {children}
                </main>
            </div>
        </AuthenticateConfig>
    )
}