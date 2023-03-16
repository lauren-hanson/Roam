export const getTrips = () => {
    return fetch("http://localhost:8000/trips", {
        headers: {
            Authorization: `Token ${localStorage.getItem("roam_token")}`,
        },
    }).then((res) => res.json())
}

export const getSingleTrip = (id) => {
    return fetch(`http://localhost:8000/trips/${id}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roam_token")}`
            }
        }).then((res) => res.json())
}

export const getMyTrips = () => {
    return fetch(`http://localhost:8000/trips?user`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roam_token")}`
            }
        })
        .then(res => res.json())
}

export const addNewTrip = (trip) => {
    return fetch("http://localhost:8000/trips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roam_token")}`

        },
        body: JSON.stringify(trip),
    })
}

export const deleteTrip = (id) => {
    return fetch(`http://localhost:8000/trips/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("roam_token")}`
        },
    })
}

export const updatePost = (id, tripBody) => {
    return fetch(`http://localhost:8000/trips/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roam_token")}`
        },
        body: JSON.stringify(tripBody),
    });
}

export const getFinalDestination = () => {
    return fetch('http://localhost:8000/tripdestinations?status=isFinalDestination', {
        headers: {
            Authorization: `Token ${localStorage.getItem("roam_token")}`,
        },
    }).then((res) => res.json())
}

export const addTripDestination = (tripDestination) => {
    return fetch("http://localhost:8000/tripdestinations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roam_token")}`

        },
        body: JSON.stringify(tripDestination),
    })
}

export const addTripTag = (tripTag) => {
    return fetch("http://localhost:8000/triptags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roam_token")}`

        },
        body: JSON.stringify(tripTag),
    })
}
   