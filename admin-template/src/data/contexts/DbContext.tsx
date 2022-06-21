import { createContext, useEffect, useState } from "react";
import { firebaseAppInitialize } from "../firebase/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore'
import Cookies from 'js-cookie'
import { useRouter } from "next/router";
import { userInfo } from "os";
import { useAuthContext } from "../hooks/useAuthContext";

interface DbContextProps {
    addCard: (content: string, title: string, image?: string) => void;
    renderCards: () => void;
    cards: Card[];
    deleteCards: (id: string) => void;
    updateCard: (id: string, title: string, image: string, content: string) => void;
    getTopic: (id: string) => void;
    topic: Card;
}

export interface Card {
    id: string;
    content: string;
    image?: string;
    title: string;
    uid: string;
}

export const DbContext = createContext<DbContextProps>({} as DbContextProps);
export function DbContextProvider({children}) {

    const router = useRouter();
    const [cards, setCards] = useState<Card[]>([]);
    const [topic, setTopic] = useState<Card>();
    const [render, setRender] = useState(false);

    // init firebase database
    const db = getFirestore(firebaseAppInitialize());

    async function addCard(
        content: string, 
        title: string, 
        image = 'https://i.pinimg.com/originals/35/87/d5/3587d5888f837503b5af01bb9e47ebfc.jpg'
    ) {
        const uid = await Cookies.get('admin-template-auth')
        await addDoc(collection(db, 'cards'), {
            content: content,
            image: image,
            title: title,
            date: new Date().getTime(),
            uid,
        })
        setRender(!render);
    }

    async function renderCards(){
        const getCards = await getDocs(collection(db, 'cards'));
        const allCards = getCards.docs.map(card => {
            return  {
                id: card.id,
                title: card.data().title,
                content: card.data().content,
                image: card.data().image,
                date: card.data().date,
                uid: card.data().uid,
            }
        })
        allCards.sort((a, b) => a.date - b.date).reverse()
        setCards(allCards)
    }

    async function deleteCards(id: string) {
        const cardDoc = doc(db, 'cards', id);
        const newCards = cards.filter(card => card.id !== id);
        setCards(newCards);
        await deleteDoc(cardDoc);
    }

    async function updateCard(id: string, title: string, image: string, content: string) {
        const uid = await Cookies.get('admin-template-auth')
        const indexOfCardUpdated = cards.findIndex(card => card.id === id)
        const allCards = cards;
        allCards[indexOfCardUpdated] = {
            id,
            content,
            title,
            image,
            uid
        }
        setCards([...allCards]);
        const cardDoc = doc(db, 'cards', id)
        await setDoc(cardDoc, {
            id,
            content,
            title,
            image,
            uid
        })
    }

    async function getTopic(id:string) {
        const topicRef = doc(db, 'cards', id);
        await getDoc(topicRef)
        .then(card => {
            setTopic({
                id,
                title: card.data().title,
                image: card.data().image,
                content: card.data().content,
                uid: card.data().uid
            });
        }).catch(() => {
            router.push('/404')
        });

        return topic
    }

    useEffect(() => {
        renderCards();
      }, [render])

    return(
        <DbContext.Provider value={{
            addCard,
            renderCards,
            cards,
            deleteCards,
            updateCard,
            getTopic,
            topic
        }}>
            {children}
        </DbContext.Provider>
    )
}