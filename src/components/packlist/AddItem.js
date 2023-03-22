import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getItems, addNewItem } from "../../managers/ItemManager"
import { getCategories } from "../../managers/CategoryManager"


export const AddItem = () => {

    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [newItem, setNewItem] = useState({
        name: "",
        categoryId: 0
    })


    useEffect(() => {
        getItems()
            .then((itemArr) => setNewItem(itemArr))
        getCategories()
            .then((itemArr) => setCategories(itemArr))
    }, [])

    // const handleNewCategoryLabel = (event) => {
    //     const newItem = Object.assign({}, newItemByCategory)
    //     newItem.label = event.target.value
    //     setNewItemByCategory(newItem)
    // }

    const handleNewItemByCategory = (event) => {
        const item = Object.assign({}, newItem)
        item[event.target.name] = event.target.value
        setNewItem(item)
    }

    const createNewItem = () => {
        const categoryId = parseInt(newItem.categoryId)

        const data = {
            name: newItem.name,
            category: categoryId
        }

        addNewItem(data).then(() =>
            navigate("/packlist")
        )
    }


    return (
        <>
            <h2>Add Item
            </h2>
            <form>
                <fieldset>
                    <div className="form-group">
                        <select
                            name="categoryId"
                            className="form-control"
                            value={newItem.categoryId}
                            onChange={(event) => {
                                const copy = { ...newItem }
                                copy.categoryId = parseInt(event.target.value)
                                setNewItem(copy)
                            }}>
                            <option value="0">Category Select</option>
                            {categories.map(category => (
                                <option
                                    key={`category--${category.id}`}
                                    value={category.id}>
                                    {category.type}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                {/* <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            name="label"
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Category Label"
                            onChange={handleNewCategoryLabel}
                        />
                    </div>
                </fieldset> */}
                <fieldset>
                    <div>
                        <label htmlFor="item">What item would you like to add?</label>
                        <br></br>
                        <input
                            type="text"
                            name="name"
                            required autoFocus
                            onChange={handleNewItemByCategory}
                            className="itemInput"
                        />
                        <br></br>
                    </div>
                </fieldset>
                <button
                    type="publish"
                    onClick={(evt) => {
                        evt.preventDefault()
                        createNewItem()
                    }}
                    className="button"
                >
                    Create
                </button>
            </form></>
    )
}