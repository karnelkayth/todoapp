const express = require('express')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()

const sendmail = async (user, otp) => {


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
            subject: "tudo app", // subject line
            text: "tudo app trial", // plain text body
            html: `
            <h1 style="margin:0;">OTP Verification</h1>
            <p style="
            color:#666;
            font-size:15px;
            line-height:1.6;
          ">
            Use the verification code below to complete your sign in.
            This OTP is valid for only 2 minutes.
          </p>
          <h1 style="color: #6C66EC;">${otp}</h1>
            `, // HTML body
        });
        return {
            status: true,
            message: 'Mail send successfully'
        }
        
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: `Error while sending mail ${error}`
        }
    }

}
module.exports = sendmail