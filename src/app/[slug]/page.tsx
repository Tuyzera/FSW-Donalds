
// This is a dynamic route that uses the slug parameter from the URL
// to display the restaurant name. The slug is passed as a prop to the component.

//server component
// This component is rendered on the server and can fetch data from a database or API.
// It can also use server-side rendering to improve performance and SEO.
//Can´t use hooks or client-side code here
//Can´t use useState, useEffect, useContext, etc.

import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantsBySlug } from "@/data/getRestaurantsBySlug";

import ConsumptionMethodOption from "./components/conceptionMethodOption";

interface RestaurantPageProps {
    params: Promise<{ slug: string }>;
}


const RestaurantPage = async ({ params }: RestaurantPageProps) => {
    const { slug } = await params;
    const restaurant = await getRestaurantsBySlug(slug);
    if (!restaurant) {
        return notFound();
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
            <div className="flex flex-col items-center gap-2">
                <Image
                    src={restaurant.avatarImageUrl}
                    alt={restaurant.name}
                    width={82}
                    height={82}
                />
                <h1 className="font-semibold">{restaurant.name}</h1>
            </div>
            <div className="pt-24 text-center space-y-2">
                <h3 className="text-2xl font-semibold">Seja bem vindo</h3>
                <p className="opacity-55">Escolha como prefere aproveitar sua refeição. Estamos a oferecer praticidade e sabor em cada detalhe!</p>
            </div>
            <div className="pt-14 grid grid-cols-2 gap-4">
                <ConsumptionMethodOption imageUrl="/Dine_in.png" imageAlt="Para comer aqui" buttonText="Para comer aqui" />
                <ConsumptionMethodOption imageUrl="/Takeaway.png" imageAlt="Para levar" buttonText="Para levar" />
            </div>

        </div>
    );


}
export default RestaurantPage;