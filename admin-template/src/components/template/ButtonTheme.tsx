import { useAppContext } from "../../data/hooks/useAppContext";
import { iconMoon, iconSun } from "../icons/icons";

export default function ButtonTheme() {
    const { theme, changeTheme } = useAppContext();
    return (
        <div className="
                bg-zinc-500 rounded-full w-16 h-8
                dark:bg-amber-300
                border border-solid border-blue-400
                relative
                ease-in-out duration-500
                cursor-pointer
            "
            onClick={changeTheme}
        >
            <div className={`
                flex items-center justify-center
                w-8 h-8
                rounded-full
                ease-in-out duration-500
                absolute
                bg-black left-0
                dark:bg-gray-400 dark:left-9
            `}>
                {theme === 'dark' ? iconSun('h-6 w-6 text-yellow-100') : iconMoon('h-6 w-6 text-white') }
            </div>
        </div>
    )
}