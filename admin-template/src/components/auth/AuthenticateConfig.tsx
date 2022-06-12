import { useAuthContext } from "../../data/hooks/useAuthContext";
import loadingGif from '../../../public/images/loading.gif';
import Image from "next/image";
import { useRouter } from "next/router";

export default function AuthenticateConfig({children}) {
    const router = useRouter();
    const { user, loading } = useAuthContext();

    function renderPage() {
        return (
            <>
                {children}
            </>
        )
    }

    function renderLoading() {
        return(
            <div className="flex h-screen items-center justify-center">
                <Image src={loadingGif} alt="Carregando..."/>
            </div>
        )
    }

    if (user?.email && !loading){
        return renderPage();
    } else if (loading) {
        return renderLoading();
    } else {
        router.push('/authentication');
        return null;
    }
}