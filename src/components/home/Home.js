import "./Home.css"
import roam from "../../assets/roam_video.mp4"

export const Home = () => {

    return (<>
        <div className="home">
            {/* <img src="https://res.cloudinary.com/dgwi6xvfl/image/upload/v1679018916/Roam/colorado-3_x3q8bq.jpg"/> */}
            <div className="homeVideo">
                <video autoPlay={true}>
                    <source
                        src={roam}
                        type={roam.type}
                    />
                    Your browser does not support HTML5 video.
                </video>
            </div>
        </div>
    </>)
}