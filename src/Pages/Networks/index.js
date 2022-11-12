import './networks.css'

import { useState, useEffect } from 'react'
import { Header } from '../../Components/Header'
import { Input } from '../../Components/Input'
import { MdAddLink } from 'react-icons/md'
import { toast } from 'react-toastify'
import { Logo } from '../../Components/Logo'

import { bd } from '../../services/firebaseConection'
import {
    doc,
    setDoc,
    getDoc
} from 'firebase/firestore'

export default function Networks(){

    const [github, setGithub] = useState('')
    const [instagram, setInstagram] = useState('')
    const [linkedIn, setLinkedIn] = useState('')

    useEffect(() => {
        function loadLinks(){

            const docRef = doc(bd, 'social', 'links')
            getDoc(docRef)

            .then((snapshot) => {
              
                if(snapshot.data() !== undefined){
                    setGithub(snapshot.data().Github)
                    setInstagram(snapshot.data().Instagram)
                    setLinkedIn(snapshot.data().LinkedIn)
                }
                
            })

        };

        loadLinks();

    }, [])

    function handleSave(e){
        e.preventDefault();
  
        setDoc(doc(bd, 'social', 'links'), {
            Github: github,
            Instagram: instagram,
            LinkedIn: linkedIn
        })
        .then(() => {
            console.log('Foi meu prc')
            toast.success('Links salvos')
        })
        .catch((error) => {
            console.log('Iiiih deu errado ' + error)
            toast.error('Deu error por isso ' + error)
        })
    }

    return (
        <div className='admin-container'>
            <Header/>

            <Logo/>

            <h1 className='title-social'>Redes sociais</h1>

            <form className='form' >
                <label className='label'>Link do Github</label>
                    <Input
                    placeholder="Digite a url do Github..."
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                />

                <label className='label'>Link do Intagram</label>
                    <Input
                    placeholder="Digite a url do Intagram..."
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label className='label'>Link do LinkedIn</label>
                    <Input
                    placeholder="Digite a url do LinkedIn..."
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                />

                <button className='btn-register' type='submit' onClick={handleSave}>
                    Salvar links <MdAddLink size={25} color="#fff" />
                </button>

            </form>
        </div>
    )
}