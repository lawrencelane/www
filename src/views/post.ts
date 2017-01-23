const keystone = require("keystone");

module.exports = (req, res) => {

    const view = new keystone.View(req, res);
    const locals = res.locals;

    locals.section = "blog";
    locals.filters = {
        post: req.params.post,
    };
    locals.data = {
        posts: [],
    };

    view.on("init", (next) => {
        const q = keystone.list("Post").model.findOne({
            state: "published",
            slug: locals.filters.post,
        }).populate("author categories");

        q.exec((err, result) => {
            locals.data.post = result;
            next(err);
        });
    });

    view.render("post");
};
