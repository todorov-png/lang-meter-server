import nodemailer from 'nodemailer';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link, i18n) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: i18n.t('MAIL_SERVICE.SUBJECT', { link: process.env.CLIENT_URL }),
        text: '',
        html: `
        <center>
          <h3 style="text-align: center;">
            ${i18n.t('MAIL_SERVICE.TEXT', { link: process.env.CLIENT_URL })}
          </h3>
          <a href="${link}" style="display: inline-block; color: white; font-size: 16px; font-weight: 700; background-color: mediumblue; padding: 8px 16px; border-radius: 10px; text-decoration: none;">
            ${i18n.t('MAIL_SERVICE.BUTTON')}
          </a>
        </center>
      `,
      });
    } catch (e) {
      console.log('sendActivationMail', e);
    }
  }
}

export default new MailService();
