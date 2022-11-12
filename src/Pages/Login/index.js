
import './login.css'
import { Logo } from '../../Components/Logo'
import { useState } from 'react'
import { auth } from '../../services/firebaseConection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Input } from '../../Components/Input'
export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    function clickLogin(e){
        e.preventDefault()
        if(email === '' || password === ''){
            alert('Preencha todos os campos')
            return;
        }
        signInWithEmailAndPassword(auth,email,password)
        .then(() => {
            toast.success('Olá mestre')
            navigate('/admin', {replace: true})
        })
        .catch(() => {
            toast.error('Erroooooooooooooooou')
        })
    }


    return(
        <div className='login-container'>
           <Logo/>
           <form className='form' onSubmit={clickLogin}>
            <Input
                type='email'
                placeholder='Digite seu email...'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
            />
              <Input
                type='password'
                placeholder='**********'
                autoComplete='on'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
            />
            <button type='submit' >Acessar</button>
            </form>
        </div>
    )
}