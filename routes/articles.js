const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

// Route for new.ejs to create new article 
router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

// Route for edit.ejs to edit an existing article
router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article })
})

// Route for Showing saved article by rendering show.ejs
router.get('/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  // if ID not found redirect to index.ejs page
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})

// Route for saving the article 
router.post('/', async (req, res, next) =>{
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res)=>{
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.markdown = req.body.markdown

    try {
      article = await article.save()
      res.redirect(`/articles/${article.id}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}

module.exports = router