import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res, next) => {
    const token = (req.headers.authorization).replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, '~A|1Q5m5ki7Gg4za');

            req.userId = decoded._id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа',
        });
    }
};