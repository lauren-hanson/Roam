import { ItemList } from "./ItemList"
import "./PackList.css"

export const PackList = ({token}) => { 

    return(
    <div className="packListPage">
        <h2 className="packListHeader">Our Pack List</h2>
        <ItemList /> 
    </div>)
}