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
    <div className="bg-slate-800 rounded-t-lg text-white w-full">
      <div className="m-auto max-w-5xl text-center py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
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
        <div className="text-sm pt-4">
          <span>
            <FaCopyright className="inline" /> Copyright 2026. All rights
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
