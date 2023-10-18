import { prisma } from "@/app/services/prisma"
import { NextRequest } from "next/server"

export async function POST(request: Request) {
  const res = await request.json()
  
  const response = await prisma.leads.update({
    where: {
        id: res.id
    },
    data: {
        contacted: !res.contacted
    }
})
  return Response.json({ response })
}