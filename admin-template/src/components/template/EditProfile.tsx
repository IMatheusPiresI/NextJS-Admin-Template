import EditImageUser from "./EditImageUser";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../data/hooks/useAuthContext";

interface EditProfileProps {
    images: any[];
    closeEdit: () => void;
    changeImage: (src: string) => void;
}

export default function EditProfile({closeEdit, images, changeImage}: EditProfileProps) {
    const [googleUserPhoto, setGoogleUserPhoto] = useState<string>('');
    const { user } = useAuthContext();

    useEffect(() => {
        async function getImage() {
            if(localStorage.getItem('google-user-photo') && user?.providerId === 'google.com'){
                setGoogleUserPhoto(localStorage.getItem('google-user-photo')) 
            }
        }
        getImage()
    }, [])

    return (
        <section className="flex gap-5 w-full justify-center flex-wrap my-4">
            {images.map((image, index) => (
                 <EditImageUser key={index} url={image.url} alt={image.alt} src={image.src} closeEdit={closeEdit} changeImage={changeImage} />
            ))}
            {googleUserPhoto ? (
                <EditImageUser googleImage src={googleUserPhoto} url={googleUserPhoto} alt="Imagem Google" closeEdit={closeEdit} changeImage={changeImage}/>
            ): null}
        </section>
    )
}