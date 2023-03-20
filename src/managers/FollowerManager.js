export const addFollower = (id) => {
    return fetch(`http://localhost:8000/users/${id}/follow`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roam_token")}`,
            "Accept": "application/json"
        },
        body: JSON.stringify(id)
    })
    .then(res => res.json())
}
export const getFollowers = (id) => {
    return fetch(`http://localhost:8000/followers?userId=${id}`)
        .then(res => res.json())
}
export const deleteFollower = (id) => {
    return fetch(`http://localhost:8000/users/${id}/unsubscribe`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("roam_token")}`
        }
    })
}