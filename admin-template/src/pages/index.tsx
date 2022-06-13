import { useState } from "react";
import Card from "../components/topics/Card";
import FormTopic from "../components/topics/FormTopic";
import GreetingNewTopic from "../components/topics/GreetingNewTopic";
import Layout from "../components/template/Layout";
import { useDbContext } from "../data/hooks/useDbContext";
import SucessMessage from "../components/topics/SucessMessage";

export default function Home() {
  const { cards } = useDbContext();
  const [newTopic, setNewTopic] = useState<boolean>(false);
  const [sucessMessage, setSucessMessage] = useState<boolean>(false);

  return (
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
              <section className="flex flex-wrap w-full justify-around">
                {cards.map((card, index) => (
                    <Card key={index} title={card.title} image={card.image} content={card.content}/>
                ))}
              </section>
          </section>
        </Layout>
  )
}
