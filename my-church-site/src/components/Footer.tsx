"use client";
import { useState } from "react";
import Donations from "./Donations";

export default function Foot() {
  const [showDonate, setShowDonate] = useState(false);
  return (
    <>
      <footer className="p-4 bg-[var(--background)] flex justify-between items-center">
        <p>9241 S D St <br></br>Tacoma, WA 98444 <br></br>United States</p>

        <div className="text-center">

          <p>
            <a
              href="mailto:tacomaRussianASD@gmail.com"
              className="link"
            >Email us at tacomaRussianASD@gmail.com!</a>
          </p>

          <p>
            <a
              href="https://www.facebook.com/tacomarussian/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Find us on Facebook!
            </a>
          </p>
        </div>

        <button
          className="buttonLight"
          onClick={() => setShowDonate(true)}
        >
          Donate
        </button>

      </footer>
      <Donations
        open={showDonate}
        onClose={() => setShowDonate(false)}
      />
    </>
  );
}