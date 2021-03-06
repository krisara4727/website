if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}



const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')


const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')


app.set('view engine', 'ejs')
// all the server needs will be from views folder
app.set('views',__dirname+ '/views')
// all the html ,css styling from this layout without duplicate everytime we want
app.set('layout','layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true,useUnifiedTopology:true})

const db = mongoose.connection
db.on('error', error =>  console.error(error))
db.once('open', () => console.log('connected to database'))

app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)

app.listen(process.env.PORT || 3000)
