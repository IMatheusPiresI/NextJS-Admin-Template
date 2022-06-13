interface InputTopicProps {
    label: string;
    value: string;
    onChange: (e: any) => void;
    min: number;
    max: number;
    placeholder: string;
    type: string;
}

export default function InputTopic({label, value, onChange, min, max, placeholder, type}: InputTopicProps) {
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
                        w-full py-2 px-3
                        focus:outline-none
                        dark:text-black
                        rounded-lg
                        mt-1
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
                        w-full py-2 px-3
                        focus:outline-none
                        dark:text-black
                        rounded-lg
                        mt-1
                    `}
                />
            )}
        </div>
    )
}