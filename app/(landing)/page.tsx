"use client"

import { useState,useCallback } from "react";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { CheckSquare } from 'lucide-react';

import SortableImageComponent from "@/components/sortableImageComponent";
import ImageList from "@/components/imagelist";
import { Button } from "@/components/ui/button";
import { imagesList } from "@/data/data";

export default function App() {
    const [images, setImages] = useState(imagesList);

    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const [activeId, setActiveId] = useState<UniqueIdentifier | undefined>();
    const [imageInRow1Col1Id, setImageInRow1Col1Id] = useState<string | undefined>("1");

    const activeIndex = activeId ? images.findIndex((image) => image.id === activeId) : undefined;
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 50, tolerance: 10 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const handleDragStart = useCallback(({ active }: DragStartEvent) => setActiveId(active.id), []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active && over && active.id !== over.id) {
            setImages((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                if (newIndex === 0) {
                    setImageInRow1Col1Id(String(active.id));
                }
                
                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(undefined);
    }, []);

    const toggleImageSelection = (imageId: string) => {
        if (selectedImages.includes(imageId)) {
            setSelectedImages((prevSelectedImages) =>
                prevSelectedImages.filter((id) => id !== imageId)
            );
        } else {
            setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageId]);
        }
    };

    const handleDelete = () => {
        if (selectedImages.length > 0) {
            setImages((prevImages) =>
                prevImages.filter((image) => !selectedImages.includes(image.id))
            );
            setSelectedImages([]);
        }
    }
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={images}>

                <div className="flex pb-4 justify-between border-b-2 m-8">
                    {
                        selectedImages.length > 0 ? (
                            <>
                                <div className="flex justify-between">
                                    <CheckSquare className="text-sky-500 mr-5" />
                                    <h1 className="font-sans text-xl font-bold">
                                        {selectedImages.length} Files Selected
                                    </h1>
                                </div>
                                <Button variant="destructive" onClick={handleDelete}>
                                    delete files
                                </Button>
                            </>
                        ) : (
                            <div>
                                <h1 className="font-sans text-xl font-bold">Galary</h1>
                            </div>
                        )
                    }
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-8">
                    {images.map((image) => (
                        <SortableImageComponent
                            key={image.id}
                            image={image}
                            activeIndex={activeIndex}
                            toggleImageSelection={toggleImageSelection}
                            selectedImages={selectedImages}
                        />
                    ))}
                </div>

            </SortableContext>
            <DragOverlay>
                {activeId && (
                    <ImageList
                        overlay
                        image={images.find((image) => image.id === activeId) || images[0]}
                    />
                )}
            </DragOverlay>
        </DndContext>
    );
}
