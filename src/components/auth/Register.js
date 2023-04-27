import { useRef } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import roam from "../../assets/roam_video3.mp4"
import "./Login.css"

export const Register = ({ setToken }) => {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const profileImage = useRef()
  const bio = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
        profile_image_url: profileImage.current.value
      }
      registerUser(newUser).then((res) => {
        if ("token" in res) {
          setToken(res.token)
          localStorage.setItem("roam_token", res.token)
          navigate("/")
        }
      })
    } else {
      passwordDialog.current.showModal()
    }
  }

  return (
    <section>
      <div className="myVideo">
        <video autoPlay={true}>
          <source
            src={roam}
            type={roam.type}
          />
          Your browser does not support HTML5 video.
        </video>
      </div>

      <form className="register" onSubmit={handleRegister}>

        <p className="subtitle">Create an account</p>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input className="input" type="text" ref={firstName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" ref={lastName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" ref={email} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  ref={password}
                />
              </p>
            </div>

            <div className="field">
              <p className="control is-expanded">
                <input
                  className="input"
                  type="password"
                  placeholder="Verify Password"
                  ref={verifyPassword}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Bio</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Tell us about yourself..."
              ref={bio}
            ></textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">Profile Image</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Image URL"
              ref={profileImage}
            ></textarea>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-small">
              Submit
            </button>
          </div>
          <div className="control">
            <Link to="/login" className="button is-small">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </section>
  )
}
