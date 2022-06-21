import { useAppContext } from "../../data/hooks/useAppContext";
import { useAuthContext } from "../../data/hooks/useAuthContext";
import { iconHome, iconLogout, iconMoon, iconMyTopics, iconSun, iconUserProfile } from "../icons/icons";
import Logo from "./Logo";
import SideBarItems from "./SideBarItems";

export default function SideBar() {
    const { logout } = useAuthContext();
    const { theme, changeTheme } = useAppContext();

    function handleChangeTheme() {
        changeTheme()
    }

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
                <ul className="flex flex-col flex-grow text-center">
                    <SideBarItems icon={iconHome} name={'Início'} href={'/'}/>
                    <SideBarItems icon={iconMyTopics} name={'Meus Tópicos'} href={'/mytopics'}/>
                    <SideBarItems icon={iconUserProfile} name={'Perfil'} href={'/profile'}/>
                </ul>
                <ul>
                    <SideBarItems icon={theme === 'dark' ? iconSun('w-6 h-6') : iconMoon('w-6 h-6')} name={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'} onClick={handleChangeTheme} className={'flex sm:hidden'}/>
                    <SideBarItems 
                        icon={iconLogout} 
                        name={'Sair'} href={'/authentication'} 
                        className={`
                            text-red-600 hover:bg-red-600 hover:text-white
                            dark:text-red-600 dark:hover:text-white dark:hover:bg-red-600
                        `}
                        onClick={logout}
                    />
                </ul>
            </nav>
        </aside>
    )
}