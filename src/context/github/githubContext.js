import { createContext, useReducer } from "react";
import githubReducer from "./githubReducer";
const GithubContext = createContext();
export const GithubProvider = ({ children }) => {
  const intialState = {
    users: [],
    user: {},
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, intialState);
  //Clear
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });
  // Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });
  // Search User
  const searchUser = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(
      `https://api.github.com/search/users?${params}`,
      {
        headers: {
          Authorization: "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",
        },
      }
    );
    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };
  // Single User
  const getUser = async (login) => {
    setLoading();
    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: {
        Authorization: "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",
      },
    });
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        searchUser,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
