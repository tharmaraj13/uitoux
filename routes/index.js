var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2/promise');
router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var connection;

async function connect() {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'uitoux'
    });
}

router.get('/view-category', async (req, res) => {
    try {
        if (!connection) {
            await connect();
        }
        let [data] = await connection.query("SELECT * from categories");
        res.send(data);
    }
    catch (e) {
        res.send({
            status: 'error',
            message: e
        });
    }
});
router.post('/create-category', async (req, res) => {
    try {
        if (!connection) {
            await connect();
        }
        let [data] = await connection.query("SELECT * from categories where category_name=?", [req.body.category_name]);
        if (data.length > 0) {
            res.send({
                status: 'error',
                message: 'Category name already Exist'
            });
        }
        else {
            await connection.query("INSERT INTO categories (category_name) VALUES (?)", [req.body.category_name]);
            res.send({
                status: 'success',
                message: 'Category Created Successfully'
            });
        }
    }
    catch (e) {
        res.send({
            status: 'error',
            message: e
        });
    }
});
router.post('/add-product', async (req, res) => {
    try {
        if (!connection) {
            await connect();
        }
        let [data] = await connection.query("SELECT * from products where prod_name=?", [req.body.prod_name]);
        if (data.length > 0) {
            res.send({
                status: 'error',
                message: 'Product name already Exist'
            });
        }
        else {
            await connection.query("INSERT INTO products (category_id,prod_name,part_code,discount_price,fixed_price,status) VALUES (?,?,?,?,?,?)",
                [req.body.category_id, req.body.prod_name, req.body.part_code, req.body.discount_price, req.body.fixed_price, req.body.status]);
            res.send({
                status: 'success',
                message: 'Product Created Successfully'
            });
        }
    }
    catch (e) {
        res.send({
            status: 'error',
            message: e
        });
    }
});
router.get('/view-product', async (req, res) => {
    try {
        if (!connection) {
            await connect();
        }
        let [data] = await connection.query(`SELECT t1.*,t3.category_name,(SELECT AVG(stars) FROM reviews WHERE t2.prod_id) AS review 
        FROM products t1
        LEFT JOIN reviews t2 ON t2.prod_id = t1.prod_id
        LEFT JOIN categories t3 ON t3.category_id=t1.category_id
        GROUP BY prod_id;`);
        res.send(data);
    }
    catch (e) {
        res.send({
            status: 'error',
            message: e
        });
    }
});
router.post('/view-product', async (req, res) => {
    try {
        if (!connection) {
            await connect();
        }
        let [data] = await connection.query(`SELECT t1.*,t3.category_name,(SELECT AVG(stars) FROM reviews WHERE t2.prod_id) AS review 
        FROM products t1
        LEFT JOIN reviews t2 ON t2.prod_id = t1.prod_id
        LEFT JOIN categories t3 ON t3.category_id=t1.category_id
        where status=? GROUP BY prod_id`, [req.body.status]);
        res.send(data);
    }
    catch (e) {
        res.send({
            status: 'error',
            message: e
        });
    }
});
router.post('/add-review', async (req, res) => {
    try {
        if (!connection) {
            await connect();
        }
        let [data] = await connection.query("SELECT * from reviews where prod_id=? and user_id=?", [req.body.prod_id, req.body.user_id]);
        if (data.length > 0) {
            await connection.query("UPDATE reviews SET stars=? where prod_id=? and user_id=?",
                [req.body.stars, req.body.prod_id, req.body.user_id]);
            res.send({
                status: 'success',
                message: 'Review Updated Successfully'
            });
        }
        else {
            await connection.query("INSERT INTO reviews (prod_id,user_id,stars) VALUES (?,?,?)",
                [req.body.prod_id, req.body.user_id, req.body.stars]);
            res.send({
                status: 'success',
                message: 'Review Added Successfully'
            });
        }
    }
    catch (e) {
        res.send({
            status: 'error',
            message: e
        });
    }
});
router.post('/add-cart', async (req, res) => {
    try {
        if (!connection) {
            await connect();
        }
        let [data] = await connection.query("SELECT * from cart where prod_id=? and user_id=?", [req.body.prod_id, req.body.user_id]);
        if (data.length > 0) {
            res.send({
                status: 'success',
                message: 'Item Already Added'
            });
        }
        else {
            await connection.query("INSERT INTO cart (prod_id,user_id) VALUES (?,?)",
                [req.body.prod_id, req.body.user_id]);
            res.send({
                status: 'success',
                message: 'Item Added Successfully'
            });
        }
    }
    catch (e) {
        res.send({
            status: 'error',
            message: e
        });
    }
});
router.post('/view-cart', async (req, res) => {
    try {
        if (!connection) {
            await connect();
        }
        let [data] = await connection.query(`SELECT COUNT(cart_id) AS total,(
            SELECT SUM(pr.discount_price)
            FROM cart ca, products pr
            WHERE pr.prod_id=ca.prod_id AND ca.user_id=?) AS value
            FROM cart
            WHERE user_id=?`, [req.body.user_id, req.body.user_id]);
        res.send(data);
    }
    catch (e) {
        res.send({
            status: 'error',
            message: e
        });
    }
});
module.exports = router