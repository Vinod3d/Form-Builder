/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./popup.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

function WorkspaceSelector({ workspaces, currentWorkspace, setCurrentWorkspace, isDark }) {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Select workspace
  const handleSelect = (workspace) => {
    setCurrentWorkspace(workspace);
    setIsDropdownOpen(false);
  };

  const handleLogout = ()=>{
    dispatch(logout());
  }

  return (
    <div className={styles.workspaceSelector}>
      {/* Selected Workspace */}
      <div
        className={styles.selectedWorkspace}
        style={{
          backgroundColor: isDark ? "#0f1117" : "#fff",
          color: isDark ? "#fff" : "#000",
          border: isDark ? "1px solid #444" : "1px solid #ccc",
        }}
        onClick={toggleDropdown}
      >
        {currentWorkspace?.name} <span className={styles.arrow}>▼</span>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className={styles.dropdownMenu}
          style={{
            backgroundColor: isDark ? "#0f1117" : "#fff",
            color: isDark ? "#fff" : "#000",
            border: isDark ? "1px solid #444" : "1px solid #ccc",
          }}
        >
          {workspaces.map((workspace, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleSelect(workspace)}
            >
              {workspace.name}
            </div>
          ))}
          <div className={styles.dropdownItem} onClick={()=>navigate('/settings')}>Setting</div>
          <div className={styles.dropdownItem} style={{color: '#FFA54C'}} onClick={handleLogout}>Log Out</div>
        </div>
      )}
    </div>
  );
}

export default WorkspaceSelector;
