import React from "react";
import classes from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/Meals";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    };
    searchParams: null;
}
export async function generateMetadata(props: Props) {
    const meal = getMeal(props.params.slug);
    if (!meal) {
        notFound();
    }
    return {
        title: meal.title,
        description: meal.summary,
    };
}
const page = (props: Props) => {
    // 모든 page.* 파일들은 params prop을 받는다.
    const slug = props.params.slug;
    const meal = getMeal(slug);
    if (!meal) notFound();

    meal.instructions = meal.instructions.replace(/\n/g, "<br/>");
    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image alt={meal.title} src={meal.image} fill></Image>
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by&nbsp;
                        <a href={`mailto:${meal.creator_email}`}>
                            {meal.creator}
                        </a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p
                    className={classes.instructions}
                    dangerouslySetInnerHTML={{ __html: meal.instructions }}
                ></p>
            </main>
        </>
    );
};

export default page;
