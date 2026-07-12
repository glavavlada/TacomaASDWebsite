"use client";
import { useState } from "react";
import Link from "next/link";

export default function Foot() {
  const [showDonate, setShowDonate] = useState(false);
  return (
    <>
      <footer className="Footer">
        <p>9241 S D St <br></br>Tacoma, WA 98444 <br></br>United States</p>

        <div className="contactSection">

          <p>
            <a
              href="mailto:tacomaRussianASD@gmail.com"
              className="footerLink"
            >Email us at tacomaRussianASD@gmail.com!</a>
          </p>

          <p>
            <a
              href="https://www.facebook.com/tacomarussian/"
              target="_blank"
              rel="noopener noreferrer"
              className="footerLink"
            >
              Find us on Facebook!
            </a>
          </p>
        </div>

        <button
          className="donateButton"
          onClick={() => setShowDonate(true)}
        >
          Donate
        </button>

      </footer>
      {showDonate && (
        <div className="donatePopup">
          <div className="popupContent">
            <button className="closeButton" onClick={() => setShowDonate(false)} >
              X
            </button>

            <h2>Support Our Church</h2>

            <img src="/DonationLink.png" alt="Donation QR Code" className="qrCode"
            />

            <a href="https://adventistgiving.org/donate/ANIMTR" target="_blank" rel="noopener noreferrer">
              Open Donation Link
            </a>

          </div>

        </div>
      )}
    </>
  );
}