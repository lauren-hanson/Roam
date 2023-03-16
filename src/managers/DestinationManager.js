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
}

export const getFinalDestination = () => {
    return fetch("http://localhost:8000/tripdestinations?status__type=FinalDestination", {
        headers: {
            Authorization: `Token ${localStorage.getItem("roam_token")}`,
        },
    }).then((res) => res.json())
}


