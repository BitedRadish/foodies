import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
    // run은 데이터를 넣거나 변경을 할 때 사용 (INSERT , UPDATE)
    // all은 데이터를 가져올 때 사용
    // better-squlite는 promise 사용 X
    await new Promise((res) => setTimeout(res, 1000));
    return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
    // ? 표를 붙이는 이유는 injection 공격에 취약하지 않게 하기 위햐여
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    // 실제로는 promise를 반환
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) throw new Error("Saving image failed");
    });

    meal.image = `/images/${fileName}`;

    db.prepare(
        `INSERT INTO meals (title,summary,instructions,creator,creator_email,image,slug)
        VALUES (@title,@summary,@instructions,@creator,@creator_email,@image,@slug)`
    ).run(meal);
}
