import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//create an axios instance
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

//Search users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  //using axios
  const response = await github.get(`search/users?${params}`);
  return response.data.items;

  /*  with fetch
  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  const { items } = await response.json();

  return items; */

  /* dispatch({
    type: "GET_USERS",
    payload: items,
  }); */

  /* setUsers(data);
    setLoading(false); 
};*/
};

//get user and repos in some method
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ]);
  return { user: user.data, repos: repos.data };
};

/* 
get User and repos in seperate methods
//Get single user
export const getUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  if (response.status === 404) window.location = "/notfound";
  else {
    const data = await response.json();
    return data;
    /*  dispatch({
      type: "GET_USER",
      payload: data,
    }); 
  }
};

/*Get single user
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });
  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  const data = await response.json();
  return data;
  /*  dispatch({
    type: "GET_REPOS",
    payload: data,
}; */
