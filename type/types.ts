export type SortableImage = {
    id: string;
    src: string;
};

export type ImageProps = {
    image: SortableImage;
    overlay?: boolean;
    active?: boolean;
    insertPosition?: "before" | "after";
    imageInRow1Col1Id?:string;
    attributes?: Partial<React.HTMLAttributes<HTMLDivElement>>;
    listeners?: Partial<React.HTMLAttributes<HTMLDivElement>>;
    toggleImageSelection?: (id: string) => void;
    selectedImages?: string[];
};
