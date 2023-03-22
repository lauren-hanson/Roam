import { deleteCategory } from "../../managers/CategoryManager"

export const DeleteCategory = ({getCategories, categories, setCategories, setRefresh, refresh}) => {

    const deleteCategoryButton = (id) => {
        return <button className="deleteButton" onClick={() => {
            deleteCategory(id)
                .then(() => {
                    window.confirm(
                        "Are you sure this item wasn't used?"
                    )
                    getCategories().then((data) => setCategories(data))
                    setRefresh(!refresh)
                })
        }
        }>Poof</button>
    }

    return (
        <>
            <div className="addItemForm">
                <h2 className="packListHeader">Delete Category</h2>
                <form>
                    <fieldset>
                        <label className="packListSubtitle">Which category should we poof?</label>
                        <div className="newCategoryInput">
                            <select
                                name="categoryId"
                                className="input">
                                {/* value={newItem.categoryId} */}
                                <option value="0">Category Select</option>
                                {categories.map(category => (
                                    <option
                                        key={`category--${category.id}`}
                                        value={category.id}>
                                        {category.type}
                                    </option>
                                ))}
                            </select>
                            <button className="button is-small addCategoryButton"
                                onClick={deleteCategoryButton}>
                                +
                            </button>
                        </div>
                    </fieldset>

                    <br></br>
                    {/* <button
                        type="publish"
                        onClick={(evt) => {
                            evt.preventDefault()
                            createNewItem()
                        }}
                        className="button"
                    >
                        Delete
                    </button> */}
                </form></div >
        </>)
}