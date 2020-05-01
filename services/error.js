const handleValidationError = function (err) {
    let messages = [];
    for (let field in err.errors) {
        messages.push(err.errors[field].message)
    }
    return messages;
}

module.exports = { handleValidationError }
