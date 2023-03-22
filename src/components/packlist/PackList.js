import { ItemList } from "./ItemList"
import "./PackList.css"

export const PackList = ({token}) => { 

    return(<>
        <h2 className="packListHeader">Our Pack List</h2>
        <ItemList /> 
    </>)
}