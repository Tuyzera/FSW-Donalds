import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface restaurantMenuPageProps {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ consumptionMethod: string }>
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}


const RestaurantMenuPage = async ({ params, searchParams }: restaurantMenuPageProps) => {
    const { slug } = await params;
    const { consumptionMethod } = await searchParams;

    if (!isConsumptionMethodValid(consumptionMethod)) {
        return notFound();
    }
    const restaurant = await db.restaurant.findUnique({
        where: {
            slug: slug,
        },
        include: {
            menuCategories: {
                include: {
                    products: true
                }
            }
        }
    })
    console.log(restaurant)
    if (!restaurant) {
        return notFound();
    }
    return (
        <div>
            <RestaurantHeader restaurant={restaurant} />
            <RestaurantCategories restaurant={restaurant} />
        </div>
    );
}

export default RestaurantMenuPage;