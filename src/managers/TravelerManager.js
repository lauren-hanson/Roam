export const getTravelers = () => {
  return fetch("http://localhost:8000/travelers", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("roam_token")}`
    }
  })
    .then(res => res.json())
}


export const getTravelerById = (id) => {
  return fetch(`http://localhost:8000/travelers/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("roam_token")}`
    }
  })
    .then(res => res.json())
}
