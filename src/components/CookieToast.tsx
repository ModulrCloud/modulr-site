"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieToast({ theme }: { theme: "dark" | "light" }) {
  const [show, setShow] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Auto-play video when toast appears
    if (show && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, [show]);

  useEffect(() => {
    // Add CSS animation for cookie gradient fallback
    const styleId = "cookie-toast-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes cookieGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .cookie-video-fallback {
          animation: cookieGradient 3s ease infinite;
        }
      `;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShow(false);
  };

  const bgColor = theme === "dark" ? "rgba(0,0,0,0.95)" : "rgba(255,255,255,0.95)";
  const borderColor = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const textColor = theme === "dark" ? "#fff" : "#000";
  const mutedTextColor = theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";
  const buttonBg = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const buttonHoverBg = theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const primaryButtonBg = "#f2b400";
  const primaryButtonHoverBg = "#e0a500";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            right: 24,
            zIndex: 1000,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: bgColor,
              border: `1px solid ${borderColor}`,
              borderRadius: 20,
              padding: 24,
              backdropFilter: "blur(20px)",
              boxShadow: theme === "dark" 
                ? "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)"
                : "0 24px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              {/* Video Background */}
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 16,
                  overflow: "hidden",
                  position: "relative",
                  flexShrink: 0,
                  background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                  }}
                  onError={() => {
                    // Hide video if it fails to load, show fallback
                    if (videoRef.current) {
                      videoRef.current.style.display = "none";
                    }
                  }}
                >
                  {/* Replace with your actual cookie consent video URL */}
                  {/* Using a sample video for demonstration - replace with your own */}
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                </video>
                {/* Fallback gradient animation if video doesn't load */}
                <div
                  className="cookie-video-fallback"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, rgba(242,180,0,0.2), rgba(242,180,0,0.4), rgba(242,180,0,0.2))`,
                    backgroundSize: "200% 200%",
                    zIndex: 0,
                  }}
                />
                {/* Cookie icon overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.3)",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    <circle cx="8.5" cy="8.5" r="1.5" fill="#fff" />
                    <circle cx="15.5" cy="8.5" r="1.5" fill="#fff" />
                    <circle cx="8.5" cy="15.5" r="1.5" fill="#fff" />
                    <circle cx="15.5" cy="15.5" r="1.5" fill="#fff" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: textColor, marginBottom: 6 }}>
                  We use cookies
                </h3>
                <p style={{ fontSize: 13, color: mutedTextColor, lineHeight: 1.6, marginBottom: 16 }}>
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking &quot;Accept&quot;, you consent to our use of cookies.
                </p>

                {/* Buttons */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    onClick={handleAccept}
                    style={{
                      padding: "10px 20px",
                      borderRadius: 10,
                      background: primaryButtonBg,
                      color: "#000",
                      fontSize: 13,
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = primaryButtonHoverBg;
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = primaryButtonBg;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Accept
                  </button>
                  <button
                    onClick={handleDecline}
                    style={{
                      padding: "10px 20px",
                      borderRadius: 10,
                      background: buttonBg,
                      color: textColor,
                      fontSize: 13,
                      fontWeight: 500,
                      border: `1px solid ${borderColor}`,
                      cursor: "pointer",
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = buttonHoverBg;
                      e.currentTarget.style.borderColor = theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = buttonBg;
                      e.currentTarget.style.borderColor = borderColor;
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={handleDecline}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "transparent",
                  border: "none",
                  color: mutedTextColor,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = textColor;
                  e.currentTarget.style.background = buttonBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = mutedTextColor;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
