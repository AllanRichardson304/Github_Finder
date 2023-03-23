import { useEffect, useState } from "react" 
export default function UserResults() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/  `, {
      headers: {
        Authoirzation: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
    
    const data = await response.json()
    setUsers(data)  
    setLoading(false)

  }

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-col-4 lg:grid-col-3 md:grid-col-2 sm:grid-col-1">
        {users.map((user) => (
          <h3>{user.login}</h3>
        ))}
      </div>
    )
  }
  else {
    return (
      <>
        <h3>Loading....</h3>
        {/* {process.env.REACT_APP_GITHUB_TOKEN} */}
      </>
    )
  }

}
