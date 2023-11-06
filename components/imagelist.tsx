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
        const { image, overlay, selectedImages, active, imageInRow1Col1Id, insertPosition, attributes, toggleImageSelection, listeners } = props;
        const [isCardHovered, setIsCardHovered] = useState(false);
        const [isChecked, setIsChecked] = useState(false);

        const handleCheckboxClick = (id: string) => {
            setIsChecked(!isChecked);
            if (toggleImageSelection) {
                toggleImageSelection(id);
            }
        };

        const isRowSpan2 = image.id === imageInRow1Col1Id;

        return (
            <div
                ref={ref}
                className={clsx(" ", {
                    overlay: overlay,
                    active: active,
                    insertBefore: insertPosition === "before",
                    insertAfter: insertPosition === "after",
                    'grayscale contrast-50': isRowSpan2,
                })}
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={() => setIsCardHovered(false)}
                {...attributes}
                {...listeners}
            >
                <Card className="m-0 p-0 max-w-[300px] max-h-[300px]">
                    <CardContent className="m-0 p-0">
                        {(isCardHovered || (selectedImages?.length ?? 0) > 0) && (
                            <Checkbox
                                id={image.id}
                                onClick={() => handleCheckboxClick(image.id)}
                                checked={isChecked}
                                className={`z-10 absolute m-4  `}
                            />
                        )}
                        <Image
                            src={image.src} alt={""}
                            layout='responsive'
                            width={500}
                            height={281}
                            objectFit='cover'
                            className="rounded-md hover:brightness-50"
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }),
);

export default ImageList