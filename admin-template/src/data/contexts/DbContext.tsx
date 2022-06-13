import { createContext, useEffect, useState } from "react";
import { firebaseAppInitialize } from "../firebase/firebase";
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore'
import { useAuthContext } from "../hooks/useAuthContext";
import Cookies from 'js-cookie'

interface DbContextProps {
    addCard: (content: string, title: string, image?: string) => void;
    renderCards: () => void;
    cards: Card[];
}

interface Card {
    content: string;
    image?: string;
    title: string;
    uid: string;
}

export const DbContext = createContext<DbContextProps>({} as DbContextProps);

export function DbContextProvider({children}) {
    const { user } = useAuthContext();
    const [cards, setCards] = useState<Card[]>([]);
    const [render, setRender] = useState(false);
    // init firebase databse
    const db = getFirestore(firebaseAppInitialize());

    async function addCard(
        content: string, 
        title: string, 
        image = 'https://i.pinimg.com/originals/35/87/d5/3587d5888f837503b5af01bb9e47ebfc.jpg'
    ) {
        const uid = await Cookies.get('admin-template-auth')
        const card = await addDoc(collection(db, 'cards'), {
            content: content,
            image: image,
            title: title,
            uid,
        })
        console.log(card)
        setRender(!render);
    }

    async function renderCards() {
        const getCards = await getDocs(collection(db, 'cards'));
        const allCards = getCards.docs.map(card => {
            return  {
                content: card.data().content,
                title: card.data().title,
                uid: user?.uid,
                image: card.data().image,
            }
        })
        setCards([...allCards])
        console.log('renderCard');
    }

    useEffect(() => {
        renderCards();
      }, [render])

    return(
        <DbContext.Provider value={{
            addCard,
            renderCards,
            cards
        }}>
            {children}
        </DbContext.Provider>
    )
}