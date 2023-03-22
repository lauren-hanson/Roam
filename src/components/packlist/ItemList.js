import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getItems, addNewItem } from "../../managers/ItemManager"
import { AddItem } from "./AddItem"
import Modal from 'react-modal'
import "./PackList.css"

export const ItemList = () => {
    let subtitle;
    const navigate = useNavigate()

    // const [isModalOpen, setIsModalOpen] = useState(false)


    // const customStyles = {
    //     content: {
    //         top: '50%',
    //         left: '50%',
    //         right: 'auto',
    //         bottom: 'auto',
    //         marginRight: '-50%',
    //         transform: 'translate(-50%, -50%)',
    //     },
    // }

    // const openModal = () => {
    //     setIsModalOpen(true)
    // }

    // const afterOpenModal = () => {
    //     subtitle.style.color = '#f00'
    // }

    // const closeModal = () => {
    //     setIsModalOpen(false)
    // }

    const [itemsByCategory, setItemsByCategory] = useState({})

    useEffect(() => {
        getItems()
            .then((itemArr) => setItemsByCategory(itemArr))
    }, [])

    // const handleNewItemInfo = () => {

    //     const newItem = {
    //         name: itemsByCategory.name
    //     }

    //     addNewItem(newItem).then(() => {
    //         getItems()
    //     })
    // }

    // const saveNewItem = () => {

    // }

    return (
        <>
            <button
                className="button is-small"
                onClick={() => {
                    navigate(`/packlist/add`)
                }}>+</button>Add To Your List

            <div className="packListContainer">
                {Object.entries(itemsByCategory).map(([category, items]) => (
                    <>
                        <div key={category} className="listItem">
                            <h4 className="packListSubtitle">{category}</h4>
                            <ul>
                                {items.map(item => (
                                    <li className="packListLabel" key={item.id}>{item.name}</li>
                                ))}
                            </ul>
                            <br></br>

                            {/* <button class="button" onClick={openModal}>Open Modal</button>
                            <Modal
                                isOpen={isModalOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                                <button onClick={closeModal}>close</button>
                                <div>Add Item</div>
                                <form>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={handleNewItemInfo}

                                    />
                                    <button onClick={saveNewItem}>Save</button>
                                </form>
                            </Modal> */}
                        </div>


                    </>
                ))}
            </div>
        </>
    );
}