import { getAllBooks } from "../models/books.js";

const getBooksHandler = async (req, res) => {
    try {
        const allBooks = await getAllBooks();
        return res.status(200).json(allBooks);
    } catch (error) {
        console.error('GET /books failed', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { getBooksHandler };