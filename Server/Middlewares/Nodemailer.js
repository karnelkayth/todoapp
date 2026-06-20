const express = require('express')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()

const sendmail = async (user, url, subject) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.APP_EMAIL_ADDRESS,
            pass: process.env.APP_PASSWORD,
        },
    });

    try {

        const info = await transporter.sendMail({
            from: `${process.env.APP_EMAIL_ADDRESS}`, // sender address
            to: `${user?.email}`, // list of recipients
            subject: `${subject}`, // subject line
            html: `
                    <p style="color: #6C66EC;">${url}</p>
            `,
        });
        return {
            status: true,
            message: 'Mail send successfully'
        }

    } catch (error) {
        return {
            status: false,
            message: `Error while sending mail ${error}`
        }
    }

}
module.exports = sendmail