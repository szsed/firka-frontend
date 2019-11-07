import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store/store';

store.dispatch({ type: 'GAME_STATUS_CHANGE', payload: 'asd' });
// store.dispatch({ type: 'SEND_DRAW' });
// store.dispatch({ type: 'NEXT_ROUND' });
console.log(store.getState());

ReactDOM.render(null, document.getElementById('root'));
