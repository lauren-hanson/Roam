export const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers: {
            Authorization: `Token ${localStorage.getItem("roam_token")}`,
        },
    }).then((res) => res.json())
}

export const getSingleCategory = (id) => {
    return fetch(`http://localhost:8000/categories/${id}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roam_token")}`
            }
        }).then((res) => res.json())
}