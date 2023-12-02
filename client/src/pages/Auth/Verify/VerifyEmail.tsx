import { Button } from "@src/components/ui/button";
import routes from "@src/configs/router";
import { verifyEmail } from "@src/services/auth/apiRequest";
import { CheckCircle2Icon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");
    const user_id = searchParams.get("user_id");
    const email = searchParams.get("email");

    useEffect(() => {
        verifyEmail({ token, user_id, email }).then((res) => {
            if (res?.error) {
                toast.error(res.message);
                return;
            }
        });
    }, []);

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="rounded flex flex-col items-center gap-4 max-w-[400px]">
                <h1 className="text-xl font-semibold">You are all set</h1>
                <CheckCircle2Icon className="w-10 h-10" />
                <Button
                    className="w-full"
                    onClick={() => {
                        navigate(routes.LOGIN);
                    }}
                >
                    Log in
                </Button>
            </div>
        </div>
    );
};

export default VerifyEmail;
