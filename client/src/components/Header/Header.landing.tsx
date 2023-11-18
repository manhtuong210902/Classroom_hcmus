import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@src/components/ui/navigation-menu";
import { Button } from "../ui/button";
import BookImg from "@image/img_book.png";
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import React from "react";
import { cn } from "@src/utils/lib";

const HeaderLanding = () => {
    const components: { title: string; description: string }[] = [
        {
            title: "Mathematics",
            description: "Explore the world of numbers, equations, and mathematical concepts.",
        },
        {
            title: "Science",
            description: "Discover the wonders of the natural world through scientific exploration.",
        },
        {
            title: "History",
            description: "Uncover the events and stories that shaped our past and influence our present.",
        },
        {
            title: "Literature",
            description: "Dive into the world of books, poems, and literary masterpieces.",
        },
        {
            title: "Art",
            description: "Express your creativity and learn about different art forms and techniques.",
        },
        {
            title: "Music",
            description: "Discover the power of music and learn to appreciate various genres and instruments.",
        },
    ];

    return (
        <div className="h-[60px] shadow-md">
            <div className="w-full h-full flex items-center justify-between max-w-[1200px] mx-auto">
                <div className="flex items-center gap-2">
                    <img src={BookImg} alt="" className="w-9 h-9 object-cover" />
                    <h1 className="font-extrabold text-2xl text-primary">Education</h1>
                </div>

                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link to={"/home"}>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to={"/home"}>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    About us
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Class</NavigationMenuTrigger>
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
                    <Button>Sign Up</Button>
                    <Button variant="outline">Log In</Button>
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

export default HeaderLanding;
