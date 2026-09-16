import { getDb } from "../db/connect.js";

const getAllAuthors = async () => {
  const db = getDb();
  const collection = db.collection('authors');
  const authors = await collection.find({}).toArray();
  return authors;
}

const getAuthorById = async (authorId) => {
    const db = getDb();
    const collection = db.collection('authors');
    const author = await collection.findOne({ id: authorId });
    return author;
}

const postAuthor = async (author) => {
    const db = getDb();
    const collection = db.collection('authors');
    const result = await collection.insertOne(author);
    return result;
}

const putAuthor = async (authorId, updatedAuthor) => {
    const db = getDb();
    const collection = db.collection('authors');
    const result = await collection.updateOne({ id: authorId }, { $set: updatedAuthor });
    return result;
}

const deleteAuthor = async (authorId) => {
    const db = getDb();
    const collection = db.collection('authors');
    const result = await collection.deleteOne({ id: authorId });
    return result;
}

export { getAllAuthors, getAuthorById, postAuthor, putAuthor, deleteAuthor };