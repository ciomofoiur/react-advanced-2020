import React, { useState, useEffect } from 'react';
const url = 'https://api.github.com/users/QuincyLarson';

const MultipleReturns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState('default user');

  const getUsers = async () => {
    const response = await fetch(url);
    const user = await response.json();
    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }

  const { login } = user;

  return (
    <div>
      <h1>{login}</h1>
    </div>
  );
};

export default MultipleReturns;
