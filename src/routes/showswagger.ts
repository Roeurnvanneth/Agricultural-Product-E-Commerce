

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     Farmer:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           description: The farmer ID
 *         name:
 *           type: string
 *           example: Sok Dara
 *         email:
 *           type: string
 *           example: dara@gmail.com
 *         phone:
 *           type: string
 *           example: "098776655"
 *         address:
 *           type: string
 *           example: Phnom Penh
 *         roles:
 *           type: string
 *           example: farmer
 *         status:
 *           type: string
 *           example: active
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */



/**
 * @swagger
 * /farmers/create-farmer:
 *   post:
 *     summary: Create a new farmer
 *     tags: [Farmers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sok Dara
 *               email:
 *                 type: string
 *                 example: dara@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               phone:
 *                 type: string
 *                 example: "099887766"
 *               address:
 *                 type: string
 *                 example: Phnom Penh
 *     responses:
 *       201:
 *         description: Farmer created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 /**
 * @swagger
 * /farmers:
 *   get:
 *     summary: Get all farmers
 *     tags: [Farmers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all farmers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Farmer'
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /farmers/{id}:
 *   get:
 *     summary: Get a farmer by ID
 *     tags: [Farmers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Farmer ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Farmer found
 *       404:
 *         description: Farmer not found
 */


/**
 * @swagger
 * /farmers/{id}:
 *   get:
 *     summary: Get a farmer by ID
 *     tags: [Farmers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Farmer ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Farmer found
 *       404:
 *         description: Farmer not found
 */



/**
 * @swagger
 * /farmers/{id}:
 *   delete:
 *     summary: Delete a farmer
 *     tags: [Farmers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Farmer ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Farmer deleted successfully
 *       404:
 *         description: Farmer not found
 */

