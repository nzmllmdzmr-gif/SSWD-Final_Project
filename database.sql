CREATE DATABASE IF NOT EXISTS concert_ticket_system;
USE concert_ticket_system;

DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS concerts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'attendee'
);

CREATE TABLE concerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  artist VARCHAR(100) NOT NULL,
  venue VARCHAR(150) NOT NULL,
  city VARCHAR(100) NOT NULL,
  concert_date DATE NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  tickets_available INT NOT NULL,
  description VARCHAR(255),
  poster_url VARCHAR(255)
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  concert_id INT NOT NULL,
  quantity INT NOT NULL,
  total_price DECIMAL(8,2) NOT NULL,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (concert_id) REFERENCES concerts(id)
);

INSERT INTO users (name, email, password, role)
VALUES
('Admin User', 'admin@test.ie', '123456', 'admin'),
('Test User', 'user@test.ie', '123456', 'attendee');

INSERT INTO concerts
(artist, venue, city, concert_date, price, tickets_available, description, poster_url)
VALUES
('Taylor Swift', 'Aviva Stadium', 'Dublin', '2026-07-15', 120.00, 500, 'Pop concert', '/posters/taylor.jpg'),
('Adele', '3Arena', 'Dublin', '2026-08-02', 95.00, 300, 'Vocal concert', '/posters/adele.jpg'),
('The Weeknd', 'Marlay Park', 'Dublin', '2026-09-10', 110.00, 400, 'R&B concert', '/posters/weeknd.jpg'),
('The Neighbourhood', 'Olympia Theatre', 'Dublin', '2026-10-05', 65.00, 200, 'Indie concert', '/posters/neighbourhood.jpg'),
('Pink Floyd', 'Croke Park', 'Dublin', '2026-11-20', 130.00, 450, 'Rock concert', '/posters/pinkfloyd.jpg');