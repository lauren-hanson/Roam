import roam from "../../assets/roam_video3.mp4"

export const Home = () => {

    return (<>
        <div className="home">
            <div className="homeVideo">
                <video width="100%" height="300" autoPlay loop>
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