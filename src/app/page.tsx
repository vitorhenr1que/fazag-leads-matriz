'use'
import styles from './page.module.scss'
import { InputAtendente } from './components/InputAtendente'
import { LeadsBox } from './components/LeadsBox'
import { prisma } from './services/prisma'



export default async function Home() {
  const response = await prisma.leads.findMany()

  console.log(response)
  return (
    <main className={styles.main}>
        <InputAtendente/>
        <div className={styles.leadsBoxContainer}>
          {response.map((index) => {
            return <LeadsBox key={index.id} id={index.id} name={index.nome} course={index.course} contacted={index.contacted} number={index.tel} date={index.data}/>
          })}
        </div>
       
    </main>
  )
}
