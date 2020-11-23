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
  params: { userId: string, entryId: string }
}

const addEntry = async (req: Request, res: Response) => {
  const { body: { title, text, coverImageUrl }, params: { userId } } = req

  try {
    const entry = db.collection('entries').doc()
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
    const querySnapshot = await db.collection('entries').where('userId', '==', userId).get()
    querySnapshot.forEach((doc: { data: () => any; }) => allEntries.push(doc.data()))
    return res.status(200).json(allEntries)
  } catch(error) { return res.status(500).json(error.message) }
}

const updateEntry = async (req: Request, res: Response) => {
  const { body: { text, coverImageUrl }, params: { userId, entryId } } = req

  try {
    const entry = db.collection('entries').doc(entryId)
    const currentData = (await entry.get()).data()

    if (!currentData) return res.status(404).json({
      status: 'error',
      message: 'entry with provided id not found'
    })

    if (currentData.userId !== userId) return res.status(401).json({
      status: 'error',
      message: 'user unauthorized'
    })

    const entryObject = {
      imageUrl: coverImageUrl || currentData.coverImageUrl,
      text: text || currentData.text,
      userId
    }

    await entry.set(entryObject).catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'entry updated successfully',
      data: entryObject
    })
  } catch(error) { return res.status(500).json(error.message) }
}

export { addEntry, getAllEntries, updateEntry }
