/* eslint-disable react/prop-types */
// FormResponse.jsx
import { FaEye, FaPlayCircle, FaCheckCircle } from "react-icons/fa";
import styles from "./formResponse.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResponsesByFormId } from "../../../../store/slice/responseSlice";
import { fetchFormAnalytics } from "../../../../store/slice/analyticSlice";

function FormResponse({isDark, formFlow, form }) {
  const formId = formFlow?.id
  const dispatch = useDispatch();
  const {responses} = useSelector((state)=>state.responses)
  useEffect(() => {
    dispatch(fetchResponsesByFormId(formId))
    dispatch(fetchFormAnalytics(formId)); 
  },[dispatch, formId])


  if (formFlow.elements.length === 0) {
    return (
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <p className={styles.textMuted}>
            No form elements added yet. Switch to Flow tab to build your form.
          </p>
        </div>
      </div>
    );
  }

  const completionRate = (form?.analytics?.completed / form?.analytics.starts) * 100;
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }
  

  return (
    <div className={styles.container} style={{ 
      background: isDark? '#1F1F23' : 'transparent',
      color: isDark? '#fff' : '',
    }}>
      {/* Metrics */}
      <div className={styles.metricsGrid}>
        <MetricCard title="Views" value={form?.analytics.views} icon={FaEye} />
        <MetricCard title="Starts" value={form?.analytics.starts} icon={FaPlayCircle} />
        <MetricCard title="Completed" value={form?.analytics.completed} icon={FaCheckCircle} />
      </div>

      {/* Submissions Table */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Recent Submissions</h2>
        </div>
        <div className={styles.cardContent}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Submitted at</th>
                {responses[0]?.responses.map((element) => (
                  <th key={element._id}>
                    {element.question}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responses?.map((form, index) => (
                <tr key={form._id}>
                  <td>{index + 1}</td>
                  <td>{formatDate(form.submittedAt)}</td>
                  {form?.responses.map((element) => (
                    <td key={element.id}>
                      {element.answer}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Completion Rate */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Completion Rate</h2>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.completionRate}>
            <p>{completionRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon }) {
  return (
    <div className={styles.metricCard}>
      <div className={styles.icon}>
        <Icon />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default FormResponse;
