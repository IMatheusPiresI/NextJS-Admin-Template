export default function Logo() {
    return (
        <div className="
            flex flex-col
            items-center justify-center
            h-14 w-14 bg-white
            rounded-full
        ">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="flex gap-1">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
        </div>
    )
}