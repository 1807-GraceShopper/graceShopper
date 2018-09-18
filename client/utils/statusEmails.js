import sendMail from '../../server/email.js'

// export default function mailer(type, email) {
//   let created = {
//     from: '"Kicks <graceShopper1807@gmail.com>',
//     to: email,
//     subject: 'Hello',
//     text: 'Order Created',
//     html: '<b>Hello world?</b>'
//   }
//   let processing = {
//     from: '"Kicks <graceShopper1807@gmail.com>',
//     to: email,
//     subject: 'Hello',
//     text: 'Order Processing',
//     html: '<b>Hello world?</b>'
//   }
//   let cancelled = {
//     from: '"Kicks <graceShopper1807@gmail.com>',
//     to: email,
//     subject: 'Hello',
//     text: 'Order Cancelled',
//     html: '<b>Hello world?</b>'
//   }
//   let completed = {
//     from: '"Kicks <graceShopper1807@gmail.com>',
//     to: email,
//     subject: 'Hello',
//     text: 'Order Completed',
//     html: '<b>Hello world?</b>'
//   }
//   switch (type) {
//     case 'Created':
//       return sendMail.sendMail(created)
//     case 'Processing':
//       return sendMail.sendMail(processing)
//     case 'Cancelled':
//       return sendMail.sendMail(cancelled)
//     case 'Completed':
//       return sendMail.sendMail(completed)
//     default:
//       return null
//   }
// }
