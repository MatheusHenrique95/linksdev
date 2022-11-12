import './logo.css'
import { Link } from 'react-router-dom'

export function Logo(){
    return(
        <Link to={'/'}>
        <div>
            <h1 className='logo'>My<span className='logo-text'>Links</span></h1>
        </div>
        </Link>
    )
}