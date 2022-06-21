import { useRouter } from "next/router";
import { useAuthContext } from "../../data/hooks/useAuthContext";

export default function UserPhoto() {
    const router = useRouter();
    const { user } = useAuthContext();
    return (
        <img 
            src={user?.photoURL ? user?.photoURL : 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png'} 
            alt="Foto" 
            className={`
                w-8 h-8
                rounded-full
                ml-3
                cursor-pointer
            `}    
            onClick={() => router.push('/profile')}
        />
    )
}