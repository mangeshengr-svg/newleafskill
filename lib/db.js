import mysql from 'mysql2/promise';

// Connection pool banate hain taaki multiple queries efficiently handle ho sakein
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'newleafskills',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;