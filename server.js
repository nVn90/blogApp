const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

const connection = () => {
mongoose.connect('mongodb://localhost/blogApp', {
// mongoose.connect('mongodb+srv://nVn90:Parker@2021@crud.gscag.mongodb.net/blogApp?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
console.log('Connected with DB')
}
connection()

// Setup view engine
app.set('view engine', 'ejs')

// This allow us to use parameters from the form to Article route
app.use(express.urlencoded({ extended: false }))

// This allow us to override a method in form condition [GET/POST/DELETE/PUT/PATCH]
app.use(methodOverride('_method'))

// Rendering index.ejs file
app.get('/', async (req, res) => {
  //  Finding and Rendering articles on index.ejs page from Article Model
  const articles = await Article.find().sort({ createdAt: 'desc' })
res.render('articles/index' , { articles : articles })
})

// App is using articleRouter which was created in article.js (/articles is prefix before the article page)
app.use('/articles', articleRouter)

app.listen(1990)