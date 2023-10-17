'use client'



import { Check } from 'phosphor-react'
import styles from './style.module.scss'
import { useState } from 'react'
export function InputAtendente(){
    const [atendente, setAtendente] = useState('')
    return(
        <div className={styles.atendenteContainer}>
            <h1>Atendente:</h1>
            <div>
            <input className={styles.input} type="text" placeholder="Insira o nome do atendente" onChange={(e) => {setAtendente(e.target.value)}}/>
            </div>
        </div>
    )
}