import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/template/Layout";
import { useDbContext } from "../../../data/hooks/useDbContext";

export default function TopicView() {
    const [title, setTitle] = useState('');
    const { getTopic, topic} = useDbContext();
    const router = useRouter();

    useEffect(() => {
        if(router.query?.id !== undefined) {
            const id = router.query.id.toString();
            setTitle(router.query.title.toString());
            getTopic(id)
        }
    }, [router.query?.id])
    return(
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content="Realize o cadastro e acesso a plataforma de tópicos criados e gerenciados pelos própios usuários"/>
                <title>{title}</title> 
            </Head>
            <Layout
                title={'Leitura de tópico'}
                subtitle="Realize a leitura deste tópico."
            >
                <section className="relative flex justify-center">
                    <div className="max-w-full my-16 h-auto lg:w-3/4 border border-solid border-black break-words rounded-lg overflow-hidden shadow-xl">
                        <div className="w-full object-cover object-center o max-h-80">
                            <img 
                                src={topic?.image} 
                                alt="imagem tópico" 
                                className="w-full object-cover object-center max-h-80"
                            />
                        </div>
                        <div className="py-8 px-3 text-center dark:bg-black/40">
                            <h3 className="text-3xl mb-7 drop-shadow-xl">{topic?.title}</h3>
                            <p className="text-justify">{topic?.content}</p>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}