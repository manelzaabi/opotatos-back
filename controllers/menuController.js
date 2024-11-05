const db = require('./../helpers/db_helpers');

// Controller function to get all menus
module.exports.getAllMenus = (req, res) => {
    db.query('SELECT menu_id, name, image FROM menu_detail WHERE status = 1', (err, result) => {
        if (err) {
            return res.status(500).json({ status: "0", message: "Erreur lors de la récupération du menu." });
        }
        res.json({ status: "1", payload: result });
    });
};

// Controller function to get items of a specific menu
module.exports.getMenuItems = (req, res) => {
    const menuId = req.params.menuId;

    db.query('SELECT * FROM menu_item_detail WHERE menu_id = ? AND status = 1', [menuId], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "0", message: "Erreur lors de la récupération des articles." });
        }
        res.json({ status: "1", payload: result });
    });
};
