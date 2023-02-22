export default function Login() {
  return(
    <div className="login-wrapper">
        <h1>Hi! 안녕하세요! Please log in to Fearless Fitness Tracker</h1>
        <form>
            <label>
                <p>Username</p>
                <input type="text" />
            </label>
            <label>
                <p>Password</p>
                <input type="password" />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}