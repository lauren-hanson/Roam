import { useEffect, useState } from "react"
import { getItems } from "../../managers/ItemManager"
import { getCategories } from "../../managers/CategoryManager"
import "./PackList.css"

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
                    <h4 className="packListSubtitle">{category}</h4>
                    <br></br>
                    <ul>
                        {items.map(item => (
                            <li className="packListLabel" key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                    <br></br>
                </div>
            ))}
        </div>
    </>)
}