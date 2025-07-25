import nodemailer from "nodemailer";
import ejs from "ejs";

class MailService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail({
    to,
    subject,
    otp,
    name,
    authType,
  }: {
    to: string;
    subject: string;
    otp: string;
    name: string;
    authType: "Login" | "Signup";
  }) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: await ejs.renderFile("mail/templates/otp.ejs", {
          name: name,
          authType: authType,
          otp: otp,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  }

  async sendSubscriptionConfirmation({ to }: { to: string }) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Thank You for Subscribing!",
        html: await ejs.renderFile("mail/templates/subscribe.ejs"),
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default MailService;
