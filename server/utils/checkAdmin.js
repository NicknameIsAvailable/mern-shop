import jwt from "jsonwebtoken";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res, next) => {
    const token = (req.headers.authorization).replace(/Bearer\s?/, '')
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmZkZWFhMTA1NzZmMjg5ZGRhZmVmZGQiLCJpYXQiOjE2NjA4MzQyNDcsImV4cCI6MTY2MzQyNjI0N30.FLOVuQUJtDJidFYTG8Xgs-skINlnSsa1SyitomYAcPE'

    if (token) {
        try {
            const decoded = jwt.verify(token, '~A|1Q5m5ki7Gg4za');
            const adminDecoded = jwt.verify(adminToken, '~A|1Q5m5ki7Gg4za')

            req.user = decoded._id
            req.admin = adminDecoded._id

            if (req.user !== req.admin) {

                return res.status(403).json({
                    message: 'у вас недостаточно прав',
                })
            }
            next()
        } catch (err) {
            return res.status(403).json({
                message: 'Нет доступа',
            })
        }
    } else {
        return res.status(403).json({
            message: "нет доступа"
        })
    }
}