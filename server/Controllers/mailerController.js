import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "nodemailer.test.mernshop@gmail.com",
        pass: "12345678nodemailer"
    }
},
    {
        from: "Mernshop mailer <nodemailer.test.mernshop@gmail.com>"
    }
)

export const mailer = message => {
    transporter.sendMail(
        message, (err, info) => {
            if(err) return console.log(err)
            console.log("email sent", info)
        }
    )
}


