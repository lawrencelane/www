import _ = require("lodash");

const initLocals = (req, res, next) => {
    res.locals.navLinks = [
        { label: "Home", key: "home", href: "/" },
        { label: "Blog", key: "blog", href: "/blog" },
        { label: "Projects", key: "gallery", href: "/gallery" },
        { label: "Contact", key: "contact", href: "/contact" },
    ];
    res.locals.user = req.user;
    next();
};

const flashMessages = (req, res, next) => {
    const flashMessages = {
        error: req.flash("error"),
        info: req.flash("info"),
        success: req.flash("success"),
        warning: req.flash("warning"),
    };
    res.locals.messages = _.some(flashMessages, (msgs) => { return msgs.length; })
        ? flashMessages : false;
    next();
};

const requireUser = (req, res, next) => {
    if (!req.user) {
        req.flash("error", "Please sign in to access this page.");
        res.redirect("/keystone/signin");
    } else {
        next();
    }
};

export {
    initLocals,
    flashMessages,
    requireUser,
};
