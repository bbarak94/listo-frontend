import React from 'react';
import ReactDOM from 'react-dom/client';
import {RootCmp} from './root-cmp.jsx';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './assets/styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RootCmp />
)

serviceWorkerRegistration.unregister();

