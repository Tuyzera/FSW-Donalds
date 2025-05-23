'use client';

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Products from "./products";

interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: {
            menuCategories: {
                include: {
                    products: true
                }
            }
        };
    }>
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
    include: {
        products: true
    }
}>


const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = React.useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);

    const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
        setSelectedCategory(category);
    }

    const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
        if (category.id === selectedCategory.id) {
            return "default";
        }
        return "secondary";
    }

    return (
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-white shadow-md p-5">
            <div className="p-5">
                <div className="flex items-center gap-3 ">
                    <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={45} height={45} />
                    <div>
                        <h2 className="font-semibold text-lg">{restaurant.name}</h2>
                        <p className="text-xs opacity-55">{restaurant.description}</p>
                    </div>

                </div>
                <div className="flex items-center gap-1 text-xs text-green-500 mt-3">
                    <ClockIcon size={12} />
                    <p>Aberto</p>
                </div>
            </div>

            <ScrollArea className="w-full ">
                <div className="flex w-max space-x-3 pt-0 mt-3">
                    {restaurant.menuCategories.map(category => (
                        <Button key={category.id} variant={getCategoryButtonVariant(category)} size="sm" className="rounded-full" onClick={() => handleCategoryClick(category)}>
                            {category.name}
                        </Button>
                    ))}
                </div>

                <ScrollBar orientation="horizontal">

                </ScrollBar>
            </ScrollArea>
            <Products products={selectedCategory.products} />
        </div>
    );
}

export default RestaurantCategories;