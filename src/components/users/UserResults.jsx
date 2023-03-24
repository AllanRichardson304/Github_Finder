import { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
export default function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const response = await fetch(`https://api.github.com/users`, {
      // headers: {
      //   Authorization: `token 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`,
      // },
    });
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };
  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {users.map((user, i) => (
         <UserItem keu={user.id} user={user}/> 
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
