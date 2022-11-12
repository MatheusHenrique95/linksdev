
import './home.css'

import { useEffect, useState } from 'react'
import { bd } from '../../services/firebaseConection'
import{ 
    getDocs,
    query,
    collection,
    orderBy,
    doc,
    getDoc
 } from 'firebase/firestore'

import { Logo } from '../../Components/Logo'
import { Social } from '../../Components/Social'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Home(){

    const [links, setLinks] = useState([])
    const [socialLinks, setSocialLinks] = useState({})

    useEffect(() => {

        function loadLinks(){

            const linksRef = collection(bd, 'links')
            const queryRef = query(linksRef, orderBy('created', 'asc'))

            getDocs(queryRef)
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        color: doc.data().color,
                        bg: doc.data().bg,
                        url: doc.data().url
                    })
                })
                setLinks(lista)
            })
          

        }

        loadLinks()

    }, [])

    useEffect(() => {
        function loadSocialLinks(){

            const docRef = doc(bd, 'social', 'links')
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setSocialLinks({
                        Github: snapshot.data().Github,
                        Instagram: snapshot.data().Instagram,
                        LinkedIn: snapshot.data().LinkedIn
                    })
                }

            })

        }

        loadSocialLinks()
    }, [])

    return(
        <div className='home-container'>

            <Logo/>

          <h1>Matheus Henrique</h1>
          <span>Cheque meus trabalhos 🔽</span>

          <main className='links'>
            {links.map((item) => (
                <section key={item.id} className='link-area' style={{backgroundColor: item.bg}}>
                    <a href={item.url} target="blank">
                        <p style={{color: item.color}} className='link-text'>{item.name}</p>
                    </a>
                </section>
            ))}
            
            {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
                <footer>
                    <Social url={socialLinks?.Github}>
                        <FaGithub size={35} color="#fff" />
                    </Social>
                    <Social url={socialLinks?.Instagram}>
                        <FaInstagram size={35} color="#fff" />
                    </Social>
                    <Social url={socialLinks?.LinkedIn}>
                        <FaLinkedin size={35} color="#fff" />
                    </Social>
                </footer>
            )}
            
          </main>
        </div>
    )
}