import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import roam from "../../assets/roam_video3.mp4"
import "./Login.css"

export const Login = ({ setToken }) => {
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setisUnsuccessful] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    const user = {
      username: username.current.value,
      password: password.current.value
    }
    loginUser(user)
      .then(res => {

        if ("valid" in res && res.valid && "token" in res) {
          setToken(res.token)
          localStorage.setItem("roam_token", res.token)
          navigate("/")
        }
        else {
          setisUnsuccessful(true)
        }
      })
  }

  return (
    <section className="loginForm">

      <div className="homeVideo">
        {/* <img src="https://res.cloudinary.com/dgwi6xvfl/image/upload/v1679018916/Roam/colorado-3_x3q8bq.jpg" /> */}
        <video autoPlay={true}>
          <source
            src={roam}
            type={roam.type}
          />
          Your browser does not support HTML5 video.
        </video>
      </div>
      <form className="login_content" onSubmit={handleLogin}>
        {/* <h1 className="title">Roam</h1> */}
        <p className="subtitle">Create Your Own Road Trip Story</p>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" ref={password} />
          </div>
        </div>

        <div className="buttonContainer">
          <div className="control">
            {/*submission button*/}
            <button className="button is-small" type="submit" >Submit</button>
          </div>
          <div className="control">
            <Link to="/register" className="button is-small">Cancel</Link>
          </div>
        </div>
        {
          isUnsuccessful ? <p className="help">Username or password not valid</p> : ''
        }
      </form>
    </section>
  )
}
