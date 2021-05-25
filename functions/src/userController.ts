import { Response } from 'express'
import { admin } from './config/firebase'

type UserType = {
  email: string,
  password: string
}

const createUser = async (req: { body: UserType }, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({
      status: 'error',
      message: 'email and password required'
    })
  }

  try {
    const user = await admin.auth().createUser({ email, password })
    const customToken = await admin.auth().createCustomToken(user.uid)

    return res.status(200).send({
      status: 'success',
      message: 'user created successfully',
      data: {
        customToken
      }
    })
  } catch(error) { return res.status(500).json({
    status: 'error',
    message: error.message
  })}
}

export { createUser }
