"use client";
import React, { useState } from 'react';
import CustomerHeader from '../_components/CustomerHeader';
import UserSignUp from '../_components/UserSignUp';
import UserLogin from '../_components/UserLogin';

const Page = (props) => {
  const [isLogin, setIsLogin] = useState(true); // Default to login

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <>
      <CustomerHeader />
      {isLogin ? (
        <UserLogin redirect={props.searchParams} onToggle={toggleForm} />
      ) : (
        <UserSignUp redirect={props.searchParams} onToggle={toggleForm} />
      )}
    </>
  );
}

export default Page;
