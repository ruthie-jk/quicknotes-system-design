
# QuickNotes API Design

## 1. Overview

QuickNotes uses a RESTful API to manage users, notes and tags.

The API uses HTTP methods and JSON for communication between the client and server.

Base URL:

`https://api.quicknotes.com/v1`

## 2. API Endpoints

| Method | Endpoint | Description | Success Status |
|---|---|---|---|
| GET | /notes | Retrieve all notes | 200 OK |
| GET | /notes/{id} | Retrieve one note | 200 OK |
| POST | /notes | Create a note | 201 Created |
| PUT | /notes/{id} | Update a note | 200 OK |
| PATCH | /notes/{id} | Partially update a note | 200 OK |
| DELETE | /notes/{id} | Delete a note | 204 No Content |
| GET | /users/{id} | Retrieve a user | 200 OK |
| GET | /tags | Retrieve all tags | 200 OK |

## 3. Create Note Request

Method: POST

Endpoint: `/notes`

Request headers:

`Content-Type: application/json`

Example request body:

```json
{
  "title": "My First Note",
  "body": "This is my first QuickNotes entry.",
  "userId": 1
}
```

Successful response: 201 Created

```json
{
  "id": 101,
  "title": "My First Note",
  "body": "This is my first QuickNotes entry.",
  "userId": 1,
  "createdAt": "2026-10-30T10:00:00Z"
}
```

## 4. Retrieve Notes

Method: GET

Endpoint: `/notes`

Example successful response: 200 OK

```json
[
  {
    "id": 1,
    "title": "Project Ideas",
    "body": "Research possible project topics.",
    "userId": 1
  },
  {
    "id": 2,
    "title": "Meeting Notes",
    "body": "Discuss project progress.",
    "userId": 1
  }
]
```

## 5. Error Handling

The API uses standard HTTP status codes.

| Status | Meaning | Description |
|---|---|---|
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | User lacks permission |
| 404 | Not Found | Requested resource does not exist |
| 500 | Internal Server Error | Unexpected server failure |

Example error response:

```json
{
  "error": {
    "code": 400,
    "message": "The note title is required."
  }
}
```

## 6. API Client Implementation

The QuickNotes frontend uses JavaScript Fetch API to communicate with JSONPlaceholder.

The reusable request function handles HTTP requests and checks response status.

The client supports:
- GET requests to retrieve notes.
- POST requests to create notes.
- DELETE requests to remove notes.

JSONPlaceholder is used as a testing API. It simulates data creation and deletion without permanently storing the changes.
