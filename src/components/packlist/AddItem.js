import { useEffect, useState, useRef } from "react"
// import { useNavigate } from 'react-router-dom'
import { getItems, addNewItem } from "../../managers/ItemManager"
import { addCategory } from "../../managers/CategoryManager"
// import Modal from 'react-modal'
import "./PackList.css"


export const AddItem = ({ getCategories, closeModal, categories, setCategories }) => {

    // const navigate = useNavigate()
    const catRef = useRef()
    const [refresh, setRefresh] = useState(false)

    const [newCategory, setNewCategory] = useState({
        id: 0,
        type: ""
    })
    const [newItem, setNewItem] = useState({
        name: "",
        categoryId: 0
    })


    const fetchItems = () => {
        getItems()
            .then((itemArr) => setNewItem(itemArr))
    }

    useEffect(() => {
        fetchItems()
    }, [])

    const handleNewCategoryLabel = (event) => {
        const newCategoryLabel = Object.assign({}, newCategory)
        newCategoryLabel.type = event.target.value
        setNewCategory(newCategoryLabel)
    }

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

        addNewItem(data)

            .then(() => {
                window.location.reload()
            })
            .catch((error) => {
                console.error(error)
            })
        // 
        // getItems().then((newData) => {
        //     setNewItem(newData);
        //     if (closeModal) {
        //         closeModal();
        //     }
        // })



    }



    const createNewCategory = (event) => {
        event.preventDefault()

        const data = {
            type: newCategory.type
        }

        setCategories([...categories, newCategory])
        catRef.current.value = ''

        addCategory(data).then(() => {
            window.confirm(
                "New Category Added"
            )
            getCategories().then((data) => {
                setCategories(data)
            })
            setRefresh(!refresh)

        })
    }


    return (
        <>
            <div className="addItemForm">
                <h2 className="packListHeader">Add Item</h2>
                <form>
                    <fieldset>
                        <div className="form-group">
                            <select
                                name="categoryId"
                                className="input"
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
                    <fieldset>
                        <label className="packListSubtitle">Need a new category?</label>
                        <div className="newCategoryInput">
                            <input
                                type="text"
                                name="type"
                                ref={catRef}
                                required
                                autoFocus
                                className="input"
                                placeholder="New Category Label"
                                onChange={handleNewCategoryLabel}
                            />
                            <button className="button is-small addCategoryButton"
                                onClick={createNewCategory}>
                                +
                            </button>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div>
                            <label htmlFor="item" className="packListSubtitle">What item would you like to add?</label>
                            <br></br>
                            <input
                                type="text"
                                name="name"
                                required autoFocus
                                onChange={handleNewItemByCategory}
                                className="input"
                            />
                            <br></br>
                        </div>
                    </fieldset>
                    <br></br>
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
                </form></div >
        </>)
}