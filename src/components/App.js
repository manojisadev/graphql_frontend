import React from 'react';
import Login from './Login';
import Logout from './Logout';
import Hello from './Hello'

import Todo from './Todo';


function App() {
  return (
    <div>
    {/* <Login />
    <Logout /> */}
    <Todo/>
    <Hello name="dota"/>
    </div>
  );
}

export default App;
