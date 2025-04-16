'use client';


import { Restaurant } from "@prisma/client";
import { Pick } from "@prisma/client/runtime/library";
import { ChevronsLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
    restaurant: Pick<Restaurant, 'coverImageUrl' | 'name'>;
}


const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
    const router = useRouter();
    const handleBackClick = () => {
        router.back();
    }
    return (
        <div className="relative h-[250px] w-full">
            <Button variant="secondary" size="icon" className="absolute top-4 left-4 z-10 rounded-full" onClick={handleBackClick}>
                <ChevronsLeftIcon />
            </Button>
            <Button variant="secondary" size="icon" className="absolute top-4 right-4 z-10 rounded-full">
                <ScrollTextIcon />
            </Button>
            <Image src={restaurant?.coverImageUrl} fill alt={restaurant.name} className="object-cover" />
        </div >
    );
}

export default RestaurantHeader;