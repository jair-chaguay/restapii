const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(408).json({ error: 'Token is missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(408).json({ error: 'Token is missing' });
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(408).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};

module.exports = verifyToken;
