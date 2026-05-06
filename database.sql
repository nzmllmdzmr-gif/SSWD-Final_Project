CREATE TABLE concerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  artist VARCHAR(255),
  venue VARCHAR(255),
  city VARCHAR(100),
  concert_date DATE,
  price DECIMAL(10,2),
  tickets_available INT,
  description TEXT,
  poster_url TEXT
);