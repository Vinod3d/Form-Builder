/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import styles from "./ChatbotForm.module.css";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ChatbotForm({ formFlow }) {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const scrollRef = useRef(null);

  console.log(formFlow)

  useEffect(() => {
    const initialAnswers = {};
    formFlow.elements.forEach((element) => {
      initialAnswers[element.bubble.content] = "";
    });
    setAnswers(initialAnswers);
  }, [formFlow]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (type, bubble) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        type,
       ...bubble,
      },
    ]);
  };

  const handleStart = () => {
    if (!formFlow.elements || formFlow.elements.length === 0) {
      return;
    }

    setStarted(true);
    addMessage("question", formFlow.elements[0]);
  };

  const handleSubmitAnswer = () => {
    const trimmedInput = currentInput.trim();

    if (!trimmedInput) return;

    formFlow.elements[currentStep].bubble.userInput = trimmedInput;
    addMessage("answer", formFlow.elements[currentStep]);
    setAnswers((prev) => ({
      ...prev,
      [formFlow.elements[currentStep].id]: trimmedInput,
    }));


    setCurrentInput("");

    setTimeout(() => {
      if (currentStep < formFlow.elements.length - 1) {
        setCurrentStep((prev) => prev + 1);
        addMessage("question", formFlow.elements[currentStep + 1]);
      } else {
        addMessage("info", "You have completed the form.");
      }
    }, 500);
  };

  const handleFormSubmit = () => {
   toast.success("form submitted successfully")
  };

  const renderContent = (content) => {
    console.log(content)

    if (content.bubble.type === "image" || content.bubble.type === "gif") {
      return (
        <>
        <div className={styles.figContainer}>
          <span className={styles.msgContent} style={{backgroundColor: content.type === "question" ? '#f1f0f0' :  '#d1e7ff'}}>
          {
            content.type === 'answer' ? content.bubble.userInput : content.bubble.content
          } 
          </span>
          {content.type === 'question' && 
          
          <img src={content.bubble.url} alt="media" className={styles.media} />
          }
        </div>
        </>
        )
    } else if (content.bubble.type === "video") {
      return (
        <>
        <span className={styles.msgContent} style={{backgroundColor: content.type === "question" ? '#f1f0f0' :  '#d1e7ff'}}>
          {
            content.type === 'answer' ? content.bubble.userInput : content.bubble.content
          }
        </span>;
        {content.type === 'question' && 
          <video className={styles.media} controls>
          <source src={content.bubble.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        }
        
        </>
      );
    } else if (content.type === 'answer') {
      return <span className={styles.msgContent} style={{backgroundColor: content.type === "question" ? '#f1f0f0' :  '#d1e7ff'}}>{content.bubble.userInput}</span>;
    }
    else  {
      return <span className={styles.msgContent} style={{backgroundColor: content.type === "question" ? '#f1f0f0' :  '#d1e7ff'}}>{content.bubble.content}</span>;
    }
  };

  if (!started) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>{formFlow.name || "Chatbot Form"}</h2>
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
              className={styles.msgContainer}
            >
              <div  className={`${styles.message} ${
                msg.type === "question" ? styles.question : styles.answer
              }`}>
                {renderContent(msg)}
              </div>
            </div>
          ))}
        </div>
        { formFlow.elements[currentStep]?.input?.type === "submit" ? (
          <button
          className={styles.submitButton}
          onClick={handleFormSubmit}
        >
          Submit
        </button>
        ) : (
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
              onClick={handleSubmitAnswer}
              disabled={!currentInput.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
