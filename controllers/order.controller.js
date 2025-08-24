const db = require("../config/db.config");

const createClientOrder = (req, res) => {
    const { client_id, shop_tool_id, order_date, period, total_price } = req.body;

    if (!client_id || !shop_tool_id || !order_date || !period) {
        return res.status(400).json({
            message: "client_id, shop_tool_id, order_date, and period are required",
            error: "Bad Request"
        });
    }

    db.query(
        `INSERT INTO client_order (client_id, shop_tool_id, order_date, period, total_price) 
         VALUES (?, ?, ?, ?, ?)`,
        [client_id, shop_tool_id, order_date, period, total_price || 0],
        (error, results) => {
            if (error) {
                console.log("Yangi client order qo'shishda xatolik", error);
                return res.status(500).json({
                    message: "Error adding new client order",
                    error: "Internal Server Error"
                });
            }
            res.status(201).json({
                message: "New client order added successfully",
                id: results.insertId
            });
        }
    );
};

const getAllClientOrders = (req, res) => {
    db.query(`SELECT * FROM client_order ORDER BY id`, (error, results) => {
        if (error) {
            console.log("Client orderlarni olishda xatolik", error);
            return res.status(500).json({
                message: "Error retrieving client orders",
                error: "Internal Server Error"
            });
        }
        res.status(200).json({
            message: "Client orders retrieved successfully",
            data: results
        });
    });
};

const getClientOrderById = (req, res) => {
    const { id } = req.params;

    db.query(`SELECT * FROM client_order WHERE id = ?`, [id], (error, results) => {
        if (error) {
            console.log("Client orderni olishda xatolik", error);
            return res.status(500).json({
                message: "Error retrieving client order",
                error: "Internal Server Error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Client order not found",
                error: "Not Found"
            });
        }

        res.status(200).json({
            message: "Client order retrieved successfully",
            data: results[0]
        });
    });
};

const updateClientOrder = (req, res) => {
    const { id } = req.params;
    const { client_id, shop_tool_id, order_date, period, total_price } = req.body;

    db.query(
        `UPDATE client_order SET client_id = ?, shop_tool_id = ?, order_date = ?, period = ?, total_price = ? WHERE id = ?`,
        [client_id, shop_tool_id, order_date, period, total_price, id],
        (error, results) => {
            if (error) {
                console.log("Client orderni yangilashda xatolik", error);
                return res.status(500).json({
                    message: "Error updating client order",
                    error: "Internal Server Error"
                });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: "Client order not found",
                    error: "Not Found"
                });
            }

            res.status(200).json({
                message: "Client order updated successfully",
                id: id
            });
        }
    );
};

const deleteClientOrder = (req, res) => {
    const { id } = req.params;

    db.query(`DELETE FROM client_order WHERE id = ?`, [id], (error, results) => {
        if (error) {
            console.log("Client orderni o'chirishda xatolik", error);
            return res.status(500).json({
                message: "Error deleting client order",
                error: "Internal Server Error"
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: "Client order not found",
                error: "Not Found"
            });
        }

        res.status(200).json({
            message: "Client order deleted successfully",
            id: id
        });
    });
};

module.exports = {
    createClientOrder,
    getAllClientOrders,
    getClientOrderById,
    updateClientOrder,
    deleteClientOrder
};
