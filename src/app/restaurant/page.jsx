"use client";
import { useState } from 'react';
import RestaurantLogin from '../_components/RestaurantLogin';
import RestaurantSignup from '../_components/RestaurantSignup';
import RestaurantHeader from '../_components/RestaurantHeader';

const RestaurantPage = () => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <RestaurantHeader />
      <div className="">
        <div className="">
          {login ? <RestaurantLogin setLogin={setLogin} /> : <RestaurantSignup setLogin={setLogin} />}
        </div>
      </div>
    </>
  );
};

export default RestaurantPage;
