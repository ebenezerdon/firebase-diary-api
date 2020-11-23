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

const getAllEntries = async (req: Request, res: Response) => {
  const { userId } = req.params
  const allEntries: EntryType[] = []

  try {
    const querySnapshot = await db.collection('posts').where('userId', '==', userId).get()
    querySnapshot.forEach((doc: { data: () => any; }) => allEntries.push(doc.data()))
    return res.status(200).json(allEntries)
  } catch(error) { return res.status(500).json(error.message) }
}

export { addEntry, getAllEntries }
