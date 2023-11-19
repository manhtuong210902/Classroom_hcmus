import img_auth from '../assets/imgs/img_auth.png';

type Props = {
    children?: JSX.Element;
};

const DefaultAuth = () => {
    return <div className="lg:flex flex-col py-4 px-4 lg:px-16 xl:px-24 hidden bg-accent">
        <div className="font-semibold text-5xl text-[#939cac]">
            Classroom
        </div>
        <div className="mt-8 text-[#262626] xl:text-6xl md:text-5xl">
            Get started with<br /> Classroom
        </div>
        <div className="text-[#595959] text-xl mt-8">
            Smart Classroom Management System
        </div>
        <div className="mt-8 h-200px flex mx-auto">
            <div>
                <img className="w-[400px] h-auto" src={img_auth} />
            </div>
        </div>
    </div>
}

const AuthLayout = ({ children }: Props) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 w-screen h-screen overflow-x-hidden">
            <DefaultAuth />
            {children}
        </div>
    );
};

export default AuthLayout;