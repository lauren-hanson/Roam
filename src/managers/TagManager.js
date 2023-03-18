export const getTags = () => {
    return fetch("http://localhost:8000/tags", {
        headers: {
            Authorization: `Token ${localStorage.getItem("roam_token")}`,
        },
    }).then((res) => res.json())
}

export const getSingleTag = (id) => {
    return fetch(`http://localhost:8000/tags/${id}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roam_token")}`
            }
        }).then((res) => res.json())
}

export const addNewTag = (triptag) => {
    return fetch("http://localhost:8000/triptags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(triptag)
    })
    .then((res) => res.json())
};