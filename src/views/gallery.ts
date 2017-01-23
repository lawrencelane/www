import keystone = require("keystone");

module.exports = (req, res) => {
    const view = new keystone.View(req, res);
    const locals = res.locals;

    locals.section = "gallery";

    view.query("galleries", keystone.list("Gallery").model.find().sort("sortOrder"));

    view.render("gallery");
};
