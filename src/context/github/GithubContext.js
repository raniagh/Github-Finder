import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  //with Reducer Hook
  const inialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, inialState);

  //with useState Hook
  /* const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); */

  const githubContext = {
    ...state,
    dispatch,
  };

  return (
    <GithubContext.Provider value={githubContext}>
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
