"use client";

export default function Footer() {
  return (
    <>
      <footer className="p-4 bg-[var(--main)] flex justify-between gap-10 items-center">
        <p>9241 S D St Tacoma, WA 98444, United States</p>

        <div className="text-right">
          <p>
            Find us on {" "}
            <a
              href="https://www.facebook.com/tacomarussian/"
              target="_blank"
              rel="noopener noreferrer"
              className="link break-all">
              Facebook
            </a>
          </p>

          <p>
            Contact us at {" "}
            <a
              href="mailto:tacomaRussianASD@gmail.com"
              className="link break-all">
              tacomaRussianASD@gmail.com
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}