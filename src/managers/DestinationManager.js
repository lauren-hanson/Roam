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
    return fetch(`http://localhost:8000/destinations?destination_status=${id}`,
    {
      headers: {
        "Authorization": `Token ${localStorage.getItem("roam_token")}`
      }
    })
    .then(res => res.json())
  
}


export const getNotFavDestinations = (id) => {
    return fetch(`http://localhost:8000/destinations?not_favorite=${id}`,
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

export const addDestinationStatus = (status) => {
    return fetch("http://localhost:8000/destinations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(status)
    })
        .then((res) => res.json())
};


export const updateDestination = (id, body) => {
    return fetch(`http://localhost:8000/destinations/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roam_token")}`
        },
        body: JSON.stringify(body),
    })
}



