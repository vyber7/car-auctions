"use client";

import Avatar from "./Avatar";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useRef } from "react";
import type { Url } from "next/dist/shared/lib/router/router";
import { RiHome2Fill } from "react-icons/ri";

function Header(): JSX.Element {
  const { data: session } = useSession();
  const user = session?.user;

  const label = useRef<HTMLLabelElement>(null);
  // Set up ref for nav bar
  const profileLabel = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    /**
     * Handles click outside of the component.
     * If the click is outside of the component and the checkbox is checked, it will click the component.
     * @param event - The MouseEvent object.
     */
    function handleClickOutside(event: MouseEvent) {
      if (label.current && !label.current.contains(event.target as Node)) {
        const checkbox = document.getElementById(
          "checkbox"
        ) as HTMLInputElement;
        if (checkbox?.checked) label.current.click();
      }

      if (
        profileLabel.current &&
        !profileLabel.current.contains(event.target as Node)
      ) {
        const checkbox = document.getElementById(
          "profile-box"
        ) as HTMLInputElement;
        if (checkbox?.checked) profileLabel.current.click();
      }
    }

    document.addEventListener("click", handleClickOutside);

    /*  
    
    // Hide header on scroll down and show on scroll up
    //let prevScrollPos = window.scrollY;
    // Get the nav bar element

    window.onscroll = function () {
      const currentScrollPos = window.scrollY;
      if (header.current) {
        if (prevScrollPos > currentScrollPos) {
          header.current.classList.remove("hidden");
        } else {
          header.current.classList.add("hidden");
        }
      }
      prevScrollPos = currentScrollPos;
    };

    // Hide header on swipe up and show on swipe down
    // Set initial position and direction
    let startY: number | undefined = 0;
    let direction = "";

    // Add touchstart event listener
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0]?.clientY;
    };
    document.addEventListener("touchstart", handleTouchStart);

    // Add touchmove event listener
    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY;
      // Determine swipe direction
      if (currentY && startY) {
        if (currentY < startY) {
          direction = "up";
        } else {
          direction = "down";
        }
      }
    };
    document.addEventListener("touchmove", handleTouchMove);

    // Add touchend event listener
    const handleTouchEnd = () => {
      // If swipe up, hide nav bar
      if (header.current) {
        if (direction === "up") {
          header.current.classList.add("hidden");
        }
        // If swipe down, show nav bar
        else if (direction === "down") {
          header.current.classList.remove("hidden");
        }
      }
    };
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchend", handleTouchEnd);

    // Cleanup 
    
    */
    return () => {
      document.removeEventListener("click", handleClickOutside);
      // document.removeEventListener("touchstart", handleTouchStart);
      // document.removeEventListener("touchmove", handleTouchMove);
      // document.removeEventListener("touchend", handleTouchEnd);
      // window.onscroll = null;
    };
  }, [label]);

  const navLinks = [
    { name: "Submit a vehicle", href: "/submit-listing" },
    { name: "Auctions", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const profileLinks = [
    { name: "Profile", href: "/account/profile" },
    { name: "Notifications", href: "/account/notifications" },
    { name: "My Listings", href: "/account/listings" },
    { name: "My Bids & Wins", href: "/account/bids-and-wins" },
    { name: "My Shipments", href: "/account/shipments" },
  ];

  /*const styleClasses = {
    navLinks:
      "absolute right-full top-11 w-2/4 transition-all peer-checked:right-2/4 peer-checked:top-11 md:w-1/3 md:peer-checked:right-2/3 lg:static lg:flex lg:w-auto lg:justify-end lg:gap-2 lg:peer-checked:static lg:peer-checked:flex",
    navLink:
      "block w-full bg-green-200 p-2 text-left text-sm font-bold text-green-600 transition hover:bg-green-400 hover:text-green-100 lg:inline-block lg:w-32 lg:rounded lg:p-1 lg:text-center",
    profileLinks:
      "absolute left-full top-11 w-2/4 transition-all peer-checked:left-2/4 peer-checked:top-11 md:w-1/3 md:peer-checked:left-2/3 ",
    profileLink:
      "block w-full bg-green-200 p-2 text-left text-sm font-bold text-green-600 transition hover:bg-green-400 hover:text-green-100 lg:inline-block lg:w-32 lg:rounded lg:p-1 lg:text-center",
  };*/

  return (
    <div className="fixed shadow left-0 top-0 z-50 w-full p-2 bg-white">
      <div className="m-auto max-w-5xl">
        {/*<Image src="/images/logo.jpg" alt="Logo" width={70} height={50} />*/}
        <nav id="" className="flex justify-between">
          <label
            ref={label}
            htmlFor="checkbox"
            className="py-0.5 lg:hidden cursor-pointer"
          >
            &#9776;
          </label>
          <input type="checkbox" id="checkbox" className="peer hidden" />

          <div
            className="absolute right-full bg-white top-0 flex h-screen w-3/4 flex-col shadow lg:shadow-none rounded-r-lg p-2 transition-all peer-checked:right-1/4 peer-checked:top-0 
                          md:w-1/3 md:peer-checked:right-2/3 lg:static 
                          lg:h-auto lg:w-full lg:flex-row lg:justify-end lg:p-0 "
          >
            <div className="lg:flex lg:gap-1">
              {user && (
                <div className="relative lg:order-2">
                  <label
                    ref={profileLabel}
                    htmlFor="profile-box"
                    className="peer flex gap-2 hover:cursor-pointer"
                  >
                    <Avatar user={user} />
                    <span className="p-1 align-text-bottom text-sm font-bold ">
                      {user.email}
                    </span>
                  </label>
                  <input
                    type="checkbox"
                    id="profile-box"
                    className="peer hidden"
                  />
                  <hr className="mb-2 mt-2 lg:hidden" />
                  <div className="lg:absolute lg:right-0 lg:shadow bg-white lg:top-9 lg:p-2 lg:hidden lg:rounded lg:w-full lg:lg:peer-checked:block">
                    {profileLinks.map((link) => (
                      <Link
                        href={link.href as Url}
                        key={link.name}
                        className="block w-full rounded p-2 text-left text-sm font-bold transition hover:bg-gray-100 lg:w-full lg:text-center"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <button
                      className="hidden rounded w-full p-2 text-left text-sm font-bold transition hover:bg-gray-100 lg:block lg:w-full lg:p-1 lg:text-center"
                      onClick={() => void signOut()}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
              {user && <hr className="mb-2 mt-2 lg:hidden" />}
              <Link href="/">
                <RiHome2Fill className="hidden text-2xl transition hover:bg-gray-100 lg:inline-block lg:text-center" />
              </Link>
              {navLinks.map((link) => (
                <Link
                  href={link.href as Url}
                  key={link.name}
                  className="block w-full rounded p-2 text-left text-sm font-bold transition hover:bg-gray-100 lg:inline-block lg:w-32 lg:p-1 lg:text-center"
                >
                  {link.name}
                </Link>
              ))}

              {!user ? (
                <button
                  className="block w-full rounded p-2 text-left text-sm font-bold transition hover:bg-gray-100 lg:inline-block lg:w-32 lg:p-1 lg:text-center"
                  onClick={() => void signIn()}
                >
                  Sign in
                </button>
              ) : (
                <button
                  className="block w-full rounded p-2 text-left text-sm font-bold transition hover:bg-gray-100 lg:hidden"
                  onClick={() => void signOut()}
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
