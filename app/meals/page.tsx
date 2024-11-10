import React, { Suspense } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/meals/MealsGrid";
import { getMeals } from "@/lib/Meals";

interface Meals {
    title: string;
    slug: string;
    image: string;
    summary: string;
    instructions: string;
    creator: string;
    creator_email: string;
}

export const metadata = {
    title: "All Meals",
    description: "Browse the dlicios meals shared by our vibrant community",
};

async function Meals() {
    const meals = await getMeals();

    return <MealsGrid meals={meals}></MealsGrid>;
}

const page = () => {
    return (
        <>
            <header className={classes.header}>
                <h1 className="text-[2rem]">
                    Delicious meals, create
                    <span className={classes.highlight}> by you</span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy
                    and fun!
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">Share your favorite Recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense
                    fallback={
                        <p className={classes.loading}>Fetching Meals...</p>
                    }
                >
                    <Meals></Meals>
                </Suspense>
            </main>
        </>
    );
};

export default page;
