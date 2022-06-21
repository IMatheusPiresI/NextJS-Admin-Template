import Layout from "../components/template/Layout";
import { useDbContext } from "../data/hooks/useDbContext";
import Cookies from 'js-cookie'
import Card from "../components/topics/Card";
import { useState } from "react";
import PaginationCards from "../components/template/PaginationCards";
import NoTopics from "../components/topics/NoTopics";
import Head from "next/head";

export default function Notifications() {
  const { cards } = useDbContext()
  const uidCurrentUser = Cookies.get('admin-template-auth')
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;
  const pages = Math.ceil(cards.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = cards.slice(startIndex, endIndex);
  const itemsFiltered = currentItems.filter(card => card.uid === uidCurrentUser)

  return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content="Realize o cadastro e acesso a plataforma de tópicos criados e gerenciados pelos própios usuários"/>
                <title>Meus tópicos</title> 
            </Head>

          <Layout
            title="Meus Tópicos"
            subtitle="Aqui você poderá ler, editar ou excluir seus tópicos"
          >
            <section className="mt-10  gap-5 flex flex-wrap justify-around">
              {itemsFiltered.length > 0 ? (
                itemsFiltered.map(card => {
                  return(
                    <Card 
                      key={card.id}
                      id={card.id}
                      title={card.title}
                      image={card.image}
                      content={card.content}
                      uid={card.uid}
                    />
                  )
              })
              ) : (
                <>
                  <NoTopics/>
                </>
              )}
            </section>
            {
              pages > 1 && <PaginationCards allPages={pages}  setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            }
          </Layout>
        </>
  )
}
