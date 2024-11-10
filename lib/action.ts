"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./Meals";
import { revalidatePath } from "next/cache";

const isInvalidText = (text: FormDataEntryValue | null) => {
    return !text || String(text).trim() === "";
};

interface Meal {
    title: string | FormDataEntryValue | null;
    summary: string | FormDataEntryValue | null;
    instructions: string | FormDataEntryValue | null;
    image: FormDataEntryValue | null;
    creator: FormDataEntryValue | null;
    creator_email: FormDataEntryValue | null;
}

// prevState는 useFormState에서 설정한 초기 값이거나 이전에 생성된 응답
export const shareMeal = async (
    prevState: { message: string },
    formData: FormData
): Promise<{ message: string }> => {
    const meal: Meal = {
        title: formData.get("title"),
        summary: formData.get("summary"),
        instructions: formData.get("instructions"),
        image: formData.get("image"),
        creator: formData.get("name"),
        creator_email: formData.get("email"),
    };

    // 유효성 검사
    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.image) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email)
    ) {
        return { message: "Invalid Input" };
    }

    await saveMeal(meal);
    revalidatePath("/meals", "layout");
    redirect("/meals");
};
