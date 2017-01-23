import keystone = require("keystone");
import * as middleware from "./middleware";

const importRoutes = keystone.importer(__dirname);

keystone.pre("routes", middleware.initLocals);
keystone.pre("render", middleware.flashMessages);

const routes = {
    views: importRoutes("./views"),
};

module.exports = (app) => {
    app.get("/", routes.views.index);
    app.get("/blog/:category?", routes.views.blog);
    app.get("/blog/post/:post", routes.views.post);
    app.get("/gallery", routes.views.gallery);
    app.all("/contact", routes.views.contact);
};
