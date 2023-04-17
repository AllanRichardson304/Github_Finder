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
  //Clear 
  const clearUsers =  () => dispatch({type:'CLEAR_USERS'})
  // Set Loading
  const setLoading = () => dispatch({type:'SET_LOADING'})
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const searchUser = async (text) => {
    setLoading()
    // const params = new URLSearchParams({
    //   q:text
    // })
    const response = await fetch('https://api.github.com/search/users?q=f', {
      headers: {
        Authorization: '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',
      },
    });
    const {items} = await response.json();
    // setUsers(data);
    // setLoading(false);
    dispatch({
      type: 'GET_USERS',
      payload: items 
    })

  };

  return <GithubContext.Provider value={{
   users: state.users,
   loading: state.loading,
   searchUser,clearUsers, }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext