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
    <div className="donatePopup">
      <div className="popupContent">
        <button className="closeButton" onClick={onClose}>
          X
        </button>

        <h2>Support Our Church</h2>

        <img
          src="/DonationLink.png"
          alt="Donation QR Code"
          className="qrCode"
        />

        <a
          href="https://adventistgiving.org/donate/ANIMTR"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Donation Link
        </a>
      </div>
    </div>
  );
}