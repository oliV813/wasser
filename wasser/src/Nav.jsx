import { Link } from "react-router-dom"

const Nav = () => {


    return (
        <div className="nav">
            <Link className="link" to='/'>Today</Link>
            <Link className="link" to='total'>Total</Link>
        </div>
    )


}


export default Nav