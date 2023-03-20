export const addSubscription = (id) => {
    return fetch(`http://localhost:8000/travelers/${id}/subscribe`, {
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
export const getSubscriptions = (id) => {
    return fetch(`http://localhost:8000/subscriptions?travelerId=${id}`)
        .then(res => res.json())
}

export const 
deleteSubscription = (id) => {
    return fetch(`http://localhost:8000/travelers/${id}/unsubscribe`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("roam_token")}`
        }
    })
}