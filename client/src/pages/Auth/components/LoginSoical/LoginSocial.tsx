import { Button } from "@src/components/ui/button";
import { AUTH_FACEBOOK, AUTH_GOOGLE } from "@src/services/auth/api";
import { Facebook, Mail } from "lucide-react";

const LoginSocial = () => {
    const loginWithGoogle = () => {
        window.open(AUTH_GOOGLE, "_self");
    };

    const loginWithFacebook = () => {
        window.open(AUTH_FACEBOOK, "_self");
    };

    return (
        <div className="mt-6 text-primary flex flex-col gap-4">
            <Button className="w-full text-base border-[2px]" variant="outline" onClick={loginWithGoogle}>
                <Mail className="mr-2" size={16} />
                Log in with Google
            </Button>
            <Button className="w-full text-base border-[2px]" variant="outline" onClick={loginWithFacebook}>
                <Facebook className="mr-2" size={16} />
                Log in with Facebook
            </Button>
        </div>
    );
};

export default LoginSocial;
