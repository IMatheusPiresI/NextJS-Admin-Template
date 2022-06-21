import Image, { StaticImageData } from "next/image";
import { useAuthContext } from "../../data/hooks/useAuthContext";

interface EditImageUserProps {
    src?: StaticImageData | string;
    url: string;
    alt: string;
    googleImage?: boolean;
    closeEdit: () => void;
    changeImage: (src: string) => void;
}

export default function EditImageUser({src,url, alt, googleImage, changeImage}: EditImageUserProps) {
    const { user } = useAuthContext();

    function handleChageUserPhoto() {
        changeImage(url);
    }


    return(
        <div className={`
            w-24 h-24
            ease-linear duration-200
            cursor-pointer 
            rounded-full 
            overflow-hidden
            ${user?.photoURL === url ? 'scale-110 animate-pulse hover:scale-110 border-2 border-solid border-cyan-500' : 'scale-95 hover:scale-100'}
        `} onClick={handleChageUserPhoto}>
            {googleImage ? (
                <img 
                    src={url} 
                    alt={alt}
                />
            ) : 
                <Image 
                    src={src}
                    alt={alt}
                />
            }
        </div>
    )
}