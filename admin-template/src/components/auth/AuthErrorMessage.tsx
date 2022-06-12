import { iconWarning } from "../icons/icons";

interface AuthErrorMessageProps {
    errorMessage: string;
}

export default function AuthErrorMessage({errorMessage}: AuthErrorMessageProps) {
    return(
        <div className="flex items-center bg-red-300 p-3 rounded-lg mb-5">
            <h3 className="flex items-center text-1xl font-bold text-red-600">
                {iconWarning('w-7 h-7 text-red-800 text-2xl mr-2')}
                {errorMessage}
            </h3>
        </div>
    )
}