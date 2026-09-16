import { getAllBooks, 
    getBookById, 
    postBook,
    putBook,
    deleteBook
 } from "../models/books.js";

const getBooksHandler = async (req, res) => {
    try {
        const allBooks = await getAllBooks();
        return res.status(200).json(allBooks);
    } catch (error) {
        console.error('GET /books failed', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getBookByIdHandler = async (req, res) => {
    try {
        const book = await getBookById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        return res.status(200).json(book);
        
        
    } catch (error) {
        console.error('GET /books:id failed', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const postBookHandler = async (req, res) => {
    try {
        const newBook = req.body;

        if (!newBook || !newBook.id || !newBook.authorId || !newBook.title || !newBook.publicationDate) {
            return res.status(400).json({ message: 'Invalid book data' });
        }

        if (await getBookById(newBook.id)) {
            return res.status(400).json({ message: 'Book with this ID already exists' });
        }

        for (const [key, value] of Object.entries(newBook)) {
            if (key !== 'id' && key !== 'authorId' && key !== 'title' && key !== 'publicationDate') {
                return res.status(400).json({ message: `Invalid field: ${key}` });
            }
        }

        // CHECK FOR AUTHOR EXISTENCE

        const result = await postBook(newBook);

        // UPDATE AUTHOR'S BOOKS ARRAY

        return res.status(201).json(result);

    } catch (error) {
        console.error('POST /books failed', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const putBookHandler = async (req, res) => {
    try {
        const bookId = req.params.id;
        const updatedBook = req.body;

        if (!updatedBook || !updatedBook.authorId || !updatedBook.title || !updatedBook.publicationDate) {
            return res.status(400).json({ message: 'Invalid book data' });
        }

        if (!await getBookById(bookId)) {
            return res.status(404).json({ message: 'Book not found' });
        }

        for (const [key, value] of Object.entries(updatedBook)) {
            if (key !== 'authorId' && key !== 'title' && key !== 'publicationDate') {
                return res.status(400).json({ message: `Invalid field: ${key}` });
            }
        }

        // CHECK FOR AUTHOR EXISTENCE

        const result = await putBook(bookId, updatedBook);

        // UPDATE AUTHOR'S BOOKS ARRAY IF AUTHOR ID CHANGED

        return res.status(200).json(result);

    } catch (error) {
        console.error('PUT /books:id failed', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteBookHandler = async (req, res) => {
    try {
        const bookId = req.params.id;

        const result = await deleteBook(bookId);

        if (!result.deletedCount) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // UPDATE AUTHOR'S BOOKS ARRAY

        return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('DELETE /books:id failed', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { getBooksHandler, getBookByIdHandler, postBookHandler, putBookHandler, deleteBookHandler };