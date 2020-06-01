import React from 'react';
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd';

const Draggable = ({
  itemKey,
  children,
  index,
  move,
  dragType,
}: {
  itemKey: string;
  children: JSX.Element;
  index: number;
  dragType: string;
  move: (destination: string, original: any) => any
}) => {
  const moveItem = (destination: string) => { move(destination, index) };
  const [, drag] = useDrag({
    item: { type: dragType, itemKey },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: dragType,
    canDrop: () => false,
    hover({ itemKey: draggedKey }: ItemType) {
      if (draggedKey !== itemKey) {
        moveItem(draggedKey);
      }
    },
  });

  return React.cloneElement(children, { ref: (node: any) => drag(drop(node)) });
}

interface ItemType extends DragObjectWithType {
  itemKey: string;
}

export default Draggable;

