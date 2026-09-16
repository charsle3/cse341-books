import { getAllAuthors, getAuthorById, postAuthor, putAuthor, deleteAuthor } from "../models/authors.js";
import { getBookById } from "../models/books.js";

const getAllAuthorsHandler = async (req, res) => {
    try {
        const authors = await getAllAuthors();
        return res.status(200).json(authors);
    } catch (error) {
        console.error('GET /authors failed', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getAuthorByIdHandler = async (req, res) => {
    try {
        const author = await getAuthorById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        return res.status(200).json(author);
    } catch (error) {
        console.error('GET /authors/:id failed', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const postAuthorHandler = async (req, res) => {
    try {
        const newAuthor = req.body;

        if (!newAuthor || !newAuthor.id || !newAuthor.name || !newAuthor.dob) {
            return res.status(400).json({ message: 'Invalid author data' });
        }

        for (const [key, value] of Object.entries(newAuthor)) {
            if (key !== 'id' && key !== 'name' && key !== 'dob' && key !== 'publications') {
                return res.status(400).json({ message: `Invalid field: ${key}` });
            }
        }

        if (await getAuthorById(newAuthor.id)) {
            return res.status(400).json({ message: 'Author with this ID already exists' });
        }

        if (newAuthor.publications.length > 0) {
            for (const bookId of newAuthor.publications || []) {
                const book = await getBookById(bookId);
                if (!book) {
                    return res.status(400).json({ message: `Book with ID ${bookId} not found` });
                }
            }
        }

        const result = await postAuthor(newAuthor);
        return res.status(201).json(result);
    } catch (error) {
        console.error('POST /authors failed', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const putAuthorHandler = async (req, res) => {
    try {
        const authorId = req.params.id;
        const updatedAuthor = req.body;

        if (!updatedAuthor || !updatedAuthor.name || !updatedAuthor.dob) {
            return res.status(400).json({ message: 'Invalid author data' });
        }

        if (!await getAuthorById(authorId)) {
            return res.status(404).json({ message: 'Author not found' });
        }

        for (const [key, value] of Object.entries(updatedAuthor)) {
            if (key !== 'name' && key !== 'dob' && key !== 'publications') {
                return res.status(400).json({ message: `Invalid field: ${key}` });
            }
        }

        if (updatedAuthor.publications.length > 0) {
            for (const bookId of updatedAuthor.publications || []) {
                const book = await getBookById(bookId);
                if (!book) {
                    return res.status(400).json({ message: `Book with ID ${bookId} not found` });
                }
            }
        }

        const result = await putAuthor(authorId, updatedAuthor);
        return res.status(200).json(result);
    } catch (error) {
        console.error('PUT /authors/:id failed', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteAuthorHandler = async (req, res) => {
    try {
        const authorId = req.params.id;
        const author = await getAuthorById(authorId);

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        if (author.publications.length > 0) {
            return res.status(422).json({ message: 'Cannot delete author with associated books' });
        }

        const result = await deleteAuthor(authorId);

        return res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        console.error('DELETE /authors/:id failed', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { getAllAuthorsHandler, getAuthorByIdHandler, postAuthorHandler, putAuthorHandler, deleteAuthorHandler };