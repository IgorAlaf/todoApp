import nodemailer from 'nodemailer'

class MailService {
  constructor() {
    this.transport = nodemailer.createTransport({
      host: 'smtp.gmail.com', //.env file
      port: 587, //.env file
      secure: false,
      auth: {
        user: 'igos2006@gmail.com', //.env file
        pass: 'qxjmetadeczpetve' //.env file
      }
    })
  }
  async sendActivationMail(to, link) {
    await this.transport.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Activate account on ' + process.env.API_URL,
      text: '',
      html: `
        <div>
          <h1>To activate your account follow the link</h1>
          ${link}
        </div>
      `
    })
  }
  async sendCodeToChangePass(to, code) {
    await this.transport.sendMail({
      from: 'igos2006@gmail.com',
      to: to,
      subject: 'password recovery on todoApp',
      text: `Code: ${code}`
    })
  }
}

export default new MailService()
