module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }//this is a function that accepts another function (func), catches the errors and passes it to next.
}