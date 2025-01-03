// FormResponse.jsx
import { FaEye, FaPlayCircle, FaCheckCircle } from "react-icons/fa";
import styles from "./formResponse.module.css";

// Mock data for demonstration
const mockAnalytics = {
  views: 6,
  starts: 100,
  completed: 33,
  submissions: [
    {
      id: "1",
      submittedAt: "Jul 17, 03:23 PM",
      answers: {
        "button-1": "Hi!",
        "email-1": "abc@g.com",
        "text-1": "alpha",
        "button-2": "Studio App to Manage Clients, Tracking App for Clients",
        "rating-1": 5,
      },
    },
    {
      id: "2",
      submittedAt: "Jul 17, 02:48 PM",
      answers: {
        "button-1": "Hi!",
        "email-1": "fidfasd",
        "rating-1": 3,
      },
    },
    {
      id: "3",
      submittedAt: "Jul 14, 04:25 PM",
      answers: {
        "button-1": "Hi!",
        "rating-1": 4,
      },
    },
  ],
};

function FormResponse({isDark, formFlow }) {
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

  const completionRate = (mockAnalytics.completed / mockAnalytics.starts) * 100;

  return (
    <div className={styles.container} style={{ 
      background: isDark? '#1F1F23' : 'transparent',
      color: isDark? '#fff' : '',
    }}>
      {/* Metrics */}
      <div className={styles.metricsGrid}>
        <MetricCard title="Views" value={mockAnalytics.views} icon={FaEye} />
        <MetricCard title="Starts" value={mockAnalytics.starts} icon={FaPlayCircle} />
        <MetricCard title="Completed" value={mockAnalytics.completed} icon={FaCheckCircle} />
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
                {formFlow.elements.map((element) => (
                  <th key={element.id}>
                    {element.input?.label || element.bubble.content}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockAnalytics.submissions.map((submission, index) => (
                <tr key={submission.id}>
                  <td>{index + 1}</td>
                  <td>{submission.submittedAt}</td>
                  {formFlow.elements.map((element) => (
                    <td key={element.id}>
                      {submission.answers[element.id] || "-"}
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
