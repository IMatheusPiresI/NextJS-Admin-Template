import Head from "next/head";
import { useEffect, useState } from "react";
import { iconClose, iconPencil } from "../components/icons/icons";
import EditProfile from "../components/template/EditProfile";
import Layout from "../components/template/Layout";
import { useAuthContext } from "../data/hooks/useAuthContext";
import { imagesUser } from "../data/mooks/imageUser";

export default function Profile() {
  const { user, handleChangePhoto } = useAuthContext();
  const [newDisplayName, setNewDisplayName] = useState<string>('');
  const [editProfile, setEditeProdile] = useState<boolean>(false);

  function renderUserPhoto() {
    return user?.photoURL ? user.photoURL : 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png'
  }

  function handleOpenCloseEdit() {
    setNewDisplayName('');
    setEditeProdile(!editProfile)
  }

  async function handleChageUserPhoto(src: string, editProfile = false, displayName?: string) {
    handleChangePhoto(src, editProfile, displayName);
  }

  async function handleConfirmedChangeProfile() {
    if(newDisplayName.trim() !== user?.displayName && newDisplayName.trim() !== ''){
      await handleChageUserPhoto(user.photoURL, true, newDisplayName.trim());
      handleOpenCloseEdit();
    }else {
      await handleChageUserPhoto(user.photoURL, true);
      handleOpenCloseEdit();
    }  
  }

  return (
    <>  
        <Head>
            <meta name="description" content="Perfil do usuário, onde podem ser encontradas as informações do usuário."/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Meu Perfil</title>
        </Head>
    
        <Layout
          title="Perfil do usuário"
          subtitle="Aqui você poderá conferir suas informações"
        >
          <section className="flex flex-col items-center w-full h-full text-center pt-16">
            
              <h3 className="text-xl sm:text-2xl md:text-4xl text-center font-bold break-words w-full">
                {editProfile ? 'Altere sua foto' : user?.displayName ? `Seja bem vindo ${user.displayName}!` : "Seja bem vindo!"}
              </h3>
              
              <div className="relative">
                <img 
                  src={renderUserPhoto()}
                  alt="Foto usuário" 
                  className={`
                    sm:w-60 sm:h-60 w-44 h-44 rounded-full border-2 border-solid border-blue-800
                    dark:border-white
                    my-10
                  `}  
                />
                <div className="
                absolute 
                bottom-10 right-0 border border-solid border-gray-500 
                cursor-pointer rounded-lg 
                bg-gray-400
                "
                onClick={handleOpenCloseEdit}
                >
                  {editProfile ? iconClose('w-10 h-10 text-gray-200') : iconPencil('w-10 h-10 text-gray-200')}
                </div>
              </div>
              <div className="w-full">
                <p className="text-left sm:text-center text-lg md:text-2xl font-bold text-zinc-700 dark:text-white break-words mb-2">
                  Nome: {editProfile ? (
                    <input 
                      type="text"
                      value={newDisplayName}
                      onChange={(e) => setNewDisplayName(e.target.value)}
                      placeholder="Digite seu Nome"
                      max={30}
                      className="
                      px-5 py-1
                      focus:outline-none
                      placeholder: text-sm
                      border border-blue-500 rounded-lg
                      dark:bg-gray-600
                      "
                      />
                  ) : user?.displayName ? user.displayName : 'Atualize seu nome e foto clicando no lápis.'}
                </p>
                <p className="text-left sm:text-center text-sm md:text-2xl font-bold text-zinc-700 dark:text-white">
                  Email: {user?.email}
                </p>
              </div>
              {editProfile && (
               <>
                <EditProfile closeEdit={handleOpenCloseEdit} images={imagesUser} changeImage={handleChageUserPhoto}/>
                <button className="bg-slate-500 text-white py-3 px-6 mt-4" onClick={handleConfirmedChangeProfile}>
                    Confirmar
                </button>
               </>
              )}
              
          </section>
          
        </Layout>
    </>
  )
}
