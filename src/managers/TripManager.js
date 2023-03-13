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