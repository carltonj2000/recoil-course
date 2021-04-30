import { Container, Heading, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import React from 'react';
import {
  useRecoilValue,
  selectorFamily,
  atomFamily,
  useSetRecoilState,
} from 'recoil';
import { getWeather } from './fakeApi';

const userState = selectorFamily({
  key: 'user',
  get: (userId: number) => async () =>
    await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    ).then((res) => res.json()),
});

const weatherRequestIdState = atomFamily({
  key: 'weatherRequestId',
  default: 0,
});

const useRefetchWeather = (userId: number) => {
  const setRequestId = useSetRecoilState(weatherRequestIdState(userId));
  return () => setRequestId((oldId) => oldId + 1);
};

const weatherState = selectorFamily({
  key: 'weather',
  get: (userId: number) => async ({ get }) => {
    get(weatherRequestIdState(userId));
    const user = get(userState(userId));
    const w = await getWeather(user.address.zipcode);
    return w;
  },
});

const UserWeather = ({ userId }: { userId: number }) => {
  const user = useRecoilValue(userState(userId));
  const temperature = useRecoilValue(weatherState(userId));
  const refetch = useRefetchWeather(userId);
  return (
    <div>
      <Text>
        <b>Temperature for {user.address.city}:</b> {temperature}&deg;C
        <span onClick={refetch}> (Refresh Weather)</span>
      </Text>
    </div>
  );
};

const UserData = ({ userId }: { userId: number }) => {
  const user = useRecoilValue(userState(userId));
  return (
    <div>
      <Heading as="h2" size="md" mb={1}>
        User data:
      </Heading>
      <Text>
        <b>Name:</b> {user.name}
      </Text>
      <Text>
        <b>Phone:</b> {user.phone}
      </Text>
    </div>
  );
};

export const Async = () => {
  const [userId, setUserId] = React.useState<undefined | number>(undefined);
  const handleUserChange = (user: any) =>
    setUserId(user ? parseInt(user) : undefined);

  return (
    <Container py={10}>
      <Heading as="h1" mb={4}>
        View Profile
      </Heading>
      <Heading as="h2" size="md" mb={1}>
        Choose a user:
      </Heading>
      <Select
        placeholder="Choose a user"
        mb={4}
        value={userId}
        onChange={(e) => handleUserChange(e.target.value)}
      >
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </Select>
      {userId && (
        <div>
          <React.Suspense fallback={<div>Loading A User ...</div>}>
            <UserData {...{ userId }} />
          </React.Suspense>
          <React.Suspense fallback={<div>Loading Temperature ...</div>}>
            <UserWeather {...{ userId }} />
          </React.Suspense>
        </div>
      )}
    </Container>
  );
};
