interface AuthInputProps {
    title: string;
    value: string;
    type: string;
    id: string;
    className?: string;
    onChange: (newState: string) => void;
    required?: boolean;
}

export default function AuthInput({title, value, type, id, className, onChange, required}: AuthInputProps) {
    return (
        <div className="flex flex-col mb-5">
            <label htmlFor={id}>{title}</label>
            <input
                value={value}
                type={type} 
                id={id}
                className={`
                    w-full bg-blue-100
                    p-2 mt-2
                    focus:outline-none
                    ${className}
                `}
                onChange={(e) => onChange(e.target.value)}
                required={required}
            />
        </div>
    )
}