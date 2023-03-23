export const getTrips = () => {
    return fetch("http://localhost:8000/trips", {
        headers: {
            Authorization: `Token ${localStorage.getItem("roam_token")}`,
        },
    }).then((res) => res.json())
}

export const getTripDestinations = () => {
    return fetch("http://localhost:8000/tripdestinations", {
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
        .then((res) => res.json())
}

export const deleteTrip = (id) => {
    return fetch(`http://localhost:8000/trips/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("roam_token")}`
        },
    })
}

export const updateTrip = (id, tripBody) => {
    return fetch(`http://localhost:8000/trips/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roam_token")}`
        },
        body: JSON.stringify(tripBody),
    })
}

export const addTripDestination = (tripDestination) => {
    return fetch("http://localhost:8000/tripdestinations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roam_token")}`

        },
        body: JSON.stringify(tripDestination)
    })
        .then((res) => res.json())
}

export const addTripTag = (tripTag) => {
    return fetch("http://localhost:8000/triptags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roam_token")}`

        },
        body: JSON.stringify(tripTag)
    })
        .then((res) => res.json())

}

export const getDestinationByTrip = (id) => {
    return fetch(`http://localhost:8000/tripdestinations?trips=${id}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roam_token")}`
            }
        }).then((res) => res.json())
}

export const getSearchedTrips = (searchTerm) => {
    return fetch(`http://localhost:8000/trips?search=${searchTerm}`,
      {
        headers: {
          "Authorization": `Token ${localStorage.getItem("roam_token")}`
        }
      })
      .then(res => res.json())
    
  }

export const getUpcomingTrips = () => { 
    return fetch(`http://localhost:8000/trips?upcoming`,
      {
        headers: {
          "Authorization": `Token ${localStorage.getItem("roam_token")}`
        }
      })
      .then(res => res.json())
    

}

export const getPastTrips = () => { 
    return fetch(`http://localhost:8000/trips?past`,
      {
        headers: {
          "Authorization": `Token ${localStorage.getItem("roam_token")}`
        }
      })
      .then(res => res.json())
    

}

export const getSubscribedTrips = () => {
    return fetch(`http://localhost:8000/trips?subscribed=true`,
      {
        headers: {
          "Authorization": `Token ${localStorage.getItem("roam_token")}`
        }
      })
      .then(res => res.json())
    
  }

  export const getPublicTrips = () => {
    return fetch(`http://localhost:8000/trips?public=true`,
      {
        headers: {
          "Authorization": `Token ${localStorage.getItem("roam_token")}`
        }
      })
      .then(res => res.json())
    
  }

