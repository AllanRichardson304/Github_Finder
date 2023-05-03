import axios from 'axios'

const github = axios.create({
  baseURL:`https://api.github.com`,
  headers:{  Authorization: "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",}
})

export const searchUsers = async (text) => {
    const params = new URLSearchParams({
      q: text,
    });
    const response = await github.get(`/search/users?${params}`)
     return response.data.items
  };

  export const getUserAndRepos =  async (login) => {
   const [user,repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`)
   ])
   return {
    user:user.data,repos:repos.data
   }
  }


  // export const getUser = async (login) => {
  //   const response = await fetch(`https://api.github.com/users/${login}`, {
  //     headers: {
  //       Authorization: "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",
  //     },
  //   });
  //   if (response.status === 404) {
  //     window.location = "/notfound";
  //   } else {
  //     const data = await response.json();
  //      return data;
  //   }
  // };

  // // Get User Repo
  // export const getUserRepo = async (login) => {
  //   const params = new URLSearchParams({
  //     sort: 'created',
  //     per_page:10
  //   });
  //   const response = await fetch(
  //     `https://api.github.com/users/${login}/repos?${params}`,
  //     {
  //       headers: {
  //         Authorization: "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",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   return data;
  // };