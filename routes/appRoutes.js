const db = require('../models');
const cheerio = require('cheerio');
const axios = require('axios');

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/scrape', (req, res) => {
        axios.get('https://na.leagueoflegends.com/en/news/').then(response => {

            const $ = cheerio.load(response.data);
            const result = {};

            $('.panelizer-view-mode').each(function (i, element) {

                result.title = $(this)
                    .find('h4')
                    .children('a')
                    .text();
                result.link = 'https://na.leagueoflegends.com/en/news' + $(this)
                    .find('h4')
                    .children('a')
                    .attr('href');
                result.summary = $(this)
                    .find('.teaser-content')
                    .children('.field')
                    .text();
                result.img = 'https://na.leagueoflegends.com/en/news' + $(this)
                    .find('.file-image')
                    .children('img')
                    .attr('src')

                db.Article.create(result)
                    .then(dbArticle => console.log(dbArticle))
                    .catch(err => console.log(err));
            })
            res.redirect('/articles');
        });
    });

    app.get('/articles', (req, res) => {
        db.Article.find({})
            .then(dbArticle => {
                const article = {
                    article: dbArticle
                }
                console.log(article)
                res.render('articles', article);
            })
            .catch(err => res.render('error'))
    });

    app.get('/savedArticles', (req, res) => {
        db.Article.find({saved: true })
            .then(dbArticle => {
                const saved = {
                    article: dbArticle
                }
                res.render('savedArticles', saved)
            })
            .catch(err => res.render('error'))
    });

    app.get('/savedArticles/:id', (req, res) => {
        db.Article.findOne({
            _id: req.params.id
        })
            .populate('Comment')
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.render('error'))
    });

    app.post('/savedArticles/:id', (req, res) => {
        db.Comment.create(req.body)
            .then(dbComment => db.Article.findOneAndUpdate({
                _id: req.params.id
            },
                {
                    $set: {
                        comment: dbComment
                    }
                }))
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err))
    });
};