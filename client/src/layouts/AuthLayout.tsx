type Props = {
    children: JSX.Element;
};

const DefaultAuth = () => {
    return <div className="lg:flex flex-col py-4 px-4 lg:px-16 xl:px-24 hidden bg-accent">
        <div className="font-semibold text-5xl text-[#939cac]">
            Classroom
        </div>
        <div className="mt-8 text-[#262626] xl:text-6xl md:text-5xl">
            Get started with<br /> Classroom
        </div>
    </div>
}

const AuthLayout = ({ children }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-screen h-screen overflow-hidden">
            <DefaultAuth />
            {children}
        </div>
    );
};

export default AuthLayout;