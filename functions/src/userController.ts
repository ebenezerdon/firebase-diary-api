import { Response } from 'express'
import { admin } from './config/firebase'

type UserType = {
  email: string,
  password: string
}

const createUser = async (req: { body: UserType }, res: Response) => {
  const { email, password } = req.body

  try {
    await admin.auth().createUser({ email, password }).catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })
    return res.status(200).send({
      status: 'success',
      message: 'user created successfully',
    })
  } catch(error) { return res.status(500).json(error.message)}
}

export { createUser }
