import Link from "next/link";
import {
  FaCopyright,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-100">
      <div className="m-auto max-w-5xl px-2 py-5 text-center">
        <div className="{styles.top} ">
          <h3 className="pb-5">Sign up for our weekly newsletter!</h3>
          <label htmlFor="{styles.sign_up_email}"></label>
          <input
            id="{styles.sign_up_email}"
            className="w-full border px-3 py-1 text-2xl placeholder:italic placeholder:opacity-50 focus:outline-none md:w-1/2"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <button
            id=""
            type="submit"
            className="w-full border px-3 py-1 text-2xl transition md:w-1/4"
          >
            Sign up
          </button>
        </div>
        <div className="my-5 flex flex-col gap-6 border-y py-5 md:flex-row md:justify-between">
          <div className=" flex justify-center">
            <Link href="/" className="px-2">
              Home
            </Link>
            <Link href="/about" className="px-2">
              About
            </Link>
            <Link href="/faq" className="px-2">
              FAQ
            </Link>
            <Link href="/contact" className="px-2">
              Contact
            </Link>
          </div>
          <div className="flex justify-center text-2xl">
            <a
              className="px-2"
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              className="px-2"
              href="https://www.twitter.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              className="px-2"
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              className="px-2"
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className="text-sm">
          <span>
            <FaCopyright className="inline" /> Copyright 2021. All rights
            reserved.
          </span>
          <span className="block">
            <Link href="/terms">Terms </Link>|
            <Link href="/privacy"> Privacy</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
