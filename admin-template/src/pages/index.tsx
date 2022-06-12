import { FormEvent, useEffect, useState } from "react";
import Layout from "../components/template/Layout";
import { useDbContext } from "../data/hooks/useDbContext";

export default function Home() {
  const { renderCards, cards, addCard } = useDbContext();
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  function handleCreateCard(e: FormEvent) {
    e.preventDefault();
    if(image !== '' || image.length > 10){
      addCard(content, title, image);
    }else {
      addCard(content, title);
    }
  }

  useEffect(() => {
    renderCards()
  }, [addCard])
  return (
        <Layout
          title="Página Inicial"
          subtitle="Essa é página principal do Projeto"
        >
          <section>
              <form onSubmit={handleCreateCard}>
                  <div>
                    <label htmlFor="">conteudo</label>
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)}/>
                  </div>
                  <div>
                    <label htmlFor="">titulo</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                  </div>
                  <div>
                    <label htmlFor="">image</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
                  </div>
                  <button type="submit">Enviar</button>
              </form>

              {cards.map(card => (
                  <div key={card.uid} className={'bg-slate-600 my-5'}>
                    <h4>{card.title}</h4>
                    <img src={card.image} alt="" className="w-24 h-34"/>
                    <p>{card.content}</p>
                  </div>
                ))}
          </section>
        </Layout>
  )
}
