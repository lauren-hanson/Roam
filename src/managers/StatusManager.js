export const getStatus = () => {
    return fetch("http://localhost:8000/destinationstatus", {
        headers: {
            Authorization: `Token ${localStorage.getItem("roam_token")}`,
        },
    }).then((res) => res.json())
}

export const getSingleStatus = (id) => {
    return fetch(`http://localhost:8000/destinationstatus/${id}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roam_token")}`
            }
        }).then((res) => res.json())
}