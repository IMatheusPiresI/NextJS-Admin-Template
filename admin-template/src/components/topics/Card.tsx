interface CardProps {
    title: string;
    image: string;
    content: string;
} 

export default function Card({title, image, content}: CardProps) {
    return (
        <div className={`
                w-full max-w-xs h-96 rounded-lg text-center py-4 
                bg-white/30
                scale-95 hover:scale-100
                duration-300
                shadow-lg shadow-black/30
                border border-solid border-slate-700
                dark:border-white
                break-words
            `}>
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
                    {content.length > 125 ? `${content.slice(1, 125)}...` : content}
                </p>
            </div>
        </div>
    )
}