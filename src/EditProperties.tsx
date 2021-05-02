import {
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  selectedElementState,
  elementState,
} from './components/Rectangle/Rectangle';
import _ from 'lodash';
import produce from 'immer';
import { ImageInfo, ImageInfoFallback } from './components/ImageInfo';
import { Suspense } from 'react';

export const editPropertyState = selectorFamily<
  any,
  { path: string; id: number }
>({
  key: 'editProperty',
  get: ({ path, id }) => ({ get }) => {
    const element = get(elementState(id));
    return _.get(element, path);
  },
  set: ({ path, id }) => ({ get, set }, newValue) => {
    const element = get(elementState(id));
    const newElement = produce(element, (draft) => {
      _.set(draft, path, newValue);
    });
    set(elementState(id), newElement);
  },
});

const hasImageState = selector({
  key: 'hasImage',
  get: ({ get }) => {
    const id = get(selectedElementState);
    if (id === null) return;
    const element = get(elementState(id));
    if (element.image === undefined) return;
    return true;
  },
});
export const EditProperties = () => {
  const selectedElement = useRecoilValue(selectedElementState);
  const hasImage = useRecoilValue(hasImageState);
  if (selectedElement == null) return null;
  return (
    <Card>
      <Section heading="Position">
        <Property label="Top" path="style.position.top" id={selectedElement} />
        <Property
          label="Left"
          path="style.position.left"
          id={selectedElement}
        />
      </Section>
      <Section heading="Size">
        <Property
          label="Height"
          path="style.size.height"
          id={selectedElement}
        />
        selected
        <Property label="Width" path="style.size.width" id={selectedElement} />
      </Section>
      {hasImage && (
        <Section heading="Image">
          <Suspense fallback={<ImageInfoFallback />}>
            <ImageInfo />
          </Suspense>
        </Section>
      )}
    </Card>
  );
};

const Section: React.FC<{ heading: string }> = ({ heading, children }) => {
  return (
    <VStack spacing={2} align="flex-start">
      <Text fontWeight="500">{heading}</Text>
      {children}
    </VStack>
  );
};

const Property = ({
  label,
  path,
  id,
}: {
  label: string;
  path: string;
  id: number;
}) => {
  const [value, valueSet] = useRecoilState(editPropertyState({ path, id }));
  return (
    <div>
      <Text fontSize="14px" fontWeight="500" mb="2px">
        {label}
      </Text>
      <InputGroup size="sm" variant="filled">
        <NumberInput value={value} onChange={(_, v) => valueSet(v)}>
          <NumberInputField borderRadius="md" />
          <InputRightElement
            pointerEvents="none"
            children="px"
            lineHeight="1"
            fontSize="12px"
          />
        </NumberInput>
      </InputGroup>
    </div>
  );
};

const Card: React.FC = ({ children }) => (
  <VStack
    position="absolute"
    top="20px"
    right="20px"
    backgroundColor="white"
    padding={2}
    boxShadow="md"
    borderRadius="md"
    spacing={3}
    align="flex-start"
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </VStack>
);
