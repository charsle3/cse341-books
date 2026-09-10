import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

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

export default router;