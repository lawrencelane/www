import keystone = require("keystone");
import * as async from "async";
import * as express from "express";

module.exports = (req: express.Request, res: express.Response) => {
    const view = new keystone.View(req, res);
    const locals = res.locals;

    locals.section = "blog";
    locals.filters = {
        category: req.params.category,
    };
    locals.data = {
        posts: [],
        categories: [],
    };

    view.on("init", (next) => {
        keystone.list("PostCategory").model.find().sort("name").exec((err, results) => {
            if (err || !results.length) {
                return next(err);
            }

            locals.data.categories = results;

            // Load the counts for each category
            async.each(locals.data.categories, (category: any, next) => {

                keystone.list("Post").model.count().where("categories").in([category.id])
                    .exec((err, count) => {
                        category.postCount = count;
                        next(err);
                    });

            }, (err) => {
                next(err);
            });
        });
    });

    view.on("init", (next) => {
        if (req.params.category) {
            keystone.list("PostCategory")
                .model.findOne({key: locals.filters.category})
                .exec((err, result) => {
                    locals.data.category = result;
                    next(err);
                });
        } else {
            next();
        }
    });

    view.on("init", (next) => {
        const q = keystone.list("Post").paginate({
            perPage: 10,
            maxPages: 10,
            filters: {
                state: "published",
            },
        })
            .sort("-publishedDate")
            .populate("author categories");
        
        if (locals.data.category) {
            q.where("categories").in([locals.data.category]);
        }

        q.exec((err, results) => {
            locals.data.posts = results;
            next(err);
        });
    });

    view.render("blog");
};
