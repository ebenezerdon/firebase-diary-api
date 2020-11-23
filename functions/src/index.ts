import * as functions from 'firebase-functions'
import * as express from 'express'
import { isUserAuthorized } from './auth'
import { addEntry, getAllEntries, updateEntry } from './entryController'

const app = express()

app.get('/', (req, res) => res.status(200).send('Hey there!'))
app.post('/entry', isUserAuthorized, addEntry)
app.get('/entries', isUserAuthorized, getAllEntries)
app.patch('/entried/:entryId', isUserAuthorized, updateEntry)

exports.app = functions.https.onRequest(app)
