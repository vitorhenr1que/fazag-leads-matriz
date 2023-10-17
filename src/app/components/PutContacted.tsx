
import { prisma } from "../services/prisma";

export async function PutContacted(id: string, contacted: boolean){


   const response = await prisma.leads.update({
        where: {
            id: id
        },
        data: {
            contacted: !contacted
        }
    })
    return response
}