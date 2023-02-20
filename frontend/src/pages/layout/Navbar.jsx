import { Link, NavLink } from 'react-router-dom'
import LogInOut from '../../components/LogInOut'

function Navbar() {
    return (
        <div className="header">
            <div className="header-container">
                <h2><Link to={'/'}>List App</Link></h2>
                <ul className="nav">
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/about'}>About</NavLink></li>
                    <li><LogInOut /></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar