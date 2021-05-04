import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Canvas from './Canvas';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Atoms from './examples/Atoms';
import { Selectors } from './examples/Selectors';
import { Async } from './examples/Async';
import { AtomEffects } from './examples/AtomEffects';
import { AtomEffects as AtomEffects2 } from './examples/AtomEffects2';
import { AtomEffects as AtomEffects3 } from './examples/AtomEffects3';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route path="/examples/atoms">
              <Atoms />
            </Route>
            <Route path="/examples/selectors">
              <Selectors />
            </Route>
            <Route path="/examples/async">
              <Async />
            </Route>
            <Route path="/examples/atom-effects">
              <AtomEffects />
            </Route>
            <Route path="/examples/atom-effects-2">
              <AtomEffects2 />
            </Route>
            <Route path="/examples/atom-effects-3">
              <AtomEffects3 />
            </Route>
            <Route>
              <Canvas />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
