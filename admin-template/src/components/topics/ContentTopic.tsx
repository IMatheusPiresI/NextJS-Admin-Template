interface ContentTopicProps {
    label: string;
    value: string;
    onChange: (e:any) => void;
    minCaracter: boolean;
}

export default function ContentTopic({label, value, onChange, minCaracter}: ContentTopicProps) {
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
                    py-2 px-5
                    resize-none
                    focus:outline-none rounded-lg
                    dark:text-black
                    mt-1
                `}
                ></textarea>
                <div className="absolute flex justify-between w-full">
                    <p className="text-red-500">{value.trim() !== '' && value.trim().length < 15 && 'Mínimo 15 caracters'}</p>
                    <p className="text-gray-400">{value.length}/3000</p>
                </div>
       </div>
    )
}