export const getItems = () => {
    return fetch("http://localhost:8000/items", {
        headers: {
            Authorization: `Token ${localStorage.getItem("roam_token")}`,
        },
    }).then((res) => res.json())
}

export const getSingleItem = (id) => {
    return fetch(`http://localhost:8000/items/${id}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roam_token")}`
            }
        }).then((res) => res.json())
}