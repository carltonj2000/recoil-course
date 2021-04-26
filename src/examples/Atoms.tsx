import React from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

const darkModeAtom = atom({ key: 'darkMode', default: false });

const DarkModeSwitch = () => {
  const [darkMode, darkModeSet] = useRecoilState(darkModeAtom);
  return (
    <input
      type="checkbox"
      checked={darkMode}
      onChange={() => darkModeSet((old) => !old)}
    />
  );
};

const Button = () => {
  const darkMode = useRecoilValue(darkModeAtom);
  return (
    <button
      style={{
        backgroundColor: darkMode ? 'black' : 'white',
        color: darkMode ? 'white' : 'black',
      }}
    >
      My UI Button
    </button>
  );
};

const Atoms = () => {
  return (
    <div>
      <div>
        <DarkModeSwitch />
      </div>
      <div>
        <Button />
      </div>
    </div>
  );
};
export default Atoms;
