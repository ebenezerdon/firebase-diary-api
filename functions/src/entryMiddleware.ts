import { Request, Response } from "express"
import { db } from './config/firebase'

const doesEntryExist = async (req: Request, res: Response, next: Function) => {
  const { entryId, userId } = req.params
  const entry = await db.collection('entries')
      .where('id', '==', entryId).where('userId', '==', userId)
      .get()
  if (entry.empty) return res.status(404).json({
    status: 'error',
    message: 'entry not found'
  })
  return next()
}

export { doesEntryExist }
