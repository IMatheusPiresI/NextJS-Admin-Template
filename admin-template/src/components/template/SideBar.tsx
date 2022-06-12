import { useAuthContext } from "../../data/hooks/useAuthContext";
import { iconAdjustments, iconHome, iconLogout, iconNotifications, iconUserProfile } from "../icons/icons";
import Logo from "./Logo";
import SideBarItems from "./SideBarItems";

export default function SideBar() {
    const { logout } = useAuthContext();
    return (
        <aside className="fixed left-0">
            <nav className="
                flex flex-col bg-white min-h-screen
                dark:bg-gray-900
            ">
                <div className="
                    flex items-center justify-center 
                    h-20 w-20
                    bg-gradient-to-r from-indigo-500 to-indigo-800
                ">
                    <Logo/>
                </div>
                <ul className="flex flex-col flex-grow">
                    <SideBarItems icon={iconHome} name={'Início'} href={'/'}/>
                    <SideBarItems icon={iconAdjustments} name={'Ajustes'} href={'/adjustments'}/>
                    <SideBarItems icon={iconNotifications} name={'Notificações'} href={'/notifications'}/>
                    <SideBarItems icon={iconUserProfile} name={'Perfil'} href={'/profile'}/>
                </ul>
                <ul>
                    <SideBarItems 
                    icon={iconLogout} 
                    name={'Sair'} href={'/'} 
                    className={`
                        text-red-600 hover:bg-red-500 hover:text-white
                        dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white
                    `}
                    onClick={logout}
                    />
                </ul>
            </nav>
        </aside>
    )
}