import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const solidStar = <FontAwesomeIcon icon={faStar} />;

//const repos_url = 'https://api.github.com/users/mojombo/repos';
const stars_url = 'https://api.github.com/users/mojombo/starred';

export const Wrapper = ({ repos_url, starred_url }) => {
  const [cardVisibility, setCardVisibility] = useState(false);
  const [repos, setRepos] = useState([]);
  const [stars, setStars] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [starredRepos, setStarredRepos] = useState([]);
  const [isStarsExpanded, setIsStarsExpanded] = useState(false);

  const getRepos = async () => {
    setIsLoading(true);
    const response = await fetch(repos_url);
    const repos = await response.json();
    setRepos(repos);
    countingStars(repos);
    setIsLoading(false);
    console.log(repos);
  };

  const getStars = async () => {
    const response = await fetch(stars_url);
    const starredRepos = await response.json();
    setStarredRepos(starredRepos);
    console.log(starredRepos);
  };

  useEffect(() => {
    if (cardVisibility) {
      getRepos();
    }
  }, [cardVisibility]);

  useEffect(() => {
    if (isStarsExpanded) {
      getStars();
    }
  }, [isStarsExpanded]);

  const countingStars = (repos) => {
    let stars = 0;
    repos.map((repo) => {
      stars = stars + repo.stargazers_count;
      return stars;
    });
    setStars(stars);
  };

  const displayStars = (myStars) => {
    if (myStars === null || myStars === 0) {
      return '-';
    } else {
      return myStars;
    }
  };

  return (
    <>
      <h4>
        {displayStars(stars)}
        <span>{solidStar}</span>
      </h4>

      <button
        className='myButton'
        onClick={() => {
          // console.log('first', cardVisibility);
          setCardVisibility(!cardVisibility);
          // console.log('second', cardVisibility);
          if (cardVisibility) {
            setStars(null);
          }
        }}
      >
        Expand/Collapse
      </button>
      {cardVisibility ? (
        <ExpandComponent repos={repos} isLoading={isLoading} />
      ) : null}

      <h5>
        {displayStars(starredRepos.length)}
        <span>{solidStar} starred repos</span>
      </h5>

      <button
        id='btn2'
        onClick={() => {
          setIsStarsExpanded(!isStarsExpanded);
        }}
      >
        {solidStar} Stars
      </button>
      {isStarsExpanded ? <StarsComponent starredRepos={starredRepos} /> : null}
    </>
  );
};

const ExpandComponent = ({ repos, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h4>Repositories</h4>
          <ul>
            {repos.map((repo) => {
              return <li>{repo.name}</li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
};

const StarsComponent = ({ starredRepos }) => {
  return (
    <>
      <div>
        <ul>
          {starredRepos.map((repo) => {
            return <li>{repo.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

// export default ExpandComponent;

//also fetch repos (title) and show them in the card after i expand    ✓
// + show total stars from all repos   "stargazers_count": 114     ✓

//poza separata de expand content   ✓
//dots la <li>  ✓
//butonul sa arate a buton Win11    ✓
//adaug o steluta langa stars   ✓
//  !install font awesome component that offers React support and use it  ✓
//- pana nu se calculeaza nr de stele   ✓
//cand fac collapse sa sterg nr de stele si revin la -  ✓
//  !afisez loading sau 'icon' pana se aduc datele in expand    ✓

//creez un repo si tot fac commits constant     ✓

//useReducer -> refactor this app     ✓
