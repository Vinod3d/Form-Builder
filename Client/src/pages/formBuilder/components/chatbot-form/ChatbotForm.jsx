import { useState, useRef, useEffect } from "react";
import styles from "./ChatbotForm.module.css";
import { FaPaperPlane } from "react-icons/fa";

export default function ChatbotForm({ formFlow }) {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getCurrentTime = () => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date());
  };

  const addMessage = (type, content) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        type,
        content,
        timestamp: getCurrentTime(),
      },
    ]);
  };

  const handleStart = () => {
    setStarted(true);
    addMessage("question", formFlow.elements[0].bubble.content);
  };

  const handleSubmitAnswer = (value) => {
    addMessage("answer", value);
    setAnswers((prev) => ({
      ...prev,
      [formFlow.elements[currentStep].id]: value,
    }));
    setCurrentInput("");

    setTimeout(() => {
      if (currentStep < formFlow.elements.length - 1) {
        setCurrentStep((prev) => prev + 1);
        addMessage("question", formFlow.elements[currentStep + 1].bubble.content);
      }
    }, 500);
  };

  if (!started) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>{formFlow.name}</h2>
          <button className={styles.button} onClick={handleStart}>
            Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div ref={scrollRef} className={styles.messages}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${
                msg.type === "question" ? styles.question : styles.answer
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Type your answer..."
          />
          <button
            className={styles.submitButton}
            onClick={() => handleSubmitAnswer(currentInput)}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
