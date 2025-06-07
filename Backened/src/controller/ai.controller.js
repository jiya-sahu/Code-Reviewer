const aiServices = require("../services/ai.services.js")

module.exports.getReview = async(req,res)=>{
    const code = req.body.code;

    if (!code) {
        return res.status(400).send("prompt is required")
    }

    const response = await aiServices(code);
    res.send(response)
}