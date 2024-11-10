import React from "react";
import classes from "./MealsGrid.module.css";
import MealItem from "./MealItem";

interface Meals {
    id: number;
    title: string;
    slug: string;
    image: string;
    summary: string;
    instructions: string;
    creator: string;
    creator_email: string;
}
interface MealsGridProps {
    meals: Meals[];
}

const MealsGrid = ({ meals }: MealsGridProps) => {
    return (
        <ul className={classes.meals}>
            {meals.map((meal: Meals) => {
                return (
                    <li key={meal.id}>
                        <MealItem {...meal}></MealItem>
                    </li>
                );
            })}
        </ul>
    );
};

export default MealsGrid;
