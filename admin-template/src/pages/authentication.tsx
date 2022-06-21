// https://source.unsplash.com/random

import { Html } from "next/document";
import Head from "next/head";
import { FormEvent, useState } from "react";
import AuthErrorMessage from "../components/auth/AuthErrorMessage";
import AuthInput from "../components/auth/AuthInput";
import { iconGoogle } from "../components/icons/icons";
import { useAuthContext } from "../data/hooks/useAuthContext";

export default function Authentication() {
    const { error, loginWithGoogle, loginWithEmailandPassword, registeWithEmailAndPassword } = useAuthContext();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [ loginOrRegister, setLoginAndRegister] = useState<'login' | 'register'>('login');

    function handleLoginWithGoogle(e: FormEvent) {
        e.preventDefault();
        loginWithGoogle();
    }

    function handleChangeLoginOrRegiter() {
        setLoginAndRegister(loginOrRegister === 'login' ? 'register' : 'login');
    }

    function handleLoginOrRegister(e: FormEvent) {
        e.preventDefault();
        if(loginOrRegister === 'login'){
            loginWithEmailandPassword(email, password)
        }else {
            registeWithEmailAndPassword(email,password);
        }
    }

    return (
        <>

            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content="Realize o cadastro e acesso a plataforma de tópicos criados e gerenciados pelos própios usuários"/>
                <title>Autenticação</title> 
            </Head>
            
            <main className={`
                flex
                bg-gray-600 h-full
            `}>
                <section className="min-h-full w-0 lg:w-2/3 md:w-2/4 sm:w-0">
                    <img 
                        src="https://source.unsplash.com/random" 
                        alt="imagem da página de autenticação" 
                        className="min-h-full w-0 lg:w-2/3 md:w-2/4 sm:w-0 object-cover fixed object-center"
                    />
                </section>
                <section className="flex w-full min-h-screen flex-col lg:w-1/3 md:w-2/4 sm:w-full justify-center items-center bg-white py-7">
                    <form className="flex flex-col w-10/12" onSubmit={handleLoginOrRegister}>

                        {error ? <AuthErrorMessage errorMessage={error}/> : null}

                        <h1 className="text-3xl font-bold">
                            {loginOrRegister === 'login'? 'Entre com Sua Conta' : 'Cadastre-se na Plataforma'}
                        </h1>
                        <div className="flex flex-col my-5">
                            <AuthInput
                                id="email"
                                title="Email"
                                type="email"
                                onChange={setEmail}
                                value={email}
                                required
                            />
                            <AuthInput
                                id="password"
                                title="Senha"
                                type="password"
                                onChange={setPassword}
                                value={password}
                                required
                            />
                            <button type="submit" className={`
                                w-full bg-blue-600 text-white
                                p-2 rounded-lg
                            `}
                            >{loginOrRegister === 'login' ? 'Entrar' : 'Cadastrar'}</button>
                        </div>
                        <hr />
                        {loginOrRegister === 'login' ? (
                            <button className={`
                                flex gap-2 justify-center
                                w-full bg-red-500 text-white
                                p-2 rounded-lg
                                mt-5
                            `}
                            onClick={(e) => handleLoginWithGoogle(e)}
                            >{iconGoogle('h-6 w-6 text-white')}Entrar com o Google</button>
                        ) : null}

                        <a className="w-full text-center my-4 text-blue-500" onClick={handleChangeLoginOrRegiter}>
                            {loginOrRegister === 'login' ? 'Não possui conta? Cadastre-se gratuitamente!' : 'Entre com suas credenciais'}
                        </a>
                    </form>
                </section>
            </main>    
        </>
    )
}