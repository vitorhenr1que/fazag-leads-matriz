
import styles from './page.module.scss'
import { LeadsBox } from './components/LeadsBox'
import { prisma } from './services/prisma'


export default async function Home() {
  const response = await prisma.leads.findMany()


  return (
    <main className={styles.main}>
        <div className={styles.leadsBoxContainer}>
          {response.map((index, position) => {
            
            return (
              <LeadsBox key={index.id} id={index.id} name={index.nome} course={index.course} contacted={index.contacted} number={index.tel} date={index.data} position={position} countLength={response.length}/> 
            )
          }).reverse()}
        </div>
       
    </main>
  )
}
