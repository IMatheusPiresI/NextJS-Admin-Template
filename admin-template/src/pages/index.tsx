import { useState } from "react";
import CardTopic from "../components/topics/Card";
import FormTopic from "../components/topics/FormTopic";
import GreetingNewTopic from "../components/topics/GreetingNewTopic";
import Layout from "../components/template/Layout";
import { useDbContext } from "../data/hooks/useDbContext";
import SucessMessage from "../components/topics/SucessMessage";
import PaginationCards from "../components/template/PaginationCards";
import Head from "next/head";

export default function Home() {
  const { cards } = useDbContext();
  const [newTopic, setNewTopic] = useState<boolean>(false);
  const [sucessMessage, setSucessMessage] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  
  const itemsPerPage = 10;
  const pages = Math.ceil(cards.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = cards.slice(startIndex, endIndex);

  return (
      <>
        <Head>
            <meta name="description" content="Vizualize os tópicos criados pela comunidade"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Tópicos criados: {cards.length}</title>
        </Head>
        <Layout
          title="Deixe sua Marca"
          subtitle="Crie um tópico e deixe sua marca no projeto"
        >
          <section className="h-full">
            <section className="mb-8">
              {sucessMessage ? (
                <SucessMessage setSucessMessage={setSucessMessage}/>
              ): (
                newTopic ? <FormTopic setSucessMessage={setSucessMessage}/>: <GreetingNewTopic newTopic={setNewTopic}/>
              )}
              
            </section>
              <section className="flex flex-wrap gap-5 w-full justify-around mb-16">
                {currentItems.map((card, index) => (
                    <CardTopic key={index} title={card.title} image={card.image} content={card.content} id={card.id} uid={card.uid}/>
                ))}
              </section>

              {
                pages > 1 && <PaginationCards allPages={pages}  setCurrentPage={setCurrentPage} currentPage={currentPage}/>
              }
          </section>
        </Layout>
      </>
  )
}
