import { Response } from 'express'
import { db } from './config/firebase'

type EntryType = {
  title: string,
  text: string,
  userId: string,
  coverImageUrl: string
}

type Request = {
  body: EntryType,
  params: { userId: string, postId: string }
}

const addEntry = async (req: Request, res: Response) => {
  const { body: { title, text, coverImageUrl }, params: { userId } } = req

  try {
    const entry = db.collection('posts').doc()
    entry.set({
      title, text, userId, coverImageUrl: coverImageUrl || ''
    })
    res.status(200).send({
      status: 'success',
      message: 'entry added successfully',
      data: {
        id: entry.id,
        title,
        text,
        userId,
        coverImageUrl,
      }
    })
  } catch(error) { res.status(500).json(error.message) }
}

export { addEntry }
