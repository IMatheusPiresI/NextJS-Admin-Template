import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { firebaseAppInitialize } from "../firebase/firebase";
import Cookies from 'js-cookie'

export interface User {
    email: string;
    displayName: string;
    acessToken: string;
    uid: string;
    photoURL: string;
    providerId?: string;
}

interface AuthContextProps {
    loginWithGoogle: () => void;
    user: User;
    logout: () => void;
    loading: boolean;
    setLoading: (newState: boolean) => void;
    error: string;
    loginWithEmailandPassword: (email: string, password: string) => void
    registeWithEmailAndPassword: (email: string, password: string) => void
    handleChangePhoto: (src: string, confirmedChange: boolean, displayName?: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthContextProvider({children}) {
    const [user, setUser] = useState<User>(null);
    const [error, setError] = useState<string>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    firebaseAppInitialize();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    async function loginWithGoogle() {
        await signInWithPopup(auth, provider)
        .then(async (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const userFirebase = result.user;
          if(userFirebase?.email){
            setUser({
                email: userFirebase.email,
                displayName: userFirebase.displayName,
                acessToken: token,
                uid: userFirebase.uid,
                photoURL: userFirebase.photoURL,
                providerId: userFirebase.providerData[0].providerId
            })
            Cookies.set('admin-template-auth', userFirebase.uid)
            router.push('/');
            if(!localStorage.getItem('google-user-photo') && userFirebase?.photoURL !== null && userFirebase.providerData[0].providerId === 'google.com'){
                localStorage.setItem('google-user-photo', userFirebase.photoURL)
            }
            localStorage.setItem('uid', userFirebase.uid)
            setLoading(false);
          }
        })
        .catch((error) => {
            console.log(error);
        });
      }

      function logout() {
          signOut(auth);
          Cookies.remove('admin-template-auth');
          setUser(null);
      }

      function configSession(user: User) {
          if(user) {
            setUser(user)
            Cookies.set('admin-template-auth', user.uid)
            setLoading(false);
            if(router.pathname === '/authentication') {
                return router.push('/');
            }
          }else {
              router.push('/authentication');
          }
      }

      function openAndcloseErrorMessage(errorMessage: string) {
        setError(errorMessage);
        setTimeout(() => {
            setError(null)
        }, 4000);
      }

      async function loginWithEmailandPassword(email: string, password: string) {
            await signInWithEmailAndPassword(auth, email, password).then((user) => {
                let token = ''
                user.user.getIdToken().then(tokenAcess => token = tokenAcess)
                setUser({
                    email: user.user.email,
                    displayName: user.user.displayName,
                    acessToken: token,
                    uid: user.user.uid,
                    photoURL: user.user.photoURL,
                })
                Cookies.set('admin-template-auth', user.user.uid)
                router.push('/');
            })
            .catch(error => {
                if(error.message === 'Firebase: Error (auth/wrong-password).'){
                    openAndcloseErrorMessage('Senha incorreta.');
                }else if (error.message === 'Firebase: Error (auth/user-not-found).') {
                    openAndcloseErrorMessage('Usuário não encontrado.');
                }else if (error.message === 'Firebase: Error (auth/invalid-email).') {
                    openAndcloseErrorMessage('Não existe conta com esse e-mail.');
                }else {
                    openAndcloseErrorMessage('Ocorreu um erro, tente novamente!');
                }
            })
      }

      async function registeWithEmailAndPassword(email: string, password: string) {
          await createUserWithEmailAndPassword(auth, email, password).then((user) => {
            let token = ''
            user.user.getIdToken().then(tokenAcess => token = tokenAcess)
            configSession({
                email: user.user.email,
                displayName: user.user.displayName,
                acessToken: token,
                uid: user.user.uid,
                photoURL: user.user.photoURL,
            })
            Cookies.set('admin-template-auth', user.user.uid)
        });
      }

    async function handleChangePhoto(src: string, confirmedChange: boolean, displayName?: string,) {
        const userPhoto = {
            email: user.email,
            acessToken: user.acessToken,
            uid: user.uid,
            displayName: displayName ? displayName : user.displayName,
            photoURL: src,
          }
        setUser(userPhoto);
        if(confirmedChange){
            await updateProfile(auth.currentUser, {
                photoURL: src,
                displayName: displayName,
            })
        }
    }
    


      useEffect(() => {
            auth.onIdTokenChanged(async (user) => {
                if(user?.email){
                    let token = '';
                    user.getIdToken().then(resp => token = resp);
                    const userFirebase: User = {
                        email: user.email,
                        displayName: user.displayName,
                        acessToken: token,
                        providerId: user.providerData[0].providerId,
                        photoURL: user.photoURL,
                        uid: user.uid
                    }
                    configSession(userFirebase);
                }else {
                    router.push('/authentication')
                }
            })
      },[]);

    return (
        <AuthContext.Provider value={{
            loginWithGoogle,
            user,
            logout,
            loading,
            error,
            loginWithEmailandPassword,
            registeWithEmailAndPassword,
            handleChangePhoto,
            setLoading,
        }}>
            {children}
        </AuthContext.Provider>
    )
}