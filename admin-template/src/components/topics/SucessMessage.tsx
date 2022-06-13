import { iconSuccess } from "../icons/icons";

interface SucessMessageProps {
    setSucessMessage: (newState: boolean) => void;
}

export default function SucessMessage({setSucessMessage}: SucessMessageProps) {
    return(
        <div className={`
            w-full
            bg-gradient-to-t  from-green-300/80 to-gray-200/75 dark:from-green-700/60 dark:to-gray-800/50
            text-center
            flex items-center
            flex-col
            lg:py-5 lg:px-5
            relative
            mb-5
            min-h-full
        `}>
            <h3 className="text-xl text-lime-800/90 font-bold dark:text-lime-400">
                Tópico Criado com Sucesso!
            </h3>

            <div className="flex flex-col items-center justify-center w-full my-8">
                {iconSuccess('w-16 h-16 mb-2 text-green-600 dark:text-green-500')}
                <p className="text-lime-900 dark:text-lime-500">Confira seu tópico nos items abaixo.</p>
            </div>

            <button className={`
                absolute -bottom-5
                rounded-lg
                font-bold
                scale-90 hover:scale-100 duration-300
                bg-green-500
                py-2.5 px-5
                text-white
            `}
                onClick={() => setSucessMessage(false)}
            >
                Criar novo tópico
            </button>
        </div>
    )
}