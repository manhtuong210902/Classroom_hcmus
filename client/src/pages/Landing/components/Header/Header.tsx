import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@src/components/ui/navigation-menu";
import { Button } from "@src/components/ui/button";
import BookImg from "@image/img_book.png";
import VNImg from "@image/img_vn.png";
import EngImg from "@image/img_en.png";
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "@src/components/ui/navigation-menu";
import React, { useState } from "react";
import { cn } from "@src/utils/lib";
import routes from "@src/configs/router";
import { useTranslation } from "react-i18next";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@src/components/ui/select";

const Header = () => {
    const { t, i18n } = useTranslation();
    const [lag, setLag] = useState("en");
    const components: { title: string; description: string }[] = [
        {
            title: t("class.title_1"),
            description: t("class.description_1"),
        },
        {
            title: t("class.title_2"),
            description: t("class.description_2"),
        },
        {
            title: t("class.title_3"),
            description: t("class.description_3"),
        },
        {
            title: t("class.title_4"),
            description: t("class.description_4"),
        },
        {
            title: t("class.title_5"),
            description: t("class.description_5"),
        },
        {
            title: t("class.title_6"),
            description: t("class.description_6"),
        },
    ];

    const handleSwitchLanguage = (value: string) => {
        setLag(value);
        i18n.changeLanguage(value);
    };

    return (
        <div className="h-[60px] shadow-md">
            <div className="w-full h-full flex items-center justify-between max-w-[1200px] mx-auto px-3 md:px-0">
                <Link to={routes.LANDINGPAGE}>
                    <div className="flex items-center gap-2 md:w-[300px] w-fit">
                        <img src={BookImg} alt="" className="w-8 h-8 md:w-9 md:h-9 object-cover" />
                        <h1 className="font-extrabold text-xl md:text-2xl text-primary">Education</h1>
                    </div>
                </Link>

                <NavigationMenu className="hidden md:block">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link to={routes.HOME}>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    {t("navbar.home")}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to={routes.HOME}>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    {t("navbar.about")}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>{t("navbar.class")}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
                                        <ListItem key={component.title} title={component.title}>
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-3">
                    <Link to={routes.SIGNUP}>
                        <Button>{t("authen.register")}</Button>
                    </Link>
                    <Link to={routes.LOGIN}>
                        <Button variant="outline">{t("authen.login")}</Button>
                    </Link>
                    <Select value={lag} onValueChange={handleSwitchLanguage}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue defaultValue={"en"} placeholder={"English"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{t("language.title")}</SelectLabel>
                                <SelectItem value="en">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={EngImg}
                                            alt=""
                                            className="w-6 h-6 rounded-full overflow-hidden object-cover"
                                        />
                                        {t("language.en")}
                                    </div>
                                </SelectItem>
                                <SelectItem value="vi">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={VNImg}
                                            alt=""
                                            className="w-6 h-6 rounded-full overflow-hidden object-cover"
                                        />
                                        {t("language.vi")}
                                    </div>
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        ref={ref}
                        to={"/"}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                    </Link>
                </NavigationMenuLink>
            </li>
        );
    }
);

export default Header;
