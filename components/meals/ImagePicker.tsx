"use client";
import React, { useRef, useState } from "react";
import classes from "./ImagePicker.module.css";
import Image from "next/image";

const ImagePicker = ({ name }: { label: string; name: string }) => {
    const [pickedImage, setPickedImage] = useState<string | null>(null);
    const imageInput = useRef<HTMLInputElement | null>(null);

    const handlePickClick = () => {
        imageInput.current?.click();
    };
    // input의 이벤트에 변화가 있을때마다
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            setPickedImage(null);
            return;
        }

        const file = e.target.files[0];

        const fileReader = new FileReader();
        // 딱히 반환값이 없음
        fileReader.onload = () => {
            setPickedImage(fileReader.result as string);
        };
        //
        fileReader.readAsDataURL(file);
    };

    return (
        <div className={classes.picker}>
            <label htmlFor={name}></label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && (
                        <Image
                            src={pickedImage}
                            alt="The Image selected by the user"
                            fill
                        ></Image>
                    )}
                </div>
                <input
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/png,image/jpeg"
                    name={name}
                    ref={imageInput}
                    multiple
                    onChange={handleImageChange}
                    required
                />
                {/* 밑의 버튼을 클릭하여 위의 input이 작동하게 */}
                <button
                    className={classes.button}
                    type="button"
                    onClick={handlePickClick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );
};

export default ImagePicker;
