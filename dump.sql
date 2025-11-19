PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL,
    dueDate TEXT
  );
INSERT INTO tasks VALUES(1,'Buy milk','Get whole milk from the store','pending','2025-11-15T00:00:00.000Z');
INSERT INTO tasks VALUES(2,'Code review','Review pull request #42','in_progress','2025-11-13T00:00:00.000Z');
INSERT INTO tasks VALUES(3,'Deploy app','Push to Vercel','completed','2025-11-12T00:00:00.000Z');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('tasks',3);
COMMIT;
