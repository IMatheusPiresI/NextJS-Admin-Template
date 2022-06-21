import Image from 'next/image'
import alone from '../../../public/images/alone.png'

export default function NoTopics() {
    return(
            <div className="max-w-sm w-full border border-gray-400 rounded-xl text-center py-5 px-2 shadow-black/40 dark:shadow-gray-100 shadow-sm duration-200 ">
                <Image src={alone} alt="sem tópicos"/>
                <h3 className="text-gray-700 dark:text-gray-200">
                    Parece que não temos nada por aqui, popule esta sessão criando seu primeiro tópico!
                </h3>
            </div>
    )
}