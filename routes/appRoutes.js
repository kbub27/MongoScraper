const db = require('../models');
const cheerio = require('cheerio');
const axios = require('axios');

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/articles', (req, res) => {
        axios.get('https://na.leagueoflegends.com/en/news/').then(response => {

            const $ = cheerio.load(response.data);

            $('.panelizer-view-mode').each(function (i, element) {
                const result = {};

                result.title = $(this)
                    .find('h4')
                    .children('a')
                    .text();
                result.link = $(this)
                    .find('h4')
                    .children('a')
                    .attr('href');

                db.Article.create(result)
                    .then(dbArticle => console.log(dbArticle))
                    .catch(err => console.log(err));
            })
            res.render('articles');
        })
    });

    app.get('/articles/:id', (req, res) => {
        db.Article.findOne({
            _id: req.params.id
        })
            .populate('Comment')
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err))
    });

    app.post('/articles/:id', (req, res) => {
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