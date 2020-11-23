import * as functions from 'firebase-functions'
import * as express from 'express'
import { isUserAuthorized } from './auth'
import { addEntry, getAllEntries, updateEntry, deleteEntry } from './entryController'
import { doesEntryExist } from './entryMiddleware'

const app = express()

app.get('/', (req, res) => res.status(200).send('Hey there!'))
app.post('/entry', isUserAuthorized, addEntry)
app.get('/entries', isUserAuthorized, getAllEntries)
app.patch('/entries/:entryId', doesEntryExist, isUserAuthorized, updateEntry)
app.delete('/entries/:entryId', doesEntryExist, isUserAuthorized, deleteEntry)

exports.app = functions.https.onRequest(app)
