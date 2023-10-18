
import styles from './page.module.scss'
import { InputAtendente } from './components/InputAtendente'
import { LeadsBox } from './components/LeadsBox'
import { prisma } from './services/prisma'

async function PutContacted(id: string, contacted: boolean){


  const response = await prisma.leads.update({
       where: {
           id: id
       },
       data: {
           contacted: !contacted
       }
   })
   console.log(response)
}

export default async function Home() {
  const response = await prisma.leads.findMany()

  console.log(response)
  return (
    <main className={styles.main}>
        <div className={styles.leadsBoxContainer}>
          {response.map((index, position) => {
            return (
              <LeadsBox key={index.id} id={index.id} name={index.nome} course={index.course} contacted={index.contacted} number={index.tel} date={index.data} position={position}/> 
            )
          })}
        </div>
       
    </main>
  )
}
