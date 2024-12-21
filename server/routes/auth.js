import e from "express";
import { register, login, logout } from "../controllers/auth.js";

// Creating router instance
const router = e.Router();

router.post('/login', login);
// router.post('/register', (req, res, next) => {
//     res.send('register route');
// });

// after transferring the logic in auth.js/controllers and importing register, doing the same post request as above but with imported function register.
router.post('/register', register);

router.post('/logout', logout);

export default router;