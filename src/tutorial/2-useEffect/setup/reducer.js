export const defaultState = {
  people: [],
  pagedPeople: [],
  pageChunk: 3,
  currentPage: 1,
  totalNumberOfUsers: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'PAGE_CLICK': {
      const pagedPeople = state.people.slice(
        action.payload * state.pageChunk - state.pageChunk,
        action.payload * state.pageChunk
      );
      return { ...state, pagedPeople: pagedPeople };
    }
    case 'INITIALIZE_USERS': {
      const totalNumberOfUsers = action.payload.length;
      const pagedPeople = action.payload.slice(0, 3);
      return {
        ...state,
        people: action.payload,
        pagedPeople: pagedPeople,
        totalNumberOfUsers: totalNumberOfUsers,
      };
    }
    default:
      break;
  }
};

// 1 2 3 4 5 6 7 8 9 10
