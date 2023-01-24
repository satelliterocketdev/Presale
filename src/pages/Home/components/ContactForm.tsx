import './ContactForm.scss';

import * as React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import SuccessIcon from '../../../assets/img/tx-success.png';
import ErrorIcon from '../../../assets/img/tx-error.png';

const ContactForm = () => {
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [sending, setSending] = React.useState<boolean>(false);

  function sendMail() {
    if (name.trim().length === 0 || email.trim().length === 0 || message.trim().length === 0) {
      toast.error('Name, email address, and message are required.', {
        hideProgressBar: true,
        icon: () => <img src={ErrorIcon} alt="" />,
      });
      return;
    }
    setSending(true);
    axios.post('https://private.joystickgames.com/api/admin/HAkdnFlJ4ReLnXJw/email/contactus', {
      from: email,
      name,
      text: message
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data && res.data.result) {
          toast.success('Your email has been sent!', {
            hideProgressBar: true,
            icon: () => <img src={SuccessIcon} alt="" />,
          });
          setName('');
          setEmail('');
          setMessage('');
        } else {
          toast.error('Something went wrong!', {
            hideProgressBar: true,
            icon: () => <img src={ErrorIcon} alt="" />,
          });
        }
      })
      .catch(err => {
        toast.error(err.toString(), {
          hideProgressBar: true,
          icon: () => <img src={ErrorIcon} alt="" />,
        });
      })
      .finally(() => {
        setSending(false);
      });
  }

  return (
    <section className="contact-form-section">
      <div className='grid-part'>
        <div className='left-part'>
          <h2>Contact Us</h2>
          <p>
            Get in touch with Joystick Games today by shooting us a message!
          </p>
        </div>
        <div className='right-part'>
          <div className='name-email'>
            <label>
              <span>Name *</span>
              <input value={name} disabled={sending} onChange={e => setName(e.target.value)} />
            </label>
            <label>
              <span>Email *</span>
              <input type='email' value={email} disabled={sending} onChange={e => setEmail(e.target.value)} />
            </label>
          </div>
          <label style={{ paddingTop: 20 }}>
            <span>Message *</span>
            <textarea value={message} disabled={sending} onChange={e => setMessage(e.target.value)} />
          </label>
          <button className='send-button' disabled={sending} onClick={sending ? () => {return;} : sendMail}>Send</button>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
