import { useDbContext } from "../../data/hooks/useDbContext";
import Cookies from 'js-cookie'
import { FormEvent, useEffect, useState } from "react";
import { iconClose, iconExclude, iconPencil } from "../icons/icons";
import InputTopic from "./InputTopic";
import ContentTopic from "./ContentTopic";
import Router from "next/router";

interface CardProps {
    id: string;
    uid: string;
    title: string;
    image: string;
    content: string;
} 

export default function Card({title, image, content, id, uid}: CardProps) {
    const { cards } = useDbContext();
    const { deleteCards, updateCard } = useDbContext();
    
    const [update, setUpdate] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(null);
    const [newImage, setNewImage] = useState<string>(null);
    const [newContent, setNewContent] = useState<string>(null);
    const [uidCurrentUser, setUidCurrentUser] = useState<string>(null);

    function handleDeleteCard(e: any){
        e.stopPropagation();
        deleteCards(id);
    }

    function openUpdateCard(e: any){
        e.stopPropagation();
        setUpdate(!update)
    }
    
    function handleupdateCard(e: FormEvent){
        e.preventDefault();
        updateCard(id,newTitle,newImage,newContent);
        setUpdate(false)
    }

    function handleOpenTopic(){
        Router.push(`/topic/${title}/${id}`)
    }

    useEffect(() => {
        console.log(title);
        setUidCurrentUser(Cookies.get('admin-template-auth'))
        setNewTitle(title);
        setNewImage(image);
        setNewContent(content)
    }, [cards])

    return (
        <div className={`
                w-full max-w-xs h-96 rounded-lg text-center py-4 
                bg-gray-300/30
                scale-95 hover:scale-100
                duration-300
                relative
                shadow-lg shadow-black/30
                border border-solid border-slate-700
                dark:border-white
                break-words
                ${update ? null : 'cursor-pointer'}
            `}
                onClick={update ? null : handleOpenTopic}
            >

           {uid === uidCurrentUser && (
             <div className="flex gap-4 absolute -top-4 -right-2">
                <button 
                    onClick={openUpdateCard} 
                    className={`
                    bg-gray-400 text-gray-100 p-1 rounded-full shadow-lg shadow-slate-600
                    `}>{!update ? iconPencil('w-6 h-6') : iconClose('w-6 h-6')}
                </button>

                {!update && 
                    <button 
                        onClick={handleDeleteCard}
                        className={`
                        bg-gray-400 text-gray-100 p-1 rounded-full shadow-lg shadow-slate-600
                        `}>{iconExclude('w-6 h-6')}
                    </button>}
             </div>
           )}
            {!update ? (
                <>
                    <h4 className={`
                        mb-4 text-lg font-bold px-1
                        h-12
                    `}>
                        {title}
                    </h4>
                    <div className="w-full h-36">
                        <img src={image} alt="foto card" className="w-full h-full object-cover object-center"/>
                    </div>
                    <div className="text-justify p-2">
                        <p className={`
                            text-sm
                            sm:text-base
                        `}>
                            {content.length > 125 ? `${content.slice(0, 125)}...` : content}
                        </p>
                    </div>
                </>
            ) : (
                <form onSubmit={handleupdateCard} className={'flex flex-col items-center justify-center py-2 px-1.5 relative'}>
                    <div className="w-full flex gap-3 text-justify">
                        <InputTopic
                            type="text" 
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            label={'Título'}
                            min={3}
                            max={32}
                            placeholder={'Digite o novo título'}
                            className={'px-1 py-1 text-sm'}
                        />

                        <InputTopic
                            label="Imagem"
                            type="url"
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                            min={10}
                            max={1000}
                            placeholder={'Ex: https://image.png'}
                            className={'px-1 py-1 text-sm'}
                        />
                    </div>
                    <ContentTopic
                        label={'Conteúdo'}
                        value={newContent} 
                        onChange={(e) => setNewContent(e.target.value)}
                        className={'h-40 text-sm'}
                    />
                    <button type="submit" className="bg-gray-700 text-gray-200 py-2 px-6 absolute -bottom-7 rounded-lg shadow-lg shadow-black/50">Enviar</button>
                </form>
            )}
        </div>
    )
}