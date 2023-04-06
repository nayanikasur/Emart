import axios from "axios";
import React from "react";
import { useState } from "react";

const Contact = () => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [purpose, setPurpose] = useState();
  const [yourMessage, setYourMessage] = useState();

  function send() {
    console.log("SEND");
    const data = {
      userName,
      email,
      purpose,
      yourMessage,
    };
    console.log({
      userName,
      email,
      purpose,
      yourMessage,
    });
    axios.post("https://localhost:7262/api/Contact/create", data).then((response)=>{
      if(response.data) {
        alert("Message sent")
      } else {
        alert("Error occurred")
      }
    });
  }

  return (
    <>
      <section className="mb-4">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Contact us
        </h2>

        <p className="text-center w-responsive mx-auto mb-5">
          Do you have any questions? Please do not hesitate to contact us
          directly. Our team will come back to you within a matter of hours to
          help you.
        </p>
        <div className="row d-flex align-items-start border p-4 mx-3">
          <div className="col mx-5 px-5 d-flex flex-column justify-content-center">
            <form id="contact-form" name="contact-form">
              <div className="row">
                <div className="col-md-6">
                  <div className="md-form mb-0 m-3">
                    <label for="userName" className="">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      className="form-control"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="md-form mb-0 m-3">
                    <label for="email" className="">
                      Your email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 ">
                  <div className="md-form mb-0 m-3">
                    <label for="purpose" className="">
                      Purpose
                    </label>
                    <input
                      type="text"
                      id="purpose"
                      name="purpose"
                      className="form-control"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="md-form m-3">
                    <label for="message">Your message</label>
                    <textarea
                      type="text"
                      id="message"
                      name="message"
                      rows="2"
                      className="form-control md-textarea "
                      value={yourMessage}
                      onChange={(e) => setYourMessage(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
            <div className="text-center text-md-left">
              <button className="btn btn-primary m-3" onClick={() => send()}>
                Send
              </button>
            </div>
          </div>
          <div className="col d-flex justify-content-center ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.686769616413!2d77.63087401426333!3d12.927842419336152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae149ad041545b%3A0xe93fe1db4028bce0!2sSafesend%20Technologies%20Private%20Limited!5e0!3m2!1sen!2sin!4v1679998235288!5m2!1sen!2sin"
              width="400"
              height="270"
              allowfullscreen=""
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="status"></div>
        </div>
      </section>
    </>
  );
};

export default Contact;
