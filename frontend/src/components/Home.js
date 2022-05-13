import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';
import Nav from './Nav';

function Home() {
  const {user} = useContext(Context);

  useEffect(() => {
    console.log('Home');
    console.log(localStorage.getItem('jwt'));
  }, []);

  return (
    <div>
      <Nav />
      Home
      User = {user &&
        <div> {user.name} </div>
      }
    </div>
  );
}

export default Home;
