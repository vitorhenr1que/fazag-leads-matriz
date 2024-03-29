'use client';

import styles from './style.module.scss'
import {MdWhatsapp} from 'react-icons/md'
import {IoRadioButtonOff, IoRadioButtonOnOutline} from 'react-icons/io5'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { api } from '@/app/services/api'


interface LeadsBox {
    id: string;
    name: string;
    course: string;
    number: string;
    contacted: boolean;
    date: Date;
    position: number;
    countLength: number;

}
  
export function LeadsBox({id, name, course, number, contacted, date, position, countLength}: LeadsBox){

    function nomeTratado(nome: string){
        let nomeSplit = nome.split(' ')
        let primeiraLetra = nomeSplit[0][0].toUpperCase()
        let restanteDoNome = nomeSplit[0].substring(1).toLowerCase()
        let nomeCorreto = primeiraLetra + restanteDoNome
        
        return nomeCorreto
    }

    function numeroTratado(numero: string){
        if(numero == ''){
            return '(00) 0000-0000'
        }

        let numeroSplit = numero.split(' ')

        console.log(numeroSplit[1].split('-').join(''))

        let numeroHifen = numeroSplit[1].split('-').join('')
        let ddd = numeroSplit[0][1] + numeroSplit[0][2]
        let numeroCorreto = ddd + numeroHifen
        return numeroCorreto
    }
    
    const [turno, setTurno] = useState(["bom", "dia"])
    const [toggle, setToggle] = useState(contacted)
    const [atendente, setAtendente] = useState('')
    
    function getHours(){
        const horario = new Date().getHours()
        if(horario >= 0 && horario <=11){
            setTurno(["bom", "dia"])
        }
        else if(horario >= 12 && horario <=17){
            setTurno(["boa", "tarde"])
        }
        else if(horario >= 18 && horario <=23){
            setTurno(["boa", "noite"])
        }
    }

    const alterarContato = async () => {
        await api.post('updatecontacted', {
            id,
            contacted
        })
        console.log('entrou na função!')
        setToggle(!toggle)
    }

    const [linkWhatsapp, setLinkWhatsapp] = useState(`https://api.whatsapp.com/send?phone=55${numeroTratado(number)}&text=*${atendente}:*%0AOl%C3%A1%20${nomeTratado(name)},%20${turno[0]}%20${turno[1]}!`)

        const [savedAtendent, setSavedAtendent] = useState('Matrículas')
        const [atendentName, setAtendentName] = useState('Matrículas')
    
    
    
    
    const handleChange = (nomeAtendente: string) => {
        const newAtendent = nomeAtendente
        setAtendentName(newAtendent)
        if (typeof window !== 'undefined') {
        window.localStorage.setItem('nomeDoAtendent', newAtendent)

        setSavedAtendent(newAtendent);
        window.localStorage.setItem('actualAtendent', `https://api.whatsapp.com/send?phone=55${numeroTratado(number)}&text=*${newAtendent}:*%0AOl%C3%A1%20${nomeTratado(name)},%20${turno[0]}%20${turno[1]}!`);

        console.log(savedAtendent, 'Esse é o atendente')
        window.location.reload()
         }
      };




    useEffect(()=>{
        setSavedAtendent(localStorage.getItem('actualAtendent') || '')
        setAtendentName(localStorage.getItem('nomeDoAtendent') || '')
         getHours()   
         setLinkWhatsapp(`https://api.whatsapp.com/send?phone=55${numeroTratado(number)}&text=*${atendentName}:*%0AOl%C3%A1%20${nomeTratado(name)},%20${turno[0]}%20${turno[1]}!`)
    },[number, atendentName, name])

    return position === countLength - 1 ? (
        <>
        <div className={styles.atendenteContainer}>
            <h1>Atendente: {atendentName}</h1>
           
            <div className={styles.divAtendentContainer}>
                <input className={styles.input} type="text" placeholder="Insira o nome do atendente" onChange={(e) => {setAtendente(e.target.value)} }/>
                <button className={styles.setNameButton} onClick={() => handleChange(atendente)}>Definir</button>
            </div>
            
        </div>

        <div className={styles.boxContainer}>
           
            <div onClick={alterarContato} className={styles.circleContacted}>
            {toggle === false ? <IoRadioButtonOff size={30}/> : <IoRadioButtonOnOutline color="#5db80d" size={30}/>}
            </div>
            <div className={styles.nomeContainer}>
                <span className={styles.nome}>{nomeTratado(name)}</span>
                <span>{course}</span>
            </div>
            <Link target='_blank' onClick={getHours} href={linkWhatsapp} className={styles.whatsapp}>
                <MdWhatsapp color="white" size={30}/>
            </Link>
        </div>
        </>
    ) : 
    (
        <>
        
        <div className={styles.boxContainer}>
           
        <div onClick={alterarContato} className={styles.circleContacted}>
        {toggle === false ? <IoRadioButtonOff size={30}/> : <IoRadioButtonOnOutline color="#5db80d" size={30}/>}
        </div>
        <div className={styles.nomeContainer}>
            <span className={styles.nome}>{nomeTratado(name)}</span>
            <span>{course}</span>
            </div>
            <Link target='_blank' onClick={getHours} href={linkWhatsapp} className={styles.whatsapp}>
                <MdWhatsapp color="white" size={30}/>
            </Link>
        </div>
        </>
    )
}