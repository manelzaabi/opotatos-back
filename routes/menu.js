var express = require('express');
var router = express.Router();
const menuController = require('../controllers/menuController'); // Ensure this path is correct

// Route for getting all menus
router.get('/', menuController.getAllMenus);

// Route for getting items of a specific menu
router.get('/:menuId/items', menuController.getMenuItems);

module.exports = router;
