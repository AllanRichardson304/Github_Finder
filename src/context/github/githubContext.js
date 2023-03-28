import { createContext, useReducer } from "react";
import githubReducer from "./githubReducer";

const GithubContext = createContext()
// const GITHUB_URL = 'https://api.github.com/users'
// const GITHUB_TOKEN ='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'

export const GithubProvider = ({ children }) => {
  const intialState = {
    users: [],
    loading: false
    
  }
  const [state, dispatch] = useReducer(githubReducer, intialState)
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {
    setLoading()
    const response = await fetch('https://api.github.com/users', {
      headers: {
        Authorization: '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',
      },
    });
    const data = await response.json();
    // setUsers(data);
    // setLoading(false);
    dispatch({
      type: 'GET_USERS',
      payload: data 
    })
// Set Loading
  const setLoading = () => dispatch({type:'SET_LOADING'})
  };

  return <GithubContext.Provider value={{
   users: state.users,
   loading: state.loading,
   fetchUsers, }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext