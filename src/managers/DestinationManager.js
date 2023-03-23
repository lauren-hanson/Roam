export const getDestinations = () => {
    return fetch("http://localhost:8000/destinations", {
        headers: {
            Authorization: `Token ${localStorage.getItem("roam_token")}`,
        },
    }).then((res) => res.json())
}

export const getSingleDestination = (id) => {
    return fetch(`http://localhost:8000/destinations/${id}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roam_token")}`
            }
        }).then((res) => res.json())
}

export const addDestination = (destination) => {
    return fetch("http://localhost:8000/destinations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roam_token")}`

        },
        body: JSON.stringify(destination),
    })
    .then((res) => res.json())
}

export const getDestinationByStatus = (id) => {
    return fetch(`http://localhost:8000/tripdestinations?status=${id}`,
    {
      headers: {
        "Authorization": `Token ${localStorage.getItem("roam_token")}`
      }
    })
    .then(res => res.json())
  
}

export const deleteDestination = (id) => {
    return fetch(`http://localhost:8000/destinations/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("roam_token")}`
        },
    })
}



