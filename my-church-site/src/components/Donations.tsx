"use client";

import { useEffect } from "react";
import Image from "next/image";

import englishDonations from "@/locale/en/donations.json";
import russianDonations from "@/locale/ru/donations.json";

import { useLanguage } from "@/app/context/LanguageContext";

// defining the props for the DonationPopup component
type DonationPopupProps = {
  open: boolean;
  onClose: () => void;
};

// DonationPopup component definition and props destructuring
export default function DonationPopup({
  open,
  onClose,
}: DonationPopupProps) {
  // get the current language from the context
  const { language } = useLanguage();
  // choose translation file
  const t = language === "en"
    ? englishDonations
    : russianDonations;

  // adds an event listener for the Escape key to close the popup
  // runs once the popup is rendered
  useEffect(() => {
    // if not open, do not add event listener
    if (!open) return;

    // esc key listener
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    // adding the event listener to the document
    document.addEventListener("keydown", handleEscape);

    // cleanup function to remove the event listener when the popup is closed
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]); // dependency array. re-runs on changes to open or onClose

  // if the popup is not open, do not render
  if (!open) return null;

  return (
    // Overlay
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 text-[var(--textDark)]"
      onClick={onClose} // listens for clicks on the overlay to close the popup
    >

      {/* Popup Content */}
      <div
        className="popupAppear relative flex w-80 flex-col items-center bg-[var(--buttonLight)] p-6 text-center"
        onClick={(event) => event.stopPropagation()} // prevents the click within the popup from bubbling up to the overlay
      >

        {/* Close Button */}
        <button
          className="absolute right-2 top-2 h-8 w-8 buttonDark flex items-center justify-center"
          onClick={onClose} // calls onClose
        >
          X
        </button>

        <h2>{t.donations.title}</h2>

        <Image
          src="/DonationLink.png"
          alt="Donation QR Code"
          width={500}
          height={500}
          className="my-5 w-[13.75rem]"
        />

        <a
          href="https://adventistgiving.org/donate/ANIMTR"
          target="_blank"
          rel="noopener noreferrer"
          className="buttonDark px-[1.125rem] py-2.5]"
        >
          {t.donations.button}
        </a>
      </div>
    </div>
  );
}
