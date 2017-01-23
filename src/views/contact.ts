import keystone = require("keystone");
const Enquiry = keystone.list("Enquiry");

module.exports = (req, res) => {
    const view = new keystone.View(req, res);
    const locals = res.locals;

    locals.section = "contact";
    locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
    locals.formData = req.body || {};
    locals.validationErrors = {};
    locals.enquirySubmitted = false;

    view.on("post", {action: "contact"}, (next) => {
        const newEnquiry = new Enquiry.model();
        const updater = newEnquiry.getUpdateHandler(req);

        updater.process(req.body, {
            errorMessage: "There was a problem submitting your enquiry:",
            fields: "name, email, phone, enquiryType, message",
            flashErrors: true,
        }, (err) => {
            if (err) {
                locals.validationErrors = err.errors;
            } else {
                locals.enquirySubmitted = true;
            }
            next();
        });
    });

    view.render("contact");
};
