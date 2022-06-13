import { FormEvent, useState } from "react";
import { useDbContext } from "../../data/hooks/useDbContext";
import ContentTopic from "./ContentTopic";
import InputTopic from "./InputTopic";

interface FormTopicProps {
  setSucessMessage: (newState: boolean) => void;
}

export default function FormTopic({setSucessMessage}: FormTopicProps) {
    const { addCard } = useDbContext();
    const [content, setContent] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [minCaracter, setMinCaracter] = useState<boolean>(false);

    function handleCreateCard(e: FormEvent) {
        e.preventDefault();
        if(content.trim().length < 15){
          return null
        }
          if(image !== '' || image.length > 10){
            addCard(content, title, image);
            setSucessMessage(true);
          }else {
            addCard(content, title);
          }
      }

    return (
        <form 
            onSubmit={handleCreateCard} 
            className={`
                w-full 
                bg-gradient-to-t  from-gray-300/80 to-gray-200/75 dark:from-gray-700/60 dark:to-gray-800/50
                text-center
                flex items-center
                flex-col
                py-5 px-5
                relative
                mb-5
                min-h-full
            `}>
                <h3 className={`text-xl font-bold`}>
                    Compartilhe algo com a gente!
                </h3>
                
                <div className="flex w-full gap-2 md:gap-10 mt-3 flex-col md:flex-row">
                  <InputTopic
                    label="Título"
                    type={'text'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    min={3}
                    max={32}
                    placeholder={'Título do Tópico'}
                  />

                  <InputTopic
                    label="Imagem"
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    min={10}
                    max={200}
                    placeholder={'Ex: https://image.png'}
                  />
                </div>

                <ContentTopic
                  label={'Conteúdo'}
                  value={content} 
                  minCaracter={minCaracter}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button 
                  type="submit"
                  className={`
                    absolute -bottom-5
                    rounded-lg
                    scale-90 hover:scale-100 duration-300
                    bg-gray-500
                    py-2.5 px-5
                    text-white
                  `}
                  >Criar
                </button>
            </form>
    )
}