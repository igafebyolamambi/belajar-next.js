import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

// Define schema
const formSchema = z.object({
  title: z.string().min(1, 'Title wajib diisi!'),
  description: z.string().min(1, 'Description wajib diisi!')
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    // Validasi data dari body
    const validatedData = formSchema.parse(req.body)

    // Kirim data ke API eksternal
    const response = await fetch(`${process.env.API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validatedData)
    })

    const data = await response.json()

    if (data.success) {
      return res.status(201).json({
        message: 'Form submitted successfully',
        data: validatedData
      })
    } else {
      return res.status(400).json({
        message: 'Failed to submit form',
        errors: data.errors || null
      })
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      // Ambil error menggunakan flatten()
      const formattedErrors: Record<string, string[] | undefined> = error.flatten().fieldErrors

      // Ubah menjadi Record<string, string>
      const errors = Object.keys(formattedErrors).reduce(
        (acc: Record<string, string>, key: string) => {
          acc[key] = formattedErrors[key]?.[0] || 'Unknown error'
          return acc
        },
        {} as Record<string, string>
      )

      return res.status(400).json({ errors })
    }

    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
