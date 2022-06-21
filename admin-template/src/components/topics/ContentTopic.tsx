interface ContentTopicProps {
    label: string;
    value: string;
    onChange: (e:any) => void;
    className?: string;
}

export default function ContentTopic({label, value, onChange, className}: ContentTopicProps) {
    return (
       <div className="text-justify relative w-full my-5">
            <label htmlFor={label}>{label}</label>
            <textarea 
                id={label} 
                value={value}
                onChange={onChange}
                required
                minLength={10}
                maxLength={3000}
                className={`
                    w-full
                    sm:py-2 sm:px-5
                    py-1 px-2
                    resize-none
                    focus:outline-none rounded-lg
                    dark:text-black
                    mt-1
                    ${className}
                `}
            ></textarea>
            <div className="absolute flex justify-between w-full">
                <p className="text-red-500 text-xs sm:text-sm">{value.trim() !== '' && value.trim().length < 15 && 'Mínimo 15 caracteres'}</p>
                <p className="dark:text-gray-400 text-gray-500">{value.length}/3000</p>
            </div>
       </div>
    )
}