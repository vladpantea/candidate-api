module.exports = class ValidationError{
    constructor(message, err){
        this.message = message;
        this.error = err;
    }
}