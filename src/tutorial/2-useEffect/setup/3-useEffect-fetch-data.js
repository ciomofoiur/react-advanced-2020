import React, { useState, useEffect, useReducer } from 'react';
import { Wrapper } from './ExpandComponent';
import PagesComponent from './PagesComponent';
import { reducer, defaultState } from './reducer';

const url = 'https://api.github.com/users';

const UseEffectFetchData = () => {
  // const [users, setUsers] = useState([]);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const fetchUsers = async () => {
    const response = await fetch(url);
    const users = await response.json();
    return users;
  };

  const initializeUsers = (users) => {
    dispatch({ type: 'INITIALIZE_USERS', payload: users });
  };

  useEffect(() => {
    (async () => {
      const users = await fetchUsers();
      initializeUsers(users);
    })();
  }, []);

  const handlePage = (page) => {
    dispatch({ type: 'PAGE_CLICK', payload: page });
  };

  return (
    <>
      <h3>github users</h3>
      <ul className='users'>
        {state.pagedPeople.map((user) => {
          const { id, login, avatar_url, html_url, repos_url } = user;
          return (
            <li className='items' key={id}>
              <img src={avatar_url} alt={login} />
              <div>
                <h4>{login}</h4>
                <a href={html_url}>Profile Link</a> <br />
                <Wrapper repos_url={repos_url} />
              </div>
            </li>
          );
        })}
      </ul>
      <PagesComponent
        pagedPeople={state.pagedPeople}
        handlePage={handlePage}
        totalNumberOfUsers={state.totalNumberOfUsers}
      />
    </>
  );
};

export default UseEffectFetchData;
