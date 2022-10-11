const router = require('express').Router();
const mongoose = require('mongoose');
const Article = require('../models/Article');
const articles = require('../testData/AcceptedArticlesTest.json');
const client = require('../config/dbClient');
const database = client.db("SPEED");
const activePaper = database.collection("Test Active Paper");


router.get("/search", async (req, res) => {
    try {
        const page = parseInt(req.query.page) -1 || 0;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search || "";
        let sort = req.query.sort || "title";

        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const articles = await Article.find({ name: { $regex: search, $options: "i"}})
            .sort(sortBy)
            .skip(page*limit)
            .limit(limit);

        const total = await Article.countDocuments({
            name: { $regex: search, $options: "i"}
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            articles
        }

        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({error: true});
    }
});

// const insertArticles = async () => {
//     try {
//         console.log(articles);
//         const docs = await activePaper.insertMany(articles);
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };

// insertArticles()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err));
module.exports = router;