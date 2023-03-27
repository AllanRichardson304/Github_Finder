import { useEffect, useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/githubContext";
export default function UserResults() {
  const {users,loading,fetchUsers,} =useContext(GithubContext)
  useEffect(() => {
    fetchUsers();
  }, []);
  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {users.map((user, i) => (
         <UserItem key={user.id} user={user}/> 
        ))}
      </div>
    );
  } else {
    return (
      <>
        <Spinner/>
        {/* {process.env.REACT_APP_GITHUB_TOKEN} */}
      </>
    );
  }
}
