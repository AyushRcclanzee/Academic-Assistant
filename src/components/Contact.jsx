import { useRef, useState } from 'react'
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { slideIn } from '../utils/motion';
import contact from "../assets/contact.svg";

const Contact = () => {
    const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_jmdwfec",  //service ID
        "template_sqxx5zw", //template ID
        {
          from_name: form.name,
          to_name: "Md Samir",
          from_email: form.email,
          to_email: "aec.cse.samir@gmail.com",
          message: form.message,
        },
        "HwKt4x6yV3aXegbFZ" //public key
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };
  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col gap-10 overflow-hidden w-[100vw] max-xs:w-[90vw] justify-center`}>
        <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        initial="hidden"
        animate="show"
        className="flex-[0.75] bg-darkGrey p-8 max-xs:p-6 rounded-2xl ml-8 max-xs:ml-8"
      >
        <p className="sectionSubText">Get in touch</p>
        <h3 className="sectionHeadText">Contact</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 max-xs:mt-6 flex flex-col gap-8 max-xs:gap-6"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4 max-xs:mb-2">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-darkPrimary py-4 px-6 max-xs:py-2 max-xs:px-4 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4 max-xs:mb-2">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className="bg-darkPrimary py-4 px-6 max-xs:py-2 max-xs:px-4 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4 max-xs:mb-2">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What you want to say?"
              className="bg-darkPrimary py-4 px-6 max-xs:py-2 max-xs:px-4 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-darkPrimary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      {window.screen.width > 750 
      &&
        <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        initial="hidden"
        animate="show"
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] mt-40"
        >
        <img src={contact} alt="contact" />
      </motion.div>
      }
    </div>
  )
}

export default Contact