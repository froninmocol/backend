'use client'

import axios from "axios";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import PropertyForm from "../components/PropertyForm";
import { propertyFormSchema } from "../data/schema";


type PropertyFormValues = z.infer<typeof propertyFormSchema>

const defaultValues: Partial<PropertyFormValues> = {
    roomCount: 0,
    bathroomCount: 0,
    parking: 0,
    floor: 0,
    area: 0,
    stratum: 0,
    imageMultipleSrc : [],
    locationValue: [6.2442034, -75.5812115]
}

export function CreateForm () {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<Array<string> | undefined>([]);
    const Router = useRouter();

    function onSubmit(data: PropertyFormValues) {
        setIsLoading(true);

        axios.post('/api/listings', data)
            .then(() => {
                toast({
                    title: "Listing Created!",
                })
                Router.push('/dashboard/properties')
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                })
                //Router.push('/dashboard/properties')
            }).finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <PropertyForm 
            propertyFormValues={defaultValues}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isEdit={false}
            images={images ?? []}
            setImages={setImages}
        />
    );
}