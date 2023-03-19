import { useEffect, useState } from "react"
import { getItems } from "../../managers/ItemManager"
import { getCategories } from "../../managers/CategoryManager"

export const ItemList = () => {

    const [itemsByCategory, setItemsByCategory] = useState({})
    // const [categories, setCategories] = useState([])

    useEffect(() => {
        getItems()
            .then((itemArr) => setItemsByCategory(itemArr))
    }, [])

    return (<>

        <div>
            {Object.entries(itemsByCategory).map(([category, items]) => (
                <div key={category}>
                    <h4>{category}</h4>
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </>)
}