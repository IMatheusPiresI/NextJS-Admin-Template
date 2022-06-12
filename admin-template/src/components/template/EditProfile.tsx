import EditImageUser from "./EditImageUser";
import { useEffect, useState } from "react";

interface EditProfileProps {
    images: any[];
    closeEdit: () => void;
    changeImage: (src: string) => void;
}

export default function EditProfile({closeEdit, images, changeImage}: EditProfileProps) {
    const [googleUserPhoto, setGoogleUserPhoto] = useState<string>()

    useEffect(() => {
        if(localStorage.getItem('google-user-photo')){
            setGoogleUserPhoto(localStorage.getItem('google-user-photo')) 
        }
    }, [])

    return (
        <section className="flex gap-5 w-full justify-center flex-wrap my-4">
            {images.map((image) => (
                 <EditImageUser url={image.url} alt={image.alt} src={image.src} closeEdit={closeEdit} changeImage={changeImage} />
            ))}
            {googleUserPhoto ? (
                <EditImageUser googleImage src={googleUserPhoto} url={googleUserPhoto} alt="Imagem Google" closeEdit={closeEdit} changeImage={changeImage}/>
            ): null}
        </section>
    )
}