import { BreadCrumb, Button } from "components";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { icons } from "utils";
import emailjs from "@emailjs/browser";
import { isEmpty, isVietnamesePhoneNumberValid } from "utils/helper";
const { FaStreetView, BsCheckLg, AiOutlineMail, HiPhone } = icons;
const Contact = () => {
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
  };

  const handleSubmitContact = (e) => {
    e.preventDefault();
    if (
      !isEmpty(name) ||
      !isEmpty(email) ||
      !isEmpty(phoneNumber) ||
      !isEmpty(message)
    ) {
      toast.warn("Missing input !!!");
    }

    if (!isVietnamesePhoneNumberValid(phoneNumber)) {
      toast.warn("Invalid phone number !!!");
    } else {
      emailjs
        .sendForm(
          "service_nlgw95c",
          "template_51o6nfd",
          form.current,
          "IP_cqbbvhfF63vlNy"
        )
        .then(
          (result) => {
            if (result.text === "OK") {
              toast.success("Send email success !");
              reset();
            }
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };
  return (
    <div className="w-full">
      <header className="bg-[#f7f7f7] mt-[-20px] p-[15px] flex items-center justify-center">
        <div className="w-main">
          <h3 className="font-semibold text-[18px] mb-[10px]">CONTACT US</h3>
          <BreadCrumb title="Contact" category="Contact" />
        </div>
      </header>
      <div className="w-full xl:w-main flex justify-center m-auto mt-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.8700607541073!2d108.24393001102294!3d16.020278284588134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421753b2ee29bd%3A0xc863a4e2a2f4bc01!2zMyBOxrDhu5tjIE3hurduIDQsIEtodcOqIE3hu7ksIE5nxakgSMOgbmggU8ahbiwgxJDDoCBO4bq1bmcsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1694310904948!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="w-full xl:w-main md:flex-col md:gap-5 flex justify-between m-auto mt-5">
        <div className="flex flex-col gap-3 md:w-full w-1/2 text-[#505050] text-sm">
          <p>
            Sed vestibulum faucibus felis, sit amet facilisis tellus. Aliquam
            erat volutpat. Sed consectetur ipsum velit, quis rhoncus libero
            egestas eget
          </p>
          <ul className="flex flex-col">
            <li className="flex gap-3">
              <FaStreetView color="red" /> Address: 474 Ontario St Toronto, ON
              M4X 1M7 Canada
            </li>
            <li className="flex gap-3">
              <BsCheckLg color="red" /> Opening hours:
              <ul className="flex flex-col">
                <li>Mon-Fri : 11.00 - 20.00</li>
                <li>Sat: 10.00 - 20.00</li>
                <li>Sun: 19.00 - 20.00</li>
              </ul>
            </li>
            <li className="flex items-center gap-3">
              <AiOutlineMail color="red" /> Email:
              nguyendoquangminh222@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <HiPhone color="red" />
              Phone: (+84)76 366 8006
            </li>
          </ul>
        </div>
        <div className="w-1/2 md:w-full">
          <form onSubmit={handleSubmitContact} ref={form}>
            <div className="flex justify-between gap-2 w-full">
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="bg-[#f6f6f6] px-[10px] py-[8px] w-1/2 focus:border-sky-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-[#f6f6f6] px-[10px] py-[8px] w-1/2 "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-2">
              <input
                type="text"
                placeholder="Phone Number"
                email="phoneNumber"
                name="phoneNumber"
                className="bg-[#f6f6f6] px-[10px] py-[8px] w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              id=""
              cols="30"
              rows="5"
              className="bg-[#f6f6f6] w-full px-[10px] py-[8px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <Button
                type="submit"
                style="w-[70px] flex items-center my-2 py-[10px] justify-center bg-red-500 text-white gap-3 hover:bg-black hover:duration-500"
              >
                SEND
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
