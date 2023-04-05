import { Roam } from "./Roam"
import { createRoot } from "react-dom/client"
import "./index.css"
import roam from "./assets/roam_video2.mp4"


import { BrowserRouter } from "react-router-dom"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Roam />
    </BrowserRouter>
)

