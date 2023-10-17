'use client'

import styles from './style.module.scss'
import {MdWhatsapp} from 'react-icons/md'
import {IoRadioButtonOff, IoRadioButtonOnOutline} from 'react-icons/io5'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { prisma } from '@/app/services/prisma'
import { PutContacted } from '../PutContacted'


interface LeadsBox {
    id: string;
    name: string;
    course: string;
    number: string;
    contacted: boolean;
    date: Date;
}
  
export function LeadsBox({id, name, course, number, contacted, date}: LeadsBox){

    function nomeTratado(nome: string){
        let nomeSplit = nome.split(' ')
        let primeiraLetra = nomeSplit[0][0].toUpperCase()
        let restanteDoNome = nomeSplit[0].substring(1).toLowerCase()
        let nomeCorreto = primeiraLetra + restanteDoNome
        return nomeCorreto
    }

    function numeroTratado(numero: string){
        let numeroSplit = numero.split(' ')
        let numeroHifen = numeroSplit[1].split('-')
        let ddd = numeroSplit[0][1] + numeroSplit[0][2]
        let numeroCorreto = ddd + numeroHifen[0] + numeroHifen[1]
        return numeroCorreto
    }
    
    const [turno, setTurno] = useState(["bom", "dia"])

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



    useEffect(()=>{
         getHours()   
    },[])

    return (

        <div className={styles.boxContainer}>
           
            <div>
            {contacted === false ? <IoRadioButtonOff size={30}/> : <IoRadioButtonOnOutline color="#5db80d" size={30}/>}
            </div>
            <div className={styles.nomeContainer}>
                <span className={styles.nome}>{nomeTratado(name)}</span>
                <span>{course}</span>
            </div>
            <Link onClick={getHours} href={`https://api.whatsapp.com/send?phone=55${numeroTratado(number)}&text=*Atendente*%0AOl%C3%A1%20${nomeTratado(name)},%20${turno[0]}%20${turno[1]}!`} className={styles.whatsapp}>
                <MdWhatsapp color="white" size={30}/>
            </Link>
        </div>
    )
}