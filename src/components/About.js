import React from "react";

const About = () => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto",
      // backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "white", // "#333",
      marginTop: "10px",
    },
    subheading: {
      fontSize: "20px",
      fontWeight: "bold",
      margin: "15px 0",
      color: "white", // "#555",
    },
    paragraph: {
      fontSize: "16px",
      marginBottom: "10px",
      color: "white", // "#666",
    },
    list: {
      marginLeft: "20px",
      marginBottom: "10px",
    },
    listItem: {
      color: "white",
      marginBottom: "8px",
    },
    note: {
      fontSize: "14px",
      fontStyle: "italic",
      color: "white", //"#888",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Unimeta</h1>
      <p style={styles.paragraph}>
        Unimeta is an airdrop-based project that will launch as a coin after one
        year. With a starting investment of just $15, it provides multiple
        income opportunities for participants.
      </p>

      <h2 style={styles.subheading}>Types of Income</h2>
      <p style={styles.paragraph}>Unimeta offers three types of income:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <strong>Direct Income:</strong> $12 or $6 of referrals
        </li>
        <li style={styles.listItem}>
          <strong>Matching Income:</strong> 10% of team matching
        </li>
        <li style={styles.listItem}>
          <strong>Daily ROI Income:</strong> 1% daily return
        </li>
      </ul>

      <h3 style={styles.subheading}>1. Direct Income</h3>
      <p style={styles.paragraph}>
        For each direct left joining, a 72-hour timer starts. If a right joining
        is completed within this period, you will earn 12% instant income. After
        the timer lapses, you earn 6% on the right joining. This income can be
        earned for a lifetime by referring directly.
      </p>

      <h3 style={styles.subheading}>2. Matching Income</h3>
      <p style={styles.paragraph}>
        Matching income is based on your left and right team activity. It starts
        with a minimum of $100 on both sides and can be claimed anytime.
      </p>

      <h3 style={styles.subheading}>3. Daily ROI Income</h3>
      <p style={styles.paragraph}>
        Non-working income starts when your first referral joins. You receive
        500 Unimeta tokens, earning a 1% daily ROI for 365 days:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          365 days x 5 Unimeta (1% of 500) = 1825 Unimeta
        </li>
        <li style={styles.listItem}>Initial 500 Unimeta tokens</li>
        <li style={styles.listItem}>Total: 2325 Unimeta</li>
      </ul>

      <h2 style={styles.subheading}>Profit Calculation</h2>
      <p style={styles.paragraph}>
        After one year, Unimeta will launch at $0.4 per token. Your total
        holdings:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <strong>2325 Unimeta x $0.4 = $930</strong>
        </li>
      </ul>
      <p style={styles.paragraph}>
        <strong>Your profit:</strong> $930 for a $15 investment.
      </p>

      <p style={styles.note}>
        Note: Unimeta combines low investment and high earning potential, making
        it an attractive opportunity.
      </p>
    </div>
  );
};

export default About;
