import "./Home.css"
import roam from "../../assets/roam_video3.mp4"

export const Home = () => {

    return (<>
        <div className="home">
            <div className="homeVideo">
                <video autoPlay={true} loop={true}>
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