import React, { useState } from 'react';
// JS
// const input = document.getElementById('myText');
// const inputValue = input.value
// React
// value, onChange

const ControlledInputs = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); //the page refreshes on submit
    console.log('hello world'); //thus we can't see the 'hello world'
  };

  return (
    <>
      <article>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='firstName'>Name : </label>
            <input type='text' id='firstName' name='firstName' />
          </div>
          <div className='form-control'>
            <label htmlFor='email'>Email : </label>
            <input type='text' id='email' name='email' />
          </div>
          <button type='submit'>add person</button>
        </form>
      </article>
    </>
  );
};

export default ControlledInputs;
