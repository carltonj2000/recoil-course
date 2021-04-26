import {
  Rectangle,
  selectedElementState,
} from './components/Rectangle/Rectangle';
import { PageContainer } from './PageContainer';
import { Toolbar } from './Toolbar';
import { EditProperties } from './EditProperties';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

export const elementsState = atom<number[]>({
  key: 'elements',
  default: [],
});

function Canvas() {
  const setSelectedElement = useSetRecoilState(selectedElementState);
  const elements = useRecoilValue(elementsState);
  return (
    <PageContainer
      onClick={() => {
        setSelectedElement(null);
      }}
    >
      <Toolbar />
      <EditProperties />
      {elements.map((id) => (
        <Rectangle id={id} />
      ))}
    </PageContainer>
  );
}

export default Canvas;
