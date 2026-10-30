
# QuickNotes Database Design

## 1. Overview

QuickNotes uses a relational database to store users, notes and tags.

The database contains four main tables:
- users
- notes
- tags
- note_tags

## 2. Database Tables

### Users

| Column | Data Type | Key |
|---|---|---|
| id | INTEGER | Primary Key |
| name | VARCHAR(100) | |
| email | VARCHAR(150) | UNIQUE |
| password_hash | VARCHAR(255) | |
| created_at | TIMESTAMP | |

### Notes

| Column | Data Type | Key |
|---|---|---|
| id | INTEGER | Primary Key |
| user_id | INTEGER | Foreign Key |
| title | VARCHAR(100) | |
| body | TEXT | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### Tags

| Column | Data Type | Key |
|---|---|---|
| id | INTEGER | Primary Key |
| name | VARCHAR(50) | UNIQUE |

### Note_Tags

| Column | Data Type | Key |
|---|---|---|
| note_id | INTEGER | Primary Key, Foreign Key |
| tag_id | INTEGER | Primary Key, Foreign Key |

## 3. Relationships

- One user can create many notes.
- One note belongs to one user.
- One note can have many tags.
- One tag can belong to many notes.

The note_tags table implements the many-to-many relationship between notes and tags.

## 4. SQL Table Creation

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE note_tags (
    note_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);
```

## 5. SQL Queries

### Retrieve all notes belonging to a user

```sql
SELECT *
FROM notes
WHERE user_id = 1;
```

### Retrieve a note with its owner's details

```sql
SELECT notes.title, notes.body, users.name, users.email
FROM notes
JOIN users ON notes.user_id = users.id
WHERE notes.id = 1;
```

### Retrieve notes with their tags

```sql
SELECT notes.title, tags.name AS tag
FROM notes
JOIN note_tags ON notes.id = note_tags.note_id
JOIN tags ON note_tags.tag_id = tags.id;
```

## 6. Indexing

```sql
CREATE INDEX idx_notes_user_id
ON notes(user_id);
```

This index improves queries that retrieve notes belonging to a particular user.

## 7. SQL vs NoSQL

### SQL

A relational database such as PostgreSQL or MySQL is suitable for QuickNotes because the application has structured data and relationships between users, notes and tags.

Advantages:
- Supports relationships using foreign keys.
- Provides transactions and data consistency.
- Supports complex queries and JOIN operations.

### NoSQL

A document database such as MongoDB stores data in flexible documents.

Advantages:
- Flexible data structures.
- Can scale horizontally.
- Useful when application data changes frequently.

### Database Choice

A relational database such as PostgreSQL is recommended for QuickNotes because the application requires structured records, reliable relationships and data integrity.
