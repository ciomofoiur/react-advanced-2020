import React from 'react';

const PagesComponent = ({ pagedPeople, handlePage, totalNumberOfUsers }) => {
  const pages = [];
  for (let i = 1; i <= totalNumberOfUsers / 3; i++) {
    pages.push(i, ' ');
    console.log(pagedPeople.length);
  }

  return (
    <>
      {pages.map((page) => {
        return (
          <a href='#' className='page'>
            <span onClick={() => handlePage(page)}>{page}</span>
          </a>
        );
      })}
    </>
  );
};

export default PagesComponent;
