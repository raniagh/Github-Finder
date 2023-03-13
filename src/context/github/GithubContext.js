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

  //Get initial users (testing purposes)
  const fetchUsers = async () => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
    /* setUsers(data);
    setLoading(false); */
  };
  const githubContext = {
    users: state.users,
    loading: state.loading,
    fetchUsers,
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
