import {createContext, useState } from "react";

const GithubContext = createContext()
// const GITHUB_URL = 'https://api.github.com/users'
// const GITHUB_TOKEN ='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'

export const GithubProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchUsers = async () => {
        const response = await fetch('https://api.github.com/users', {
          headers: {
            Authorization: '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',
          },
        });
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      };

      return <GithubContext.Provider value={{users,loading,fetchUsers,}}>
            {children}
      </GithubContext.Provider>
}

export default GithubContext