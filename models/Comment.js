const {Schema, model} = require('mongoose')

const schema = new Schema({
    content: {type: String, required: true},
    // На чьей странице находится комментарий
    pageId: { type: Scheme.Types.ObjectId, ref: 'User', required: true },
    // Кто оставил комментарий
    userId: { type: Scheme.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: { createdAt: 'created_at'}
})

module.exports = model('Comment', schema)