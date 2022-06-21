import Head from "next/head";
import { iconBlock } from "../components/icons/icons";
import Layout from "../components/template/Layout";

export default function NotFound() {
    return(
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content="Página não encontrada, status 404."/>
                <title>404</title> 
            </Head>
            <Layout 
                title="Página não encontrada"
                subtitle="Retorne pelo menu de navegação"
            >
                <section className="flex items-center justify-center h-full">
                    <div className="border max-w-md border-solid border-gray-700 dark:border-gray-200  py-10 px-4 rounded-xl">
                        <h3 className="text-center text-3xl font-extrabold text-red-800">Acesso Bloqueado!</h3>
                        {iconBlock('text-red-600')}
                        <h4 className="text-justify font-bold text-red-500">
                            Você não pode acessar essa página... Mentira, ela só não existe mesmo, retorne ao site clicando nos ícones do menu lateral.
                        </h4>
                    </div>
                </section>
            </Layout>
        </>
    )
}