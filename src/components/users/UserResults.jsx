import React, { useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

function UserResults() {
  const { users, loading } = useContext(GithubContext);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        <ul>
          {users.map((user) => (
            <h3>
              <UserItem user={user} key={user.login} />
            </h3>
          ))}
        </ul>
      </div>
    );
  } else return <Spinner />;
}

export default UserResults;
