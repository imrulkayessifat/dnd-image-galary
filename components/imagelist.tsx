import { memo, useState, forwardRef } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"
import { ImageProps } from '@/type/types'

const ImageList = memo(
    forwardRef<HTMLDivElement, ImageProps>(function ImageFn(props, ref) {
        const { image, overlay, selectedImages, active, insertPosition, attributes, toggleImageSelection, listeners } = props;
        const [isCardHovered, setIsCardHovered] = useState(false);
        const [isChecked, setIsChecked] = useState(false);

        const handleCheckboxClick = (id: string) => {
            setIsChecked(!isChecked);
            if (toggleImageSelection) {
                toggleImageSelection(id);
            }
        };

        return (
            <div
                ref={ref}
                className={clsx(" ", {
                    overlay: overlay,
                    active: active,
                    insertBefore: insertPosition === "before",
                    insertAfter: insertPosition === "after",
                })}
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={() => setIsCardHovered(false)}
                {...attributes}
                {...listeners}
            >
                <Card className="m-0 p-0 hover:backdrop-blur-xl">
                    <CardContent className="m-0 p-0">
                        {(isCardHovered || (selectedImages?.length ?? 0) > 0) && (
                            <Checkbox
                                id={image.id}
                                onClick={() => handleCheckboxClick(image.id)}
                                checked={isChecked}
                                className={`z-10 absolute m-4 `}
                            />
                        )}
                        <Image
                            src={image.src} alt={""}
                            layout='responsive'
                            width={500}
                            height={281}
                            objectFit='cover'
                            className="rounded-md hover:bg-zinc-300"
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }),
);

export default ImageList