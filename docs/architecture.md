
# QuickNotes System Architecture

## 1. Overview

QuickNotes is a web-based note-taking application that allows users to create, retrieve, update and delete notes.

The system uses a client-server architecture.

## 2. Functional Requirements

The system should:
- Allow users to create notes.
- Allow users to view their notes.
- Allow users to update notes.
- Allow users to delete notes.
- Allow users to organize notes using tags.
- Validate user input.

## 3. Non-Functional Requirements

The system should:
- Be responsive on mobile and desktop.
- Provide reliable access to notes.
- Protect user information.
- Support increasing numbers of users.
- Respond to common requests quickly.
- Provide clear error messages.

## 4. Scalability Estimate

Assume QuickNotes has 1,000,000 registered users.

Assumptions:
- 10% of users are active daily.
- Each active user performs 20 reads daily.
- Each active user performs 4 writes daily.
- Each write stores approximately 2 KB.
- Each month has 30 days.

### Daily active users

1,000,000 × 10% = 100,000 users.

### Reads per second

100,000 × 20 = 2,000,000 reads daily.

2,000,000 / 86,400 = approximately 23 reads per second.

### Writes per second

100,000 × 4 = 400,000 writes daily.

400,000 / 86,400 = approximately 5 writes per second.

### Annual storage estimate

400,000 × 2 KB × 365 = 292,000,000 KB.

This is approximately 292 GB of new note data annually, excluding indexes, backups and metadata.

## 5. Architecture Diagram

```text
              USERS
                |
                v
          DNS SERVICE
                |
                v
             CDN
                |
                v
         LOAD BALANCER
                |
          +-----+-----+
          |           |
          v           v
      APP SERVER 1  APP SERVER 2
          |           |
          +-----+-----+
                |
          +-----+------+
          |            |
          v            v
        CACHE      MESSAGE QUEUE
                       |
                       v
                    WORKER
          |
          v
      PRIMARY DATABASE
          |
          v
       READ REPLICA
```

## 6. Component Responsibilities

- Users: Access the QuickNotes application through a browser.
- DNS: Resolves the application domain name to its network address.
- CDN: Delivers static files such as CSS and JavaScript.
- Load Balancer: Distributes requests across application servers.
- App Servers: Process application logic and API requests.
- Cache: Stores frequently accessed data for faster retrieval.
- Message Queue: Holds background tasks for asynchronous processing.
- Worker: Processes queued tasks such as notifications.
- Primary Database: Handles data writes and authoritative storage.
- Read Replica: Handles additional read traffic.

## 7. Request Flows

### GET /notes

1. A user requests their notes through the browser.
2. DNS resolves the application address.
3. The load balancer selects an available application server.
4. The application server checks the cache.
5. If the data is not cached, it queries the read replica.
6. The server returns the notes as JSON.
7. The browser displays the notes.

### POST /notes

1. The user submits a new note.
2. The browser sends a POST request with JSON data.
3. The load balancer forwards the request to an application server.
4. The server validates the data and user permissions.
5. The application writes the note to the primary database.
6. The server returns a 201 Created response.
7. The browser displays the new note.

## 8. Architecture Trade-offs

### SQL vs NoSQL

A relational database provides strong consistency and structured relationships. However, it requires more planning when changing the data structure.

### Caching vs Fresh Data

Caching improves response speed and reduces database load. However, cached information can become outdated. Cache invalidation is therefore necessary after updates.

### Read Replicas vs Write Consistency

Read replicas distribute read traffic and improve scalability. However, replication delays may cause recently updated information to appear late.

## 9. Avoiding Single Points of Failure

- Use multiple application servers.
- Configure health checks and failover for the load balancer.
- Use database backups and replication.
- Deploy redundant cache and queue services.
- Monitor application health and infrastructure failures.
