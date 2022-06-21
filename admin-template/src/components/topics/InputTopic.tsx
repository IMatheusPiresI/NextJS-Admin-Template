interface InputTopicProps {
    label: string;
    value: string;
    onChange: (e: any) => void;
    min: number;
    max: number;
    placeholder: string;
    type: string;
    className?: string;
}

export default function InputTopic({label, value, onChange, min, max, placeholder, type, className}: InputTopicProps) {
    return(
        <div className="w-full text-justify mt-2">
            <label htmlFor={label} className={`
                text-lg
            `}>
                {label}
            </label>
            {type !== 'url' ? (
                <input 
                    type={type}
                    id={label} 
                    value={value} 
                    onChange={onChange} 
                    minLength={min} 
                    maxLength={max} 
                    required
                    placeholder={placeholder}
                    className={`
                        w-full 
                        sm:py-2 sm:px-3
                        py-2 px-2
                        focus:outline-none
                        dark:text-black
                        rounded-lg
                        mt-1
                        ${className}
                    `}
                />
            ) : (
                <input 
                    type={type}
                    id={label} 
                    value={value} 
                    onChange={onChange} 
                    minLength={min} 
                    maxLength={max} 
                    required
                    placeholder={placeholder}
                    pattern={'https://.*'}
                    className={`
                        w-full
                        sm:py-2 sm:px-3
                        py-2 px-2
                        focus:outline-none
                        dark:text-black
                        rounded-lg
                        mt-1
                        ${className}
                    `}
                />
            )}
            <p className="dark:text-gray-400 text-gray-500 mt-1">{value.length}/{max}</p>
        </div>
    )
}