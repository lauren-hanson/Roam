import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getItems, deleteItem } from "../../managers/ItemManager"
import { getCategories, addCategory } from "../../managers/CategoryManager"
import { AddItem } from "./AddItem"
import { DeleteCategory } from "./DeleteCategory"
import Modal from 'react-modal'
import "./PackList.css"

export const ItemList = () => {
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false)
    const [categories, setCategories] = useState([])
    const [itemsByCategory, setItemsByCategory] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        getItems()
            .then((itemArr) => setItemsByCategory(itemArr))
        getCategories()
            .then((itemArr) => setCategories(itemArr))
    }, [])

    const deleteButton = (id) => {
        return <button className="button is-small deleteButton" onClick={() => {
            deleteItem(id)
                .then(() => {
                    window.confirm(
                        "Are you sure you want to remove this item?"
                    )
                    getItems().then((data) => setItemsByCategory(data))
                    setRefresh(!refresh)
                })
        }
        }>x</button>
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#131313', 
            color: 'papayawhip'
        },
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setRefresh(!refresh)
        setIsModalOpen(false)
    }

    return (
        <>
            <button className="button is-small" onClick={openModal}>+</button>Add To Your List
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>X</button>
                <div><AddItem setIsModalOpen={setIsModalOpen} closeModal={closeModal} getCategories={getCategories} categories={categories} setCategories={setCategories}/></div>
            </Modal>

            <div className="packListContainer">
                {Object.entries(itemsByCategory).map(([category, items]) => (
                    <>
                        <div key={category.id} className="listItem">
                            <h4 className="packListSubtitle">{category}</h4>
                            <ul>
                                {items.map(item => (
                                    <li className="packListLabel item" key={`item--${item.id}`}>{deleteButton(item.id)}{item.name}</li>
                                ))}
                            </ul>
                            <br></br>

                        </div>


                    </>
                ))}

            </div>
        </>
    );
}