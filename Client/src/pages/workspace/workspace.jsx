import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import styles from "./workspace.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyWorkspace } from "../../store/slice/workspaceSlice";
import { addNewFolder, deleteFolder, fetchFolderById } from "../../store/slice/foderSlice";
import AddModal from "./AddModal";
import { addNewForm, deleteForm, fetchFormsByFolderId } from "../../store/slice/formSlice";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import WorkspaceSelector from "./component/WorkspaceSelector";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import { useNavigate } from "react-router-dom";

function Workspace() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workspace = {} } = useSelector((state) => state.workspace || {});
  const { folders = [] } = useSelector((state) => state.folder || {});
  const { forms = [] } = useSelector((state) => state.form || {});
  const [isDark, setIsDark] = useState(true);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isFormbotModalOpen, setIsFormbotModalOpen] = useState(false);
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);
  const [isDeleteFormModalOpen, setIsDeleteFormModalOpen] = useState(false);
  const [FolderId, setFolderId] = useState(null);
  const [FormId, setFormId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [workspaces, setWorkspaces] = useState(workspace ? [workspace] : []);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [currentTab, setCurrentTab] = useState(folders[0]);
  const [folderName, setFolderName] = useState("");
  const [formBots, setFormBots] = useState([]);
  const [formbotName, setFormBotName] = useState("");

  // Fetch workspace data on component mount
  useEffect(() => {
    dispatch(fetchMyWorkspace())
  }, [dispatch]);

  // Set currentWorkspace when workspace is loaded
  useEffect(() => {
    if (workspace) {
      setCurrentWorkspace(workspace);
    }
  }, [workspace]);
  

  // Fetch folders when currentWorkspace changes
  useEffect(() => {
    if (currentWorkspace?.folders.length) {
      currentWorkspace.folders.forEach((id) => {
        dispatch(fetchFolderById(id));
      });
    }
  }, [currentWorkspace, dispatch]);

  // Set currentTab and fetch forms when folders are loaded
  useEffect(() => {
    if (folders?.length > 0) {
      // setTabs(folders);
      setCurrentTab(folders[0]);
    }
  }, [folders]);

  useEffect(() => {
    if (currentTab?._id) {
      dispatch(fetchFormsByFolderId(currentTab._id));
    } else {
      setFormBots([]);
    }
  }, [currentTab, dispatch]);

  useEffect(() => {
    if (currentTab?._id && forms.length > 0) {
      setFormBots(forms);
    } else {
      setFormBots([]); // Ensure forms list is empty if no forms are available
    }
  }, [forms, currentTab]);


  const toggleTheme = () => setIsDark(!isDark);

  // Add folder handler
  const handleAddFolder = () => {
    if (folderName.trim()) {
      dispatch(addNewFolder(currentWorkspace._id, folderName))
      setFolderName("");
      setIsFolderModalOpen(false);
    }
  };

  const handleDeleteFolder = (folderId) => {
    setIsDeleteFolderModalOpen(true);
    setFolderId(folderId);
  };

  const handleFolderDeleteConfirm = () => {
    if (FolderId) {
      dispatch(deleteFolder(currentWorkspace?._id, FolderId));
    }
    setIsDeleteFolderModalOpen(false);
  };

  const handleTabSelect = (folder) => {
    setCurrentTab(folder);
    dispatch(fetchFormsByFolderId(folder._id));
  };





  // Create formBot handler
  const handleCreateFormBot = () => {
    if (formbotName.trim() && currentTab) {
      dispatch(addNewForm({ title: formbotName, folderId: currentTab._id }))
        .then(() => {
          dispatch(fetchFormsByFolderId(currentTab._id));
        });
      setFormBotName("");
      setIsFormbotModalOpen(false);
    }
  };
  

  // Delete Typebot handler
  const handleDeleteFormbot = (folderId, formId, event) => {
    event.stopPropagation();
    setIsDeleteFormModalOpen(true)
    setFolderId(folderId)
    setFormId(formId)
   
  };

  const handleDeleteFormConfirm = ()=>{
    if (FolderId && FormId) {
      dispatch(deleteForm(FolderId, FormId)).then(() => {
        dispatch(fetchFormsByFolderId(FolderId));
      });
    }
    setIsDeleteFormModalOpen(false);
  }
  

  const handleFormClick = (formId) => {
    navigate(`/form-builder/${formId}`);
  };
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: isDark ? "#0f1117" : "#ffffff",
        color: isDark ? "#fff" : "#000 !important",
      }}
    >
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <WorkspaceSelector
             workspaces={workspaces}
             currentWorkspace={currentWorkspace}
             setCurrentWorkspace={setCurrentWorkspace}
             isDark={isDark}
          />

          <div className={styles.controls}>
            <div className={styles.toggleContainer}>
              <span className={!isDark ? styles.activeLabel : styles.inactiveLabel}>
                Light
              </span>
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  id="themeToggle"
                  checked={isDark}
                  onChange={toggleTheme}
                />
                <label htmlFor="themeToggle" className={styles.switchLabel}></label>
              </div>
              <span className={isDark ? styles.activeLabel : styles.inactiveLabel}>
                Dark
              </span>
            </div>
            <button className={styles.shareButton}>Share</button>
          </div>
        </div>
      </header>
      <div className="container">



        {/* Main Content */}
        <main className={styles.content}>
          <div className={styles.tabs}

          >
            <button
              className={styles.tab}
              onClick={() => setIsFolderModalOpen(true)}
              style={{
                color: isDark? '#fff' : '#000',
                border: isDark? '1px solid #8989890':'1px solid #898989'
              }}
            >
              <MdOutlineCreateNewFolder className={styles.folderIcon}/> Create a Folder
            </button>
            {folders.map((folder) => (
              <div
                key={folder._id}
                onClick={() => handleTabSelect(folder)}
                className={`${styles.tab} ${currentTab?._id === folder._id ? styles.activeTab : ""}`}
                style={{
                  color: isDark? '#fff' : '#000',
                  border: isDark? '1px solid #8989890':'1px solid #898989',
                }}
              >
                {folder.name} <RiDeleteBin6Line className={styles.deleteIcon} onClick={()=>handleDeleteFolder(folder._id)}/>
              </div>
            ))}
          </div>

          {/* Typebot Grid */}
          <div className={styles.formbotGrid}>
            <div
              className={styles.createCard}
              onClick={() => setIsFormbotModalOpen(true)}
            >
              <FiPlus className={styles.plusIcon} />
              <span>Create a Typebot</span>
            </div>
            {formBots.map((formbot, index) => (
              <div 
              key={index} 
              className={styles.formbotCard}
              onClick={() => handleFormClick(formbot._id)}
              >
                <span>{formbot.title}</span>
                <RiDeleteBin6Line 
                  className={styles.deleteIcon}
                  onClick={(event) => handleDeleteFormbot(formbot.folderId, formbot._id, event)}
                />
              </div>
            ))}
          </div>
        </main>

        {/*Add Folder Modal */}
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

        {/*Add Formbot Modal */}
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

        {/*Delete Folder Modal */}
        {isDeleteFolderModalOpen && (
          <ConfirmModal
            isOpen={isDeleteFolderModalOpen}
            message="Are you sure you want to delete this folder?"
            onConfirm={handleFolderDeleteConfirm}
            onCancel={()=>setIsDeleteFolderModalOpen(false)}
          />
        )}

        {/*Delete Folder Modal */}
        {isDeleteFormModalOpen && (
          <ConfirmModal
            isOpen={isDeleteFormModalOpen}
            message="Are you sure you want to delete this form?"
            onConfirm={handleDeleteFormConfirm}
            onCancel={()=>setIsDeleteFormModalOpen(false)}
          />
        )}

      </div>
    </div>
  );
}

export default Workspace;
