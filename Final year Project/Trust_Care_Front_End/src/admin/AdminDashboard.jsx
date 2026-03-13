import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import logo from "../assets/logo.png";

// ─── Shared Top Bar & Nav ───────────────────────────────────────────────────
const AdminTopBar = ({ activeTab, setActiveTab, onLogout }) => {
  const tabs = ["Home", "Users", "Services", "Reports", "Finance", "Settings"];
  return (
    <>
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <img src={logo} alt="Trust Care Logo" className="topbar-logo" />
        </div>
        <h1 className="topbar-title">Admin Dashboard</h1>
        <div className="topbar-right-placeholder"></div>
      </div>
      <div className="admin-nav">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`nav-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <button className="logout-btn" onClick={onLogout}>
          ▶ Log Out
        </button>
      </div>
    </>
  );
};

// ─── HOME TAB ───────────────────────────────────────────────────────────────
const HomeTab = ({ setActiveTab }) => {
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo") || "{}");
  const lastLogin = adminInfo.lastLogin
    ? new Date(adminInfo.lastLogin).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Today";

  return (
  <div className="admin-content">
    <div className="welcome-banner">
      Welcome, {adminInfo.username || "Admin"} | Last Login: {lastLogin}
    </div>

    <div className="stats-grid">
      <div className="stat-card stat-blue">
        <div className="stat-number">1,247</div>
        <div className="stat-label">Total Users</div>
      </div>
      <div className="stat-card stat-green">
        <div className="stat-number">532</div>
        <div className="stat-label">Service Providers</div>
      </div>
      <div className="stat-card stat-teal">
        <div className="stat-number">715</div>
        <div className="stat-label">Families</div>
      </div>
      <div className="stat-card stat-orange">
        <div className="stat-number">80</div>
        <div className="stat-label">Active Services</div>
      </div>
      <div className="stat-card stat-purple">
        <div className="stat-number">1,523</div>
        <div className="stat-label">Completed</div>
      </div>
      <div className="stat-card stat-red">
        <div className="stat-number">12</div>
        <div className="stat-label">Pending Issues</div>
      </div>
    </div>

    <div className="activity-card">
      <h3>📊 Recent Activity</h3>
      <div className="activity-item">✅ New provider registered: John Doe</div>
      <div className="activity-item">✅ Service completed: Elder Care #1234</div>
      <div className="activity-item">⚠️ Report submitted: Service #5678</div>
      <div className="activity-item">✅ Payment processed: Rs. 75,000</div>
    </div>

    <div className="quick-actions-card">
      <h3>Quick Actions</h3>
      <button className="action-btn action-btn-blue" onClick={() => setActiveTab("Users")}>
        View All Users
      </button>
      <button className="action-btn action-btn-orange" onClick={() => setActiveTab("Reports")}>
        View Reports
      </button>
    </div>
  </div>
  );
};

// ─── USERS TAB ──────────────────────────────────────────────────────────────
const UsersTab = () => {
  const [filter, setFilter] = useState("All Users");
  const filters = ["All Users", "Families", "Verified", "Pending"];

  const users = [
    {
      name: "Zarah Mehar",
      type: "Family | Service Taker",
      email: "sarah@email.com",
      joined: "Dec 2024",
      services: 8,
      status: "Active",
      badgeClass: "badge-active",
      isPending: false,
    },
    {
      name: "Pending User",
      type: "Service Provider | Verification Pending",
      email: "pending@email.com",
      joined: null,
      registeredAgo: "2 hours ago",
      status: "Pending",
      badgeClass: "badge-pending",
      isPending: true,
    },
  ];

  // Filter users based on selected tab
  const filteredUsers = users.filter((user) => {
    if (filter === "All Users") return true;
    if (filter === "Families") return user.type.includes("Family");
    if (filter === "Verified") return user.status === "Active";
    if (filter === "Pending") return user.isPending;
    return true;
  });

  return (
    <div className="admin-content">
      <div className="search-bar-wrapper">
        <input
          className="search-bar"
          type="text"
          placeholder="Search users by name, email, NIC......"
        />
      </div>

      <div className="filter-tabs">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Show Provider Verification section when Pending tab is selected */}
      {filter === "Pending" ? (
        <>
          <div className="verification-header-banner">Provider Verification</div>
          <div className="pending-alert">
            ⚠️ 5 providers waiting for verification
          </div>
          <div className="verification-card">
            <h4>Pending Verification – Provider #789</h4>
            <div className="provider-info-row">
              <div className="provider-avatar">👤</div>
              <div className="provider-details">
                <p><strong>Name:</strong> Ravi Kumar</p>
                <p><strong>NIC:</strong> 456789012V</p>
                <p><strong>Contact:</strong> +94 77 999 8898</p>
                <p><strong>Service Type:</strong> Elder Care</p>
                <p><strong>Experience:</strong> 6 years</p>
                <p><strong>Registered:</strong> 3 hours ago</p>
              </div>
            </div>
            <div className="documents-card">
              <h5>Uploaded Documents</h5>
              <div className="doc-item"><span className="doc-verified">✅</span> NIC Copy – Verified</div>
              <div className="doc-item"><span className="doc-verified">✅</span> Photo – Verified</div>
              <div className="doc-item"><span className="doc-verified">✅</span> Certificates – Verified</div>
              <div className="doc-item"><span className="doc-pending">⚠️</span> Police Report – Pending</div>
            </div>
            <label className="form-label">Verification Notes</label>
            <textarea className="notes-textarea" placeholder="Add notes about verification..." />
            <div className="verification-actions">
              <button className="btn-approve">✓ Approve &amp; Activate</button>
              <button className="btn-reject">✗ Reject Application</button>
            </div>
          </div>
        </>
      ) : (
        filteredUsers.map((user, idx) => (
          <div className="user-card" key={idx}>
            <div className="user-card-top">
              <div>
                <h4>{user.name}</h4>
                <p>{user.type}</p>
                <p>Email: {user.email}</p>
                {user.joined ? (
                  <p>Joined: {user.joined} | Services: {user.services}</p>
                ) : (
                  <p>Registered: {user.registeredAgo}</p>
                )}
              </div>
              <span className={`badge ${user.badgeClass}`}>{user.status}</span>
            </div>
            <div className="user-card-actions">
              {!user.isPending ? (
                <>
                  <button className="btn-view">View Details</button>
                  <button className="btn-edit">Edit</button>
                </>
              ) : (
                <>
                  <button className="btn-approve">Approve</button>
                  <button className="btn-reject">Reject</button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// ─── SERVICES TAB ───────────────────────────────────────────────────────────
const ServicesTab = () => {
  const [filter, setFilter] = useState("All Services");
  const filters = ["All Services", "Active", "Completed", "Issues"];

  return (
    <div className="admin-content">
      <div className="search-bar-wrapper">
        <input
          className="search-bar"
          type="text"
          placeholder="Search users by name, email, NIC......"
        />
      </div>

      <div className="filter-tabs">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Issues content - shown when Issues tab is clicked */}
      {filter === "Issues" ? (
        <>
          <div className="service-card issue-priority-high service-card">
            <h4>
              <span className="priority-dot dot-red"></span>
              High Priority – Payment Issue
            </h4>
            <p><strong>Ticket #458</strong></p>
            <p><strong>From:</strong> Zarah Mehar (Family)</p>
            <p><strong>Issue:</strong> Payment not reflected after 48 hours</p>
            <p><strong>Submitted:</strong> 30 minutes ago</p>
            <div style={{ margin: "8px 0" }}>
              <span className="badge-urgent">Urgent</span>
            </div>
            <div className="service-card-actions">
              <button className="btn-respond">View &amp; Respond</button>
              <button className="btn-resolve">Mark Resolved</button>
            </div>
          </div>

          <div className="service-card issue-priority-medium service-card">
            <h4>
              <span className="priority-dot dot-orange"></span>
              Medium – Profile Update Request
            </h4>
            <p><strong>Ticket #457</strong></p>
            <p><strong>From:</strong> Ravi Kumar (Provider)</p>
            <p><strong>Issue:</strong> Cannot update service locations</p>
            <p><strong>Submitted:</strong> 4 hours ago</p>
            <div style={{ margin: "8px 0" }}>
              <span className="badge-medium-p">Pending</span>
            </div>
            <div className="service-card-actions">
              <button className="btn-respond">View &amp; Respond</button>
              <button className="btn-resolve">Mark Resolved</button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Service #1234 - shown for All Services and Active */}
          {(filter === "All Services" || filter === "Active") && (
            <div className="service-card">
              <div className="service-card-top">
                <h4>Service #1234 – Elder Care</h4>
                <span className="badge badge-active">Active</span>
              </div>
              <p><strong>Provider:</strong> Ms. Minosh</p>
              <p><strong>Client:</strong> Zarah Mehar</p>
              <p><strong>Location:</strong> Galle</p>
              <p><strong>Started:</strong> Jan 5, 2026</p>
              <p><strong>Duration:</strong> Monthly</p>
              <p><strong>Amount:</strong> Rs. 75,000</p>
              <div className="service-card-actions">
                <button className="btn-view">View Full Details</button>
                <button className="btn-edit">Contact Parties</button>
              </div>
            </div>
          )}

          {/* Service #5678 - shown for All Services and Completed */}
          {(filter === "All Services" || filter === "Completed") && (
            <div className="service-card">
              <div className="service-card-top">
                <h4>Service #5678 – Hospital Patient Care</h4>
                <span className="badge badge-verified">Completed</span>
              </div>
              <p><strong>Provider:</strong> Mr. Karthic Gopal (4.9⭐)</p>
              <p><strong>Client:</strong> Ravi Kumar</p>
              <p><strong>Location:</strong> Colombo</p>
              <p><strong>Completed:</strong> Dec 28, 2025</p>
              <p><strong>Amount:</strong> Rs. 49,000 (Paid)</p>
              <div className="service-card-actions">
                <button className="btn-view">View Full Details</button>
              </div>
            </div>
          )}

          {/* Service #9012 - shown for All Services only */}
          {filter === "All Services" && (
            <div className="service-card issue-card">
              <div className="service-card-top">
                <h4>⚠️ Service #9012 – Child Care [Issue Reported]</h4>
                <span className="badge badge-pending">Requires Action</span>
              </div>
              <p><strong>Provider:</strong> Ms. Minosh (Pending Investigation)</p>
              <p><strong>Client:</strong> Anonymous</p>
              <p><strong>Issue:</strong> Provider didn't show up</p>
              <p><strong>Reported:</strong> 2 hours ago</p>
              <div className="service-card-actions">
                <button className="btn-reject">View Report</button>
                <button className="btn-view">Investigate</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// ─── REPORTS TAB ────────────────────────────────────────────────────────────
const ReportsTab = () => {
  const [reportType, setReportType] = useState("User Growth Report");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <div className="admin-content">
      <div className="reports-header">Reports & Analytics</div>

      <label className="form-label">Select Report Type</label>
      <select
        className="form-select"
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
      >
        <option>User Growth Report</option>
        <option>Service Summary Report</option>
        <option>Revenue Report</option>
        <option>Provider Performance Report</option>
      </select>

      <div className="date-row">
        <div>
          <label className="form-label">From Date</label>
          <input
            type="date"
            className="form-input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">To Date</label>
          <input
            type="date"
            className="form-input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      <button className="generate-btn">Generate Report</button>

      <div className="summary-card">
        <h4>📋 Monthly Summary (January 2026)</h4>
        <div className="chart-placeholder">
          <div className="chart-icon">📊</div>
          <div>Chart Placeholder</div>
          <div>Service distribution by type</div>
        </div>
        <div className="summary-item"><span>Total Services:</span><span>156</span></div>
        <div className="summary-item"><span>Elder Care:</span><span>58 (37%)</span></div>
        <div className="summary-item"><span>Child Care:</span><span>42 (27%)</span></div>
        <div className="summary-item"><span>Hospital Patient:</span><span>31 (20%)</span></div>
        <div className="summary-item"><span>Home Patient:</span><span>25 (16%)</span></div>
        <div className="revenue-total">
          Total Revenue: Rs. 8,750,000{" "}
          <span className="growth-text">+23% from last month</span>
        </div>
        <div className="export-row">
          <button className="btn-export-pdf">Export PDF</button>
          <button className="btn-export-excel">Export Excel</button>
        </div>
      </div>
    </div>
  );
};

// ─── FINANCE TAB ─────────────────────────────────────────────────────────────
const FinanceTab = () => (
  <div className="admin-content">
    <div className="finance-stats">
      <div className="stat-card stat-blue">
        <div className="stat-number" style={{ fontSize: "1.8rem" }}>Rs. 8.75M</div>
        <div className="stat-label">Total Revenue (MTD)</div>
      </div>
      <div className="stat-card stat-green">
        <div className="stat-number" style={{ fontSize: "1.8rem" }}>Rs. 875K</div>
        <div className="stat-label">Platform Commission</div>
      </div>
      <div className="stat-card stat-red">
        <div className="stat-number" style={{ fontSize: "1.8rem" }}>Rs. 7.88M</div>
        <div className="stat-label">Provider Payouts</div>
      </div>
    </div>

    <div className="transactions-card">
      <h4>💳 Recent Transactions</h4>
      <div className="transaction-item">
        <p className="t-amount">Service #1234 – Rs. 75,000</p>
        <p>Zarah Mehar → Ms. Minosh</p>
        <p>Platform Fee: Rs. 7,500</p>
        <p className="t-time">2 hours ago</p>
      </div>
      <div className="transaction-item">
        <p className="t-amount">Service #1233 – Rs. 49,000</p>
        <p>Mr. Karthic Gopair → Ravi Kumar</p>
        <p>Platform Fee: Rs. 4,900</p>
        <p className="t-time">6 hours ago</p>
      </div>
    </div>

    <div className="comparison-card">
      <h4>📊 Monthly Comparison</h4>
      <div className="comparison-item">
        <span>January 2026:</span>
        <span>Rs. 8,750,000 (+23%)</span>
      </div>
      <div className="comparison-item">
        <span>December 2025:</span>
        <span>Rs. 7,110,000</span>
      </div>
      <div className="comparison-item">
        <span>November 2025:</span>
        <span>Rs. 6,450,000</span>
      </div>
    </div>

    <button className="generate-btn">Generate Report</button>
  </div>
);

// ─── SETTINGS TAB ────────────────────────────────────────────────────────────
const SettingsTab = () => {
  const [platformName, setPlatformName] = useState("Trust Care");
  const [supportEmail, setSupportEmail] = useState("support@trustcare.lk");
  const [supportPhone, setSupportPhone] = useState("+94 11 234 5678");
  const [commission, setCommission] = useState("10");
  const [serviceFee, setServiceFee] = useState("500");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    daily: false,
  });

  const toggleNotification = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="admin-content">
      {/* General Settings */}
      <div className="settings-section">
        <h4>⚙️ General Settings</h4>
        <label className="form-label">Platform Name</label>
        <input
          className="form-input"
          value={platformName}
          onChange={(e) => setPlatformName(e.target.value)}
        />
        <label className="form-label">Support Email</label>
        <input
          className="form-input"
          value={supportEmail}
          onChange={(e) => setSupportEmail(e.target.value)}
        />
        <label className="form-label">Support Phone</label>
        <input
          className="form-input"
          value={supportPhone}
          onChange={(e) => setSupportPhone(e.target.value)}
        />
        <button className="save-btn">Save Changes</button>
      </div>

      {/* Commission & Fees */}
      <div className="settings-section">
        <h4>💰 Commission & Fees</h4>
        <label className="form-label">Platform Commission (%)</label>
        <input
          className="form-input"
          placeholder="e.g. 10"
          value={commission}
          onChange={(e) => setCommission(e.target.value)}
        />
        <label className="form-label">Service Fee (Rs.)</label>
        <input
          className="form-input"
          placeholder="500"
          value={serviceFee}
          onChange={(e) => setServiceFee(e.target.value)}
        />
        <button className="save-btn">Update Fees</button>
      </div>

      {/* Notification Settings */}
      <div className="settings-section">
        <h4>🔔 Notification Settings</h4>
        {[
          { key: "email", label: "Email notifications to users" },
          { key: "sms",   label: "SMS notifications" },
          { key: "push",  label: "Push notifications" },
          { key: "daily", label: "Daily admin reports" },
        ].map(({ key, label }) => (
          <div className="checkbox-row" key={key}>
            <input
              type="checkbox"
              id={key}
              checked={notifications[key]}
              onChange={() => toggleNotification(key)}
            />
            <label htmlFor={key}>{label}</label>
          </div>
        ))}
        <button className="save-btn">Save Settings</button>
      </div>
    </div>
  );
};

// ─── ISSUES SUB-TAB (inside Services) ────────────────────────────────────────
const IssuesTab = () => (
  <div className="admin-content">
    <div className="search-bar-wrapper">
      <input
        className="search-bar"
        type="text"
        placeholder="Search users by name, email, NIC......"
      />
    </div>
    <div className="filter-tabs">
      {["All Services", "Active", "Completed", "Issues"].map((f) => (
        <button key={f} className={`filter-tab ${f === "Issues" ? "active" : ""}`}>
          {f}
        </button>
      ))}
    </div>

    {/* High Priority */}
    <div className="service-card issue-priority-high service-card">
      <h4>
        <span className="priority-dot dot-red"></span>
        High Priority – Payment Issue
      </h4>
      <p><strong>Ticket #458</strong></p>
      <p><strong>From:</strong> Zarah Mehar (Family)</p>
      <p><strong>Issue:</strong> Payment not reflected after 48 hours</p>
      <p><strong>Submitted:</strong> 30 minutes ago</p>
      <div style={{ margin: "8px 0" }}>
        <span className="badge-urgent">Urgent</span>
      </div>
      <div className="service-card-actions">
        <button className="btn-respond">View &amp; Respond</button>
        <button className="btn-resolve">Mark Resolved</button>
      </div>
    </div>

    {/* Medium Priority */}
    <div className="service-card issue-priority-medium service-card">
      <h4>
        <span className="priority-dot dot-orange"></span>
        Medium – Profile Update Request
      </h4>
      <p><strong>Ticket #457</strong></p>
      <p><strong>From:</strong> Ravi Kumar (Provider)</p>
      <p><strong>Issue:</strong> Cannot update service locations</p>
      <p><strong>Submitted:</strong> 4 hours ago</p>
      <div style={{ margin: "8px 0" }}>
        <span className="badge-medium-p">Pending</span>
      </div>
      <div className="service-card-actions">
        <button className="btn-respond">View &amp; Respond</button>
        <button className="btn-resolve">Mark Resolved</button>
      </div>
    </div>
  </div>
);

// ─── PROVIDER VERIFICATION SUB-TAB ───────────────────────────────────────────
const VerificationTab = () => {
  const [filter, setFilter] = useState("Pending");
  const filters = ["All Users", "Providers", "Families", "Verified", "Pending"];

  return (
    <div className="admin-content">
      <div className="verification-header-banner">Provider Verification</div>

      <div className="filter-tabs">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="pending-alert">
        ⚠️ 5 providers waiting for verification
      </div>

      <div className="verification-card">
        <h4>Pending Verification – Provider #789</h4>
        <div className="provider-info-row">
          <div className="provider-avatar">👤</div>
          <div className="provider-details">
            <p><strong>Name:</strong> Ravi Kumar</p>
            <p><strong>NIC:</strong> 456789012V</p>
            <p><strong>Contact:</strong> +94 77 999 8898</p>
            <p><strong>Service Type:</strong> Elder Care</p>
            <p><strong>Experience:</strong> 6 years</p>
            <p><strong>Registered:</strong> 3 hours ago</p>
          </div>
        </div>

        <div className="documents-card">
          <h5>Uploaded Documents</h5>
          <div className="doc-item">
            <span className="doc-verified">✅</span> NIC Copy – Verified
          </div>
          <div className="doc-item">
            <span className="doc-verified">✅</span> Photo – Verified
          </div>
          <div className="doc-item">
            <span className="doc-verified">✅</span> Certificates – Verified
          </div>
          <div className="doc-item">
            <span className="doc-pending">⚠️</span> Police Report – Pending
          </div>
        </div>

        <label className="form-label">Verification Notes</label>
        <textarea
          className="notes-textarea"
          placeholder="Add notes about verification..."
        />

        <div className="verification-actions">
          <button className="btn-approve">✓ Approve &amp; Activate</button>
          <button className="btn-reject">✗ Reject Application</button>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeTab setActiveTab={setActiveTab} />;
      case "Users":
        return <UsersTab />;
      case "Services":
        return <ServicesTab />;
      case "Reports":
        return <ReportsTab />;
      case "Finance":
        return <FinanceTab />;
      case "Settings":
        return <SettingsTab />;
      default:
        return <HomeTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="admin-layout">
      <AdminTopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;