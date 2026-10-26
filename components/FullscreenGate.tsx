
"use client";

import { useState } from "react";
import Menu from "@/components/Menu";

export default function FullscreenGate() {
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");

  async function enterExperience() {
    setError("");

    // Fullscreen harus dipanggil langsung dari interaksi tombol.
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      setError(
        "Fullscreen tidak tersedia di browser ini. Coba Chrome atau gunakan mode layar penuh secara manual."
      );
      return;
    }

    // Tidak semua browser atau perangkat mendukung penguncian landscape.
    try {
      const orientation = screen.orientation as ScreenOrientation & {
        lock?: (type: "landscape") => Promise<void>;
      };

      await orientation.lock?.("landscape");
    } catch {
      // Pengguna tetap bisa memiringkan perangkat secara manual.
    }

    setStarted(true);
  }

  if (started) {
    return <Menu />;
  }

  return (
    <main className="persona-gate">
      <div className="gate-grid" aria-hidden="true" />

      <header className="gate-topline">
        <span>PHANTOM THIEVES // PERSONA OS</span>
        <span>SYS. 01</span>
      </header>

      <section className="gate-content">
        <div className="gate-emblem" aria-hidden="true">
          <svg viewBox="0 0 64 64" fill="none">
            <rect
              x="13"
              y="7"
              width="38"
              height="50"
              rx="5"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M23 14h18M27 49h10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M4 20V4h16M44 4h16v16M60 44v16H44M20 60H4V44"
              stroke="#ef233c"
              strokeWidth="3"
            />
          </svg>
        </div>

        <p className="gate-kicker">SYSTEM NOTICE // FULLSCREEN</p>

        <h1>
          MAKE YOUR
          <br />
          <span>ENTRANCE.</span>
        </h1>

        <p className="gate-subtitle">PORTFOLIO EXPERIENCE</p>

        <div className="gate-message">
          <span className="gate-message-mark">!</span>
          <p>
            Untuk pengalaman Persona yang maksimal, miringkan perangkat ke{" "}
            <b>landscape</b> dan masuk ke mode <b>fullscreen</b>.
          </p>
        </div>

        <button
          className="gate-button"
          onClick={enterExperience}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
          <span>MIRINGKAN LAYAR &amp; FULLSCREEN</span>
          <span className="gate-arrow">↗</span>
        </button>

        {error && (
          <p className="gate-error" role="status">
            {error}
          </p>
        )}

        <p className="gate-foot">
          <span className="gate-status-dot" />
          DESKTOP EXPERIENCE READY
          <span className="gate-foot-divider">/</span>
          MOBILE OPTIMIZED
        </p>
      </section>

      <footer className="gate-bottomline">
        <span>ABINN // DEVELOPER PORTFOLIO</span>
        <span>PRESS TO AWAKEN</span>
      </footer>

      <style jsx>{`
        .persona-gate {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: auto;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(18px, 4vw, 48px);
          background: #061019;
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
        }

        .persona-gate::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              150deg,
              transparent 0 43%,
              #ed1737 43.2% 44%,
              #f5f5f5 44.2% 44.8%,
              transparent 45%
            ),
            linear-gradient(28deg, #111820 0 19%, transparent 19.2%),
            radial-gradient(ellipse at 50% 42%, #163746 0, transparent 56%);
          opacity: 0.72;
          pointer-events: none;
        }

        .gate-grid {
          position: absolute;
          inset: 0;
          opacity: 0.1;
          background-image:
            linear-gradient(#fff 1px, transparent 1px),
            linear-gradient(90deg, #fff 1px, transparent 1px);
          background-size: 38px 38px;
          mask-image: linear-gradient(to bottom, black, transparent 85%);
        }

        .gate-topline,
        .gate-bottomline {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 10px;
          letter-spacing: 0.2em;
          font-weight: 800;
          color: #9baab4;
        }

        .gate-content {
          position: relative;
          z-index: 1;
          width: min(100%, 560px);
          margin: auto;
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: column;
          padding: 22px 0;
        }

        .gate-emblem {
          width: 64px;
          height: 64px;
          color: #fff;
          margin-bottom: 18px;
          filter: drop-shadow(4px 4px 0 #ed1737);
        }

        .gate-emblem svg {
          width: 100%;
          height: 100%;
        }

        .gate-kicker {
          background: #f7f7f7;
          color: #111;
          padding: 10px 17px;
          transform: skew(-7deg);
          font-size: clamp(10px, 2vw, 13px);
          font-weight: 1000;
          letter-spacing: 0.13em;
          box-shadow: 5px 5px 0 #ed1737;
          margin-bottom: 23px;
        }

        h1 {
          font-size: clamp(39px, 9vw, 74px);
          line-height: 0.84;
          letter-spacing: -0.055em;
          font-weight: 1000;
          font-style: italic;
          text-shadow: 4px 4px 0 #ed1737;
          transform: skew(-4deg);
        }

        h1 span {
          color: #08a9e8;
        }

        .gate-subtitle {
          font-size: 10px;
          letter-spacing: 0.45em;
          font-weight: 900;
          color: #bdc8cf;
          margin-top: 19px;
        }

        .gate-message {
          display: flex;
          align-items: center;
          gap: 13px;
          text-align: left;
          margin: 25px 0 19px;
          padding: 16px 18px;
          background: rgb(3 8 13 / 76%);
          border: 1px solid rgb(255 255 255 / 22%);
          border-left: 4px solid #08a9e8;
          border-radius: 3px;
          color: #dce3e8;
          font-size: 13px;
          line-height: 1.65;
        }

        .gate-message-mark {
          font-size: 27px;
          font-weight: 1000;
          color: #08a9e8;
        }

        .gate-message p {
          margin: 0;
        }

        .gate-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          min-height: 62px;
          padding: 15px 14px;
          border: 2px solid #fff;
          background: #079fdf;
          color: #fff;
          font-weight: 1000;
          font-size: clamp(11px, 2.8vw, 15px);
          letter-spacing: 0.035em;
          cursor: pointer;
          box-shadow: 5px 5px 0 #ed1737;
          transition:
            transform 0.16s,
            background 0.16s;
          transform: skew(-1deg);
        }

        .gate-button:hover {
          background: #ed1737;
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 #079fdf;
        }

        .gate-button:focus-visible {
          outline: 3px solid #fff;
          outline-offset: 5px;
        }

        .gate-button svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .gate-arrow {
          font-size: 20px;
          margin-left: auto;
        }

        .gate-foot {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 25px;
          color: #8a9ba6;
          font-size: 9px;
          letter-spacing: 0.19em;
          font-weight: 800;
        }

        .gate-status-dot {
          width: 7px;
          height: 7px;
          background: #08b8ef;
          border-radius: 50%;
          box-shadow: 0 0 10px #08b8ef;
        }

        .gate-foot-divider {
          color: #ed1737;
        }

        .gate-error {
          margin-top: 12px;
          color: #ffb4bd;
          font-size: 12px;
          line-height: 1.5;
        }

        @media (orientation: landscape) and (max-height: 520px) {
          .persona-gate {
            padding: 12px 24px;
          }

          .gate-content {
            padding: 4px 0;
            max-width: 620px;
          }

          .gate-emblem {
            width: 35px;
            height: 35px;
            margin-bottom: 7px;
          }

          .gate-kicker {
            margin-bottom: 10px;
            padding: 6px 12px;
          }

          h1 {
            font-size: clamp(29px, 7vh, 48px);
          }

          .gate-subtitle {
            margin-top: 8px;
          }

          .gate-message {
            margin: 12px 0;
            padding: 9px 12px;
            font-size: 11px;
          }

          .gate-button {
            min-height: 44px;
            padding: 9px;
          }

          .gate-foot {
            margin-top: 12px;
          }

          .gate-topline,
          .gate-bottomline {
            font-size: 8px;
          }
        }

        @media (max-width: 380px) {
          .persona-gate {
            padding: 16px;
          }

          .gate-topline,
          .gate-bottomline {
            font-size: 8px;
            letter-spacing: 0.1em;
          }

          .gate-message {
            font-size: 12px;
            padding: 12px;
          }

          .gate-foot {
            letter-spacing: 0.1em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gate-button {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
          }
