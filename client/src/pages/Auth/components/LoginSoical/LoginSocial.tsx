import { Button } from "@src/components/ui/button";
import { loginWithGoogle } from "@src/services/auth/apiRequest";
import { Facebook, Mail } from "lucide-react";

const LoginSocial = () => {
    const handleLoginGoogle = () => {
        console.log("Log check login gg");
        loginWithGoogle();
    };

    return (
        <div className="mt-6 text-primary flex flex-col gap-4">
            <Button className="w-full text-base border-[2px]" variant="outline" onClick={handleLoginGoogle}>
                <Mail className="mr-2" size={16} />
                Log in with Google
            </Button>
            <Button className="w-full text-base border-[2px]" variant="outline">
                <Facebook className="mr-2" size={16} />
                Log in with Facebook
            </Button>
        </div>
    );
};

export default LoginSocial;
