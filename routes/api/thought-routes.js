const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

//const {create} = require('../../models/Thought');

// /api/thoughts/<userId>
router.route('/').get(getAllThoughts);
router.route('/:thoughtId').get(getThoughtById).put(updateThought);
router.route('/:userId').post(addThought);
router.route('/:userId/:thoughtId').delete(removeThought);

router.route('/:thoughtId/reactions').put(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;