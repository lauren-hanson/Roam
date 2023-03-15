export const getStates = () => {
    return fetch("http://localhost:8000/states", {
        headers: {
            Authorization: `Token ${localStorage.getItem("roam_token")}`,
        },
    }).then((res) => res.json())
}

export const getSingleState = (id) => {
    return fetch(`http://localhost:8000/states/${id}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roam_token")}`
            }
        }).then((res) => res.json())
}