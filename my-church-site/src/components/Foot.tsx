"use client";
import { useState } from "react";
import Link from "next/link";

export default function Foot() {
  const [showDonate, setShowDonate] = useState(false);
  return (
    <>
      <footer className="Footer">
        <p>9241 S D St <br></br>Tacoma, WA 98444 <br></br>United States</p>

        <p>Contact Us at tacomaRussianASD@gmail.com</p>

        <button className="donateButton" onClick={() => setShowDonate(true)}>
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

            <img src="/donationLink.png" alt="Donation QR Code" className="QrCode"
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