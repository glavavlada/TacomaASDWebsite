"use client";

import englishDonations from "@/locale/en/donations.json";
import russianDonations from "@/locale/ru/donations.json";

import { useLanguage } from "@/app/context/LanguageContext";

type DonationPopupProps = {
  open: boolean;
  onClose: () => void;
};

export default function DonationPopup({
  open,
  onClose,
}: DonationPopupProps) {
  if (!open) return null;

  const { language } = useLanguage();
  const t = language === "en"
    ? englishDonations
    : russianDonations;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 text-[var(--textDark)]">

      {/* Popup Content */}
      <div className="popupAppear relative flex w-80 flex-col items-center bg-[var(--buttonLight)] p-6 text-center">

        {/* Close Button */}
        <button className="absolute right-2 top-2 h-8 w-8 buttonDark flex items-center justify-center" onClick={onClose}>
          X
        </button>

        <h2>{t.donations.title}</h2>

        <img
          src="/DonationLink.png"
          alt="Donation QR Code"
          className="my-5 w-[13.75rem] max-w-full rounded-[0.625rem]"
        />

        <a
          href="https://adventistgiving.org/donate/ANIMTR"
          target="_blank"
          rel="noopener noreferrer"
          className="buttonDark px-[1.125rem] py-2.5]"
        >
          {t.donations.button}
        </a>
      </div >
    </div >
  );
}