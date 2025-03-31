import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AboutData, CardData } from "../types/AboutTypes";
import "../styles/pixelArt.css";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
} from "react-icons/fa";

interface AboutPageProps {
  data: AboutData;
}

export function AboutPage({ data }: AboutPageProps) {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(12);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    window.innerHeight > window.innerWidth ? "portrait" : "landscape"
  );
  const [isIPadMini, setIsIPadMini] = useState(false);

  // Detect if device is iPad Mini or similar size
  const detectIPadMini = (width: number, height: number) => {
    // iPad Mini dimensions: 768x1024
    return (
      (width === 768 && height === 1024) ||
      (height === 768 && width === 1024) ||
      (width >= 750 && width < 820 && height < 1080 && height > 1000)
    );
  };

  // Update cards per page based on screen size and orientation
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowWidth(width);
      setWindowHeight(height);
      setOrientation(height > width ? "portrait" : "landscape");

      // Check if device is iPad Mini
      const isMini = detectIPadMini(width, height);
      setIsIPadMini(isMini);

      // Determine rows and columns based on screen size and orientation
      let rows = 3;
      let columns = 5;

      if (height > width) {
        // Portrait mode
        if (width >= 820) {
          // iPad Air and larger
          rows = 4;
          columns = 3;
        } else if (width >= 768 && width < 820) {
          // iPad Mini
          rows = 3;
          columns = 2;
        } else if (width >= 480) {
          rows = 3;
          columns = 2;
        } else if (width >= 350) {
          rows = 2;
          columns = 2;
        } else {
          rows = 3;
          columns = 1;
        }
      } else {
        // Landscape mode
        if (width >= 1600) {
          rows = 3;
          columns = 6;
        } else if (width >= 1280) {
          rows = 3;
          columns = 5;
        } else if (width >= 1024) {
          rows = 3;
          columns = 4;
        } else if (width >= 768) {
          rows = 3;
          columns = 3;
        } else if (width >= 480) {
          rows = 2;
          columns = 3;
        } else {
          rows = 2;
          columns = 2;
        }
      }

      setCardsPerPage(rows * columns);
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (card: CardData) => {
    setSelectedCard(card);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedCard(null);
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = "";
  };

  // Calculate pagination
  const totalPages = Math.ceil(data.cards.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.cards.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Apply specific class for iPad Mini
  const containerClass = `about-container ${isIPadMini ? "ipad-mini" : ""}`;

  return (
    <div className={containerClass}>
      {/* Profile Panel */}
      <div className="profile-panel pixel-border pixel-text">
        <div className="profile-photo-container pixel-border">
          <div className="profile-photo pixel-art pixel-border">
            <img
              src={data.profile.photoUrl}
              alt="Profile"
              className="pixel-art"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div className="profile-info pixel-border">
          <h2 className="profile-name pixel-text">{data.profile.name}</h2>
          <h3 className="profile-title pixel-text">{data.profile.title}</h3>

          {data.profile.address && (
            <div className="profile-detail">
              <FaMapMarkerAlt className="profile-icon" />
              <span>{data.profile.address}</span>
            </div>
          )}

          {data.profile.phone && (
            <div className="profile-detail">
              <FaPhone className="profile-icon" />
              <span>{data.profile.phone}</span>
            </div>
          )}

          {data.profile.email && (
            <div className="profile-detail">
              <FaEnvelope className="profile-icon" />
              <span>{data.profile.email}</span>
            </div>
          )}

          {data.profile.education && (
            <div className="profile-detail">
              <FaGraduationCap className="profile-icon" />
              <span>{data.profile.education}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/")}
          className="back-to-game-btn pixel-border pixel-text"
        >
          Back to Game
        </button>

        {/* Social Media Buttons */}
        {data.profile.socialMedia && (
          <div className="profile-social-media">
            {data.profile.socialMedia.github && (
              <a
                href={data.profile.socialMedia.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-button pixel-border"
              >
                <FaGithub />
              </a>
            )}
            {data.profile.socialMedia.linkedin && (
              <a
                href={data.profile.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-button pixel-border"
              >
                <FaLinkedin />
              </a>
            )}
            {data.profile.socialMedia.twitter && (
              <a
                href={data.profile.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-button pixel-border"
              >
                <FaTwitter />
              </a>
            )}
            {data.profile.socialMedia.instagram && (
              <a
                href={data.profile.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-button pixel-border"
              >
                <FaInstagram />
              </a>
            )}
            {data.profile.socialMedia.facebook && (
              <a
                href={data.profile.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-button pixel-border"
              >
                <FaFacebook />
              </a>
            )}
          </div>
        )}

        {/* Pagination moved to profile panel */}
        {totalPages > 1 && (
          <div className="profile-pagination pixel-text">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`page-button pixel-border ${
                currentPage === 1 ? "disabled" : ""
              }`}
            >
              &lt;
            </button>

            <div className="page-info">
              {currentPage} / {totalPages}
            </div>

            <button
              onClick={() =>
                paginate(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              disabled={currentPage === totalPages}
              className={`page-button pixel-border ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      <div className="cards-container">
        {/* Header for games */}
        <h1 className="games-header pixel-text">THE GAMES I'VE DESIGNED</h1>

        {/* Cards Grid */}
        <div className="cards-grid">
          {currentCards.map((card) => (
            <div
              key={card.id}
              className="about-card pixel-border pixel-text"
              onClick={() => openModal(card)}
            >
              <img
                src={card.imageUrl}
                alt={card.title}
                className="card-image pixel-art"
              />
              <div className="card-title pixel-text">{card.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCard && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content pixel-border pixel-text"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close pixel-border pixel-text"
              onClick={closeModal}
            >
              X
            </button>
            <h2 className="modal-title pixel-text">{selectedCard.title}</h2>
            <img
              src={selectedCard.imageUrl}
              alt={selectedCard.title}
              className="modal-image pixel-art pixel-border"
            />
            <p className="modal-bio pixel-text">{selectedCard.bioText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
