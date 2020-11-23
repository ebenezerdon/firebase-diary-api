import { Request, Response } from "express"
import { admin } from './config/firebase'

const errorMessage = {
  status: 'error',
  message: 'user unauthorized'
}

const isUserAuthorized = async (req: Request, res: Response, next: Function) => {
  const token = req.headers.authorization

  if (!token) return res.status(401).json(errorMessage)

  try {
    const decodedToken: admin.auth.DecodedIdToken =
      await admin.auth().verifyIdToken(token)
    req.params.userId = decodedToken.uid
    return next()
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'unauthorized'
    })
  }
}

export { isUserAuthorized }
