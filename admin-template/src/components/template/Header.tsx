import ButtonTheme from "./ButtonTheme";
import UserPhoto from "./UserPhoto";

interface HeaderProps {
    title: string;
    subtitle: string;
}

export default function Header({title, subtitle}: HeaderProps) {
    

    return (
        <section className="flex items-center">
            <div className="flex-grow">
                <h1 className={`
                    text-black text-3xl font-bold
                    dark:text-white
                `}>{title}</h1>
                <h2 className={`
                    text-black text-1xl
                    dark:text-white
                `}>{subtitle}</h2>
            </div>
            <div className="flex">
                <ButtonTheme/>
                <UserPhoto/>
            </div>
        </section>
    )
}