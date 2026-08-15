"use client";

type DonationPopupProps = {
  open: boolean;
  onClose: () => void;
};

export default function DonationPopup({
  open,
  onClose,
}: DonationPopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75">

      {/* Popup Content */}
      <div className="popupAppear relative flex w-80 flex-col items-center rounded-2xl bg-[var(--textLight)] p-6 text-center text-[var(--background)]">

        {/* Close Button */}
        <button className="absolute right-4 top-4 h-8 w-8 cursor-pointer rounded-full bg-[var(--background)] text-[var(--textLight)] text-[1.2rem] font-bold transition duration-200 hover:scale-105 hover:bg-[var(--hoverDark)]" onClick={onClose}>
          X
        </button>

        <h2>Support Our Church</h2>

        <img
          src="/DonationLink.png"
          alt="Donation QR Code"
          className="my-5 w-[13.75rem] max-w-full rounded-[0.625rem]"
        />

        <a
          href="https://adventistgiving.org/donate/ANIMTR"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-[var(--background)] px-[1.125rem] py-2.5 text-[var(--textLight)] hover:bg-[var(--hoverDark)]"
        >
          Open Donation Link
        </a>
      </div >
    </div >
  );
}