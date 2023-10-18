'use client'
import Link from "next/link";
import { MdWhatsapp } from "react-icons/md";
import styles from './style.module.scss'
import {useEffect} from 'react'

interface linkWhatsappProps {
    linkWhatsapp: string;
    getHours: () => void;
}



export function LinkWhatsApp({linkWhatsapp, getHours}: linkWhatsappProps){



       const linkDoWhatsapp = linkWhatsapp
       console.log(linkWhatsapp)
    
    return (
        <>
            <Link onClick={getHours} href={linkWhatsapp} className={styles.whatsapp}>
                <MdWhatsapp color="white" size={30}/>
            </Link>
        </>
    )
}