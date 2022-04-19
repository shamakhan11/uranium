const myMiddleware= function ( req, res, next) {
    let IP =req.socket.remoteAddress;
    let TIMESTAMP = new Date().toLocaleString();
    let CURRENT_API = "/myMiddleware";
    console.log(TIMESTAMP+" "+","+IP+" "+","+CURRENT_API);
    next()
}


module.exports.myMiddleware= myMiddleware
