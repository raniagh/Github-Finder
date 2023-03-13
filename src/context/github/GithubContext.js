import { createContext, useReducer, useState } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //with Reducer Hook
  const inialState = {
    users: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, inialState);

  //with useState Hook
  /* const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); */

  //Search users (testing purposes)
  const searchUsers = async (text) => {
    console.log(GITHUB_TOKEN);
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    console.log(response);
    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
    /* setUsers(data);
    setLoading(false); */
  };

  //Clear users from state
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };
  const githubContext = {
    users: state.users,
    loading: state.loading,
    searchUsers,
    clearUsers,
  };
  //set loading
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });
  return (
    <GithubContext.Provider value={githubContext}>
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
