import type { NextApiRequest, NextApiResponse } from 'next'
import {z} from 'zod'

//Define a schema for the request body

const formSchema = z.object({
    title: z.string().min(1, 'Title wajib diisi !'),
    description: z.string().min(1, 'Description wajib diisi !'),

})


export default  function handler(req: NextApiRequest, res: NextApiResponse){
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not Allowed' })
    }

    try {
        const validatedData = formSchema.parse(req.body)
        return res
        .status(200)
        .json({message: 'Form submitted successfully', data: validatedData})
        } catch (error) {
        if( error instanceof z.ZodError){
            const { fieldErrors } = error.flatten()
            return res.status(400).json({ errors: fieldErrors })
        }

        return res.status(500).json({message: 'Internal Server Error'})
    }
}