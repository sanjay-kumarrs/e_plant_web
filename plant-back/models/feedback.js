const mongoose = require("mongoose")
const feedbackSchema = mongoose.Schema(
{
    feedbackId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    submittedDate: { type: Date, default: Date.now },
    rating: { type: Number, required: true, min: 1, max: 5 } // Star rating (1-5)
}
)

let feedbackModel = mongoose.model("Feedback", feedbackSchema)
module.exports ={feedbackModel}