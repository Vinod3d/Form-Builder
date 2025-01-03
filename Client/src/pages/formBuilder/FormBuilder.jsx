import { useState } from 'react';
import styles from './FormBuilder.module.css';
import { Input } from '../../components/input/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/Tab/Tabs';
import { Switch } from '../../components/switch/Switch';
import { toast } from "react-toastify";
import FormPreview from './components/form-preview/FormPreview';
import FormResponse from './components/form-response/FormResponse';
import Sidebar from './components/sidebar/SideBar';
import ChatbotForm from './components/chatbot-form/ChatbotForm';

export default function FormBuilder() {
  const [formFlow, setFormFlow] = useState({
    id: '1',
    name: '',
    elements: [],
    isPublished: false,
  });
  const [activeTab, setActiveTab] = useState('flow');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeBubbleId, setActiveBubbleId] = useState(null);

  console.log(formFlow)

  const handleAddElement = (bubbleType) => {
    const newElement = {
      id: Math.random().toString(36).substr(2, 9),
      bubble: {
        id: Math.random().toString(36).substr(2, 9),
        type: bubbleType,
        content: `New ${bubbleType}`,
        url: bubbleType === "image" || bubbleType === "video" || bubbleType === "gif" ? "" : null,
        userInput: null
      },
    };

    setFormFlow((prev) => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));

    setActiveBubbleId(newElement.id);
  };

  const handleAddInput = (bubbleId, inputType) => {
    if (!bubbleId){
      toast.warn('Please Select any bubble');
      return;
    }
    const targetBubble = formFlow.elements.find((element) => element.id === bubbleId);
    if (targetBubble && targetBubble.input) {
      toast.warn('Please select another Bubble');
      return;
    }
    const newInput = {
      id: Math.random().toString(36).substr(2, 9),
      type: inputType,
      placeholder: `Enter ${inputType}`,
    };
    setFormFlow((prev) => ({
      ...prev,
      elements: prev.elements.map((element) =>
        element.id === bubbleId ? { ...element, input: newInput } : element
      ),
    }));
  };

  const handleUpdateElement = (id, updates) => {
    setFormFlow((prev) => ({
      ...prev,
      elements: prev.elements.map((element) =>
        element.id === id
          ? {
              ...element,
              bubble: {
                ...element.bubble,
                ...updates.bubble,
              },
              input: updates.input ? { ...element.input, ...updates.input } : element.input,
            }
          : element
      ),
    }));
  };
  

  const handleDeleteElement = (id) => {
    setFormFlow((prev) => ({
      ...prev,
      elements: prev.elements.filter((element) => element.id !== id),
    }));
  };

  const handleSave = () => {
    if (!formFlow.name) {
      toast.warn("Please enter a form name")
      return;
    }

    if (formFlow.elements.some((element) => !element.input?.type)) {
      toast.warn("Please select any input type for all bubbles");
      return;
    }

    if (!formFlow.elements.some((element) => element.input?.type === 'submit')) {
      toast.warn("Please add a submit button")
      return;
    }

    setFormFlow((prev) => ({ ...prev, isPublished: true }));
    setActiveTab('preview');
    toast.success("form saved");
  };

  const handleShare = () => {
    if (!formFlow.isPublished) {
      toast({
        title: 'Error',
        description: 'Please save the form before sharing',
        variant: 'destructive',
      });
      return;
    }

    // Share form logic here
    toast({
      title: 'Success',
      description: 'Form link copied to clipboard',
    });
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
      <header className={styles.header}>
        <Input
          isDark={isDarkMode}
          placeholder="Enter Form Name"
          value={formFlow.name}
          onChange={(e) => setFormFlow({ ...formFlow, name: e.target.value })}
          className={styles.headerInput}
        />
        <div className={styles.headerActions}>
          <Tabs>
            <TabsList>
              <TabsTrigger isDark={isDarkMode} value="flow" onClick={() => setActiveTab('flow')} isActive={activeTab === 'flow'}>
                Flow
              </TabsTrigger>
              <TabsTrigger isDark={isDarkMode} value="response" onClick={() => setActiveTab('response')} isActive={activeTab === 'response'}>
                Response
              </TabsTrigger>
              <TabsTrigger isDark={isDarkMode} value="preview" onClick={() => setActiveTab('preview')} isActive={activeTab === 'preview'} disabled={!formFlow.isPublished}>
                Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className={styles.headerBtn}>
          <div className={styles.switchContainer}>
            <span>Light</span>
              <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
            <span>Dark</span>
          </div>
          <button className={styles.share} onClick={handleShare}>
            Share
          </button>
          <button className={styles.save} onClick={handleSave}>
            Save
          </button>
        </div>
      </header>

      <div className={styles.main} style={{ background: isDarkMode? '#1F1F23' : ''}}>
        <Sidebar
          isDark={isDarkMode}
          onAddElement={handleAddElement}
          onAddInput={handleAddInput}
          activeBubbleId={activeBubbleId}
          className={styles.sidebar}
        />

        <main className={styles.content}>
          <div >
            <TabsContent value="flow" activeTab={activeTab} className={styles.tabContent}>
              {/* <DragDropContext onDragEnd={handleDragEnd}> */}
                <FormPreview
                  isDark={isDarkMode}
                  elements={formFlow.elements}
                  onUpdateElement={handleUpdateElement}
                  onDeleteElement={handleDeleteElement}
                  onBubbleSelect={setActiveBubbleId}
                  activeBubbleId={activeBubbleId}
                />
              {/* </DragDropContext>  */}
            </TabsContent>
            <TabsContent value="response" activeTab={activeTab} className={styles.tabContent}>
              <FormResponse 
                formFlow={formFlow} 
                isDark={isDarkMode}
              />
            </TabsContent>
            <TabsContent value="preview" activeTab={activeTab} className={styles.tabContent}>
              <ChatbotForm formFlow={formFlow} />
            </TabsContent>
          </div>
        </main>
      </div>
    </div>
  );
}
