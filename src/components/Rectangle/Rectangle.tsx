import { Drag } from '../Drag';
import { RectangleContainer } from './RectangleContainer';
import { RectangleInner } from './RectangleInner';
import { Resize } from '../Resize';

import { useRecoilState, atomFamily, atom } from 'recoil';
import React from 'react';
import { RectangleLoading } from './RectangleLoading';

export type ElementStyle = {
  position: { top: number; left: number };
  size: { width: number; height: number };
};

export type Element = {
  style: ElementStyle;
  image?: { id: number; src: string };
};

export const defaultElement = {
  style: { position: { top: 0, left: 0 }, size: { width: 200, height: 200 } },
};

export const elementState = atomFamily<Element, number>({
  key: 'element',
  default: defaultElement,
});

export const selectedElementState = atom<number | null>({
  key: 'selectedElement',
  default: null,
});

export const Rectangle = ({ id }: { id: number }) => {
  const [selectedElement, setSelectedElement] = useRecoilState(
    selectedElementState,
  );
  const [element, setElement] = useRecoilState(elementState(id));
  const selected = id === selectedElement;
  return (
    <RectangleContainer
      position={element.style.position}
      size={element.style.size}
      onSelect={() => {
        setSelectedElement(id);
      }}
    >
      <Resize
        {...{ selected }}
        position={element.style.position}
        size={element.style.size}
        onResize={(style) => setElement({ ...element, style })}
      >
        <Drag
          position={element.style.position}
          onDrag={(position) => {
            setElement({
              ...element,
              style: {
                ...element.style,
                position,
              },
            });
          }}
        >
          <div>
            <React.Suspense fallback={<RectangleLoading {...{ selected }} />}>
              <RectangleInner {...{ selected, id }} />
            </React.Suspense>
          </div>
        </Drag>
      </Resize>
    </RectangleContainer>
  );
};
