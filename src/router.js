import express from 'express';
import { getBooksHandler, 
    getBookByIdHandler, 
    postBookHandler, 
    putBookHandler, 
    deleteBookHandler 
} from './controllers/books.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: b1
 *                   author:
 *                     type: string
 *                     example: George Orwell
 *                   title:
 *                     type: string
 *                     example: 1984
 *                   publicationDate:
 *                     type: string
 *                     example: "1949-06-08"
 *       500:
 *         description: Internal server error
 */
router.get('/books', getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book
 *         schema:
 *           type: string
 *         example: b1
 *     responses:
 *       200:
 *         description: The requested book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: b1
 *                 author:
 *                   type: string
 *                   example: George Orwell
 *                 title:
 *                   type: string
 *                   example: 1984
 *                 publicationDate:
 *                   type: string
 *                   example: "1949-06-08"
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get('/books/:id', getBookByIdHandler);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: b2
 *               authorId:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: Brave New World
 *               publicationDate:
 *                 type: string
 *                 example: "1932-01-01"
 *     responses:
 *       201:
 *         description: The created book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: b2
 *                 authorId:
 *                   type: string
 *                   example: a1
 *                 title:
 *                   type: string
 *                   example: Brave New World
 *                 publicationDate:
 *                   type: string
 *                   example: "1932-01-01"
 *       400:
 *         description: Invalid book data or book with this ID already exists
 *       500:
 *         description: Internal server error
 */
router.post('/books', postBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book
 *         schema:
 *           type: string
 *         example: b1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorId:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: 1984
 *               publicationDate:
 *                 type: string
 *                 example: "1949-06-08"
 *     responses:
 *       200:
 *         description: The updated book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: b1
 *                 authorId:
 *                   type: string
 *                   example: a1
 *                 title:
 *                   type: string
 *                   example: 1984
 *                 publicationDate:
 *                   type: string
 *                   example: "1949-06-08"
 *       400:
 *         description: Invalid book data
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.put('/books/:id', putBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book
 *         schema:
 *           type: string
 *         example: b1
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.delete('/books/:id', deleteBookHandler);

export default router;