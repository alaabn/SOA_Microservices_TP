const express = require('express');
const validateJsonSchema = require('../validation/index.js');
const {
  createUser,
  deleteUserById,
  editUserById,
  getUserById,
  getUsers
} = require('../controllers/usersController.js');

const router = new express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', validateJsonSchema("user.create"), createUser);
router.put('/:id', validateJsonSchema("user.update"), editUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
