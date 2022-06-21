import { iconIdea } from "../icons/icons";

interface GreetingNewTopicProps {
    newTopic: (newState: boolean) => void;
}

export default function GreetingNewTopic({newTopic}: GreetingNewTopicProps) {
    return(
        <div className={`
            w-full 
            bg-gradient-to-t  from-gray-300/60 to-gray-200 dark:from-gray-700/60 dark:to-gray-800/50
            text-center
            flex items-center
            flex-col
            py-5 px-5
            relative
            mb-5
            min-h-full
        `}>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">
            Compartilhe conhecimento, crie um tópico sobre o que desejar!
            </h3>

            <div className="flex flex-col items-center justify-center w-full my-8">
                {iconIdea('w-16 h-16 mb-2 text-black/70 fill-yellow dark:text-yellow-600')}
                <p>Publique sobre alguma tecnologia interessante, dicas de estudos, feedbacks sobre o projeto, entre outros assuntos.</p>
            </div>

            <button className={`
                absolute -bottom-5
                rounded-lg
                scale-90 hover:scale-100 duration-300
                bg-gray-500
                py-2.5 px-5
                text-white
            `}
                onClick={() => newTopic(true)}
            >
                Criar tópico
            </button>
        </div>
    )
}