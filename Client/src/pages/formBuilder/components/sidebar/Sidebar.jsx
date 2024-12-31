/* eslint-disable react/prop-types */
// import { Button } from "@/components/ui/button";
import {
  FaVideo,
  FaHashtag,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaStar,
  FaCheckSquare
} from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { FaImage } from "react-icons/fa6";
import { AiOutlineGif } from "react-icons/ai";
import { RxText } from "react-icons/rx";
import styles from "./Sidebar.module.css";

function Sidebar({isDark, onAddElement, onAddInput, activeBubbleId }) {
  const bubbles = [
    { type: "text", icon: IoChatbox, label: "Text" },
    { type: "url", icon: FaImage, label: "Image" },
    { type: "url", icon: FaVideo, label: "Video" },
    { type: "url", icon: AiOutlineGif, label: "GIF" },
  ];

  const inputs = [
    { type: "text", icon: RxText , label: "Text" },
    { type: "number", icon: FaHashtag, label: "Number" },
    { type: "email", icon: FaEnvelope, label: "Email" },
    { type: "tel", icon: FaPhone, label: "Phone" },
    { type: "date", icon: FaCalendarAlt, label: "Date" },
    { type: "text", icon: FaStar, label: "Rating" },
    { type: "submit", icon: FaCheckSquare, label: "Button" },
  ];

  return (
    <aside className={styles.sidebar} style={{ background: isDark? '#18181B' : ''}}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Bubbles</h2>
        <div className={styles.grid}>
          {bubbles.map((item) => (
            <button
              key={item.label}
              size="sm"
              className={`${styles.button}`}
              onClick={() => onAddElement(item.type)}
              style={{ 
                background: isDark? '#1F1F23' : 'transparent',
                color: isDark? '#fff' : '',
                border: isDark ? 'border: 1px solid #bcbcbc26' : 'border: 1px solid #bcbcbca3;'
              }}
            >
              <item.icon className={styles.icon} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Inputs</h2>
        <div className={styles.grid}>
          {inputs.map((item) => (
            <button
              key={item.type}
              size="sm"
              className={styles.button}
              onClick={() => onAddInput(activeBubbleId, item.type)}
              // disabled={!activeBubbleId}
              style={{ 
                background: isDark? '#1F1F23' : 'transparent',
                color: isDark? '#fff' : '',
                border: isDark ? 'border: 1px solid #bcbcbc26' : 'border: 1px solid #bcbcbca3'
              }}
            >
              <item.icon className={styles.icon2} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
