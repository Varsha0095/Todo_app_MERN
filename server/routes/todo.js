import e, { Router } from "express";
import { getAllTodos, getTodo, addTodo, updateTodo, deleteTodo } from "../controllers/todo.js";
import { verifyToken } from "../utils/verify.js";

const router = Router();

router.get('/', verifyToken, getAllTodos);

router.get('/:id', verifyToken, getTodo);

router.post('/', verifyToken, addTodo);

router.put('/:id', verifyToken, updateTodo);

router.delete('/:id', verifyToken, deleteTodo);

// router.get('/', (req, res, next) => {
//     res.send('all todos');
// });
// router.post('/', (req, res, next) => {
//     res.send('created todo');
// });
// router.put('/:id', (req, res, next) => {
//     console.log(req.params.id);
//     res.send(req.params.id);
// });
// // for individual todo
// router.get('/:id', (req, res, next) => {
//     console.log(req.params.id);
//     res.send(`get todo with id ${req.params.id}`);
// });
// router.delete('/:id', (req, res, next) => {
//     console.log(req.params.id);
//     res.send(`delete todo with id ${req.params.id}`);
// });

export default router;