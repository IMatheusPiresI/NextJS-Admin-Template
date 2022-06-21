import { ReactNode } from "react";

interface ItemPaginationProps {
    children: ReactNode;
    setCurrentPage: () => void;
    className?: string;
    disabled?: boolean;
}

export default function ItemPagination({ setCurrentPage, children, className, disabled}: ItemPaginationProps) {

    return (
        <li className={`w-7 h-7 sm:w-9 sm:h-9 bg-white/80 dark:bg-white/50 text-lg text-blue-800 shadow-sm shadow-black dark:shadow-gray-100`}>
            <button 
                className={`w-full h-full flex items-center justify-center ${className}`}
                onClick={() => setCurrentPage()}
                disabled={disabled}
                >{children}
            </button>
        </li>
    )
}