/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import styles from "./ChatbotForm.module.css";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormById, updateForm } from "../../../../store/slice/formSlice";
import { createResponse } from "../../../../store/slice/responseSlice";

export default function ChatbotForm() {
  const { formId } = useParams();
  const dispatch = useDispatch();
  const {forms, loading, error} = useSelector((state)=> state.form);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [started, setStarted] = useState(false);
  const scrollRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    elements: [],
  });

  const [formStarted, setFormStarted] = useState(0);

  useEffect(()=>{
    dispatch(
      updateForm({
        formId,
        updatedData: { analytics: { views: 1 } },
      })
    );
  },[formId])


  useEffect(() => {
    if (formId) {
      dispatch(fetchFormById(formId));
    }
  }, [dispatch, formId]);


  useEffect(() => {
    if (forms) {
      setForm({
        name: forms.title || "",
        elements: forms.elements || [],
      });
    }
  }, [forms]);

  useEffect(() => {
    const initialAnswers = {};
    form.elements.forEach((element) => {
      initialAnswers[element.bubble.content] = "";
    });

  }, [form]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (type, bubble) => {
    setMessages((prevMessages) => {
      if (
        (type === "question" &&
          prevMessages.some(
            (msg) => msg.type === "question" && msg.bubble.id === bubble.bubble.id
          )) ||
        (type === "answer" &&
          prevMessages.some(
            (msg) => msg.type === "answer" && msg.bubble.id === bubble.bubble.id
          ))
      ) {
        return prevMessages;
      }
  
      return [
        ...prevMessages,
        {
          type,
          ...bubble,
        },
      ];
    });
  };
  
  const handleStart = () => {
    if (!form.elements || form.elements.length === 0) {
      return;
    }
    
    dispatch(
      updateForm({
        formId,
        updatedData: { analytics: { starts: 1 } },
      })
    );
    setStarted(true);
    addMessage("question", { bubble: form.elements[0].bubble });
  };
  
  const handleSubmitAnswer = () => {
    const trimmedInput = currentInput.trim();
  
    if (!trimmedInput) return;
    addMessage("answer", {
      bubble: {
        ...form.elements[currentStep].bubble,
        userInput: trimmedInput,
      },
    });
  
    setCurrentInput("");
  
    setTimeout(() => {
      if (currentStep < form.elements.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        addMessage("question", { bubble: form.elements[nextStep].bubble });
      } else {
        addMessage("info", { bubble: { content: "You have completed the form." } });
      }
    }, 500);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmitAnswer();
    }
  };

  const handleFormSubmit = () => {
    const responses = messages
      .map((message, index) => ({
        bubble: {
          type: message.bubble.type,
          content: message.bubble.content,
          url: message.bubble.url || "",
        },
        input: {
          value: message.bubble.userInput,
        },
      }))
      .filter((message) => message.input.value !== null);
      
      dispatch(createResponse({formId, responses}))
      dispatch(
        updateForm({
          formId,
          updatedData: { analytics: { completed: 1 } },
        })
      );
    toast.success("Form submitted successfully");
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
          <h2 className={styles.title}>{form.name || "Chatbot Form"}</h2>
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
          {messages.map((msg, index) => (
            <div
              key={index}
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
        { form.elements[currentStep]?.input?.type === "submit" ? (
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
              onKeyDown={handleKeyDown}
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
