import { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import styles from "./workspace.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyWorkspace } from "../../store/slice/workspaceSlice";
import { addNewFolder, clearErrors, deleteFolder, fetchFolderById } from "../../store/slice/foderSlice";
import AddModal from "./AddModal";

function Workspace() {
  const dispatch = useDispatch();
  const {workspace} = useSelector((state)=>state.workspace);
  const {folders} = useSelector((state) => state.folder);
  const [isDark, setIsDark] = useState(true);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isFormbotModalOpen, setIsFormbotModalOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState([workspace]);
  const [currentWorkspace, setCurrentWorkspace] = useState(workspaces[0]|| []);
  const [tabs, setTabs] = useState([]);
  console.log(currentWorkspace)
  const [folderName, setFolderName] = useState("");
  const [typebots, setFormBots] = useState([]);
  const [formbotName, setFormBotName] = useState("");


  useEffect(() => {
    setTabs(folders);
  }, [dispatch, folders]);

  useEffect(() => {
    currentWorkspace?.folders.forEach((id) => {
      dispatch(fetchFolderById(id));
    });

    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, currentWorkspace]);

  useEffect(() => {
    dispatch(fetchMyWorkspace())
  }, [dispatch]);
  


  
  
  

  // Theme toggle handler
  const toggleTheme = () => setIsDark(!isDark);

  // Add folder handler
  const handleAddFolder = () => {
    if (folderName.trim()) {
      dispatch(addNewFolder(currentWorkspace._id, folderName))
      setFolderName("");
      setIsFolderModalOpen(false);
    }
  };

  const handleDelete = (folderId) => {
    if (folderId) {
      dispatch(deleteFolder(currentWorkspace?._id, folderId));
    }
  };

  // Create Typebot handler
  const handleCreateFormBot = () => {
    if (formbotName.trim()) {
      setFormBots([...typebots, formbotName]);
      setFormBotName("");
      setIsFormbotModalOpen(false);
    }
  };

  // Delete Typebot handler
  const handleDeleteTypebot = (index) => {
    const updatedTypebots = typebots.filter((_, i) => i !== index);
    setFormBots(updatedTypebots);
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: isDark ? "#0f1117" : "#ffffff",
        color: isDark ? "#fff" : "#000",
      }}
    >
      {/* Header */}
      <header className={styles.header}>
        <select
          className={styles.workspaceSelect}
          value={currentWorkspace}
          onChange={(e) => setCurrentWorkspace(e.target.value)}
        >
          {workspaces.map((workspace, index) => (
            <option key={index} value={workspace?.name}>
              {workspace.name}
            </option>
          ))}
        </select>

        <div className={styles.controls}>
          <label className={styles.themeToggle}>
            <input type="checkbox" checked={isDark} onChange={toggleTheme} />
            {isDark ? "Dark" : "Light"}
          </label>
          <button className={styles.shareButton}>Share</button>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.content}>
        <div className={styles.tabs}>
          <button
            className={styles.tab}
            onClick={() => setIsFolderModalOpen(true)}
          >
            <FiPlus /> Create a Folder
          </button>
          {tabs.map((tab, index) => (
            <div key={index} className={styles.tab}>
              {tab.name} <FiX onClick={() => handleDelete(tab._id)} />
            </div>
          ))}
        </div>

        {/* Typebot Grid */}
        <div className={styles.typebotGrid}>
          <div
            className={styles.createCard}
            onClick={() => setIsFormbotModalOpen(true)}
          >
            <FiPlus className={styles.plusIcon} />
            <span>Create a Typebot</span>
          </div>
          {typebots.map((typebot, index) => (
            <div key={index} className={styles.typebotCard}>
              <span>{typebot}</span>
              <FiX
                className={styles.deleteIcon}
                onClick={() => handleDeleteTypebot(index)}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Folder Modal */}
      {isFolderModalOpen && (
        <AddModal
          title={'Folder'}
          placeholder={"Folder Name"}
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          onAdd={handleAddFolder}
          onClose={()=>setIsFolderModalOpen(false)}
        />
      )}

      {/* Typebot Modal */}
      {isFormbotModalOpen && (
        <AddModal
          title={'Formbot'}
          placeholder={"Formbot Name"}
          value={formbotName}
          onChange={(e) => setFormBotName(e.target.value)}
          onAdd={handleCreateFormBot}
          onClose={() => setIsFormbotModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Workspace;
