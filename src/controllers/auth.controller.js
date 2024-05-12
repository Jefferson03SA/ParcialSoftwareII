import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';




export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved.id });

        res.cookie('token', token);
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });


    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const usuarioEncontrado = await User.findOne({ email });
        if (!usuarioEncontrado) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const isMatch = await bcrypt.compare(password, usuarioEncontrado.password);

        if (!isMatch) return res.status(404).json({
            message: "contraseña incorrecta",
        });

        const token = await createAccessToken({ id: usuarioEncontrado.id });

        res.cookie('token', token);
        res.json({
            id: usuarioEncontrado.id,
            username: usuarioEncontrado.username,
            email: usuarioEncontrado.email,
            createdAt: usuarioEncontrado.createdAt,
            updatedAt: usuarioEncontrado.updatedAt
        });


    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
}
