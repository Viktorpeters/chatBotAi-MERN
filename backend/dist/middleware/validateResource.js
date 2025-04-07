const validateResource = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        next();
    }
    catch (error) {
        res
            .status(400)
            .json({
            message: "An error occurred while parsing",
            error: error.errors,
        });
    }
};
export default validateResource;
//# sourceMappingURL=validateResource.js.map