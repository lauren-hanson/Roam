export const getTravelers = () => {
    return fetch("http://localhost:8000/travelers", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("roam_token")}`
      }
    })
      .then(res => res.json())
  }
  