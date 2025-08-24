const {
    createClientOrder,
    getAllClientOrders,
    getClientOrderById,
    updateClientOrder,
    deleteClientOrder
} = require("../controllers/order.controller");

const router = require("express").Router();

router.post("/", createClientOrder);
router.get("/", getAllClientOrders);
router.get("/:id", getClientOrderById);
router.put("/:id", updateClientOrder);
router.delete("/:id", deleteClientOrder);

module.exports = router;