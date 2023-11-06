import { useSortable } from '@dnd-kit/sortable';

import ImageList from '@/components/imagelist';
import { SortableImage } from '@/type/types';

interface SortableProps {
    image: SortableImage;
    selectedImages: string[];
    activeIndex?: number;
    toggleImageSelection: (id: string) => void
}

const SortableImageComponent: React.FC<SortableProps> = ({
    image, selectedImages, activeIndex, toggleImageSelection
}) => {

    const { attributes, listeners, isDragging, index, over, setNodeRef } = useSortable({ id: image.id });

    return (
        <ImageList
            ref={setNodeRef}
            active={isDragging}

            insertPosition={
                activeIndex !== undefined && over?.id === image.id && !isDragging
                    ? index > activeIndex
                        ? "after"
                        : "before"
                    : undefined
            }
            aria-label="sortable image"
            attributes={attributes}
            listeners={listeners}
            image={image}
            selectedImages={selectedImages}
            toggleImageSelection={toggleImageSelection}
        />
    );
}

export default SortableImageComponent