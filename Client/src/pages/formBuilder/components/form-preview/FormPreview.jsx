/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";
import styles from "./FormPreview.module.css";

function FormPreview({
  isDark,
  elements,
  onUpdateElement,
  onDeleteElement,
  onBubbleSelect,
  activeBubbleId,
}) {
  return (
    <div className={styles.container}>
      {elements.map((element) => (
        <div
          key={element.id}
          className={`${styles.card} ${
            element.id === activeBubbleId ? styles.active : ""
          }`}
          onClick={()=>onBubbleSelect(element.id)}
          style={{
            backgroundColor: isDark ? "#18181B" : "#f7f7f7",
          }}
        >
          <button className={styles.close} onClick={() => onDeleteElement(element.id)}>
            <FaTimes />
          </button>
          {renderBubbleContent(isDark, element.bubble, (updates) =>
            onUpdateElement(element.id, {
              bubble: { ...element.bubble, ...updates },
            })
          )}
          {element.input && (
            <div className={styles.inputContainer}>
              {renderInputField(isDark, element.input, (updates) =>
                onUpdateElement(element.id, {
                  input: { ...element.input, ...updates },
                })
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function renderBubbleContent(isDark, bubble, onUpdate) {
  switch (bubble.type) {
    case "text":
      return (
        <input
          type="text"
          value={bubble.content}
          onChange={(e) => onUpdate({ content: e.target.value })}
          className={styles.inputLable}
          placeholder="Enter text content"
          style={{
            color: isDark ? "#fff" : "#000",
          }}
        />
      );
    case "image":
    case "video":
    case "gif":
      return (
        <div className="placeholder">
          {bubble.type.charAt(0).toUpperCase() + bubble.type.slice(1)} Placeholder
        </div>
      );
    default:
      return null;
  }
}

function renderInputField(isDark, input, onUpdate) {
  return (
    <input
      type="text"
      value={input.label}
      onChange={(e) => onUpdate({ label: e.target.value })}
      className={styles.input}
      placeholder="Enter input label"
      style={{
        backgroundColor: isDark ? "#1F1F23" : "#eceaea",
        color: isDark ? "#fff" : "#000",
      }}
    />
  );
}

export default FormPreview;
