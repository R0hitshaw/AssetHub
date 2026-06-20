<div align="center">

# 🖥️ AssetHub

### AI-Powered IT Asset Management System

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.3-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring AI](https://img.shields.io/badge/Spring_AI-1.1.2-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-ai)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

**AssetHub** is a full-stack IT Asset Management System with integrated AI capabilities. Track, allocate, and manage IT assets across your organization — and let the AI assistant answer questions, generate reports, and surface smart alerts in natural language.

</div>

---

## ✨ Features

### 🏗️ Core Asset Management
- **Asset Registry** — Add, update, search, and paginate IT assets with unique asset tags (e.g. `LAP-DEL-001`)
- **Asset Lifecycle** — Track purchase dates, warranty expiry, status (`ACTIVE`, `IN_REPAIR`, `RETIRED`, etc.) and asset type
- **Allocation Tracking** — Assign assets to employees and departments with full allocation history
- **Employee Management** — Manage employee records linked to asset assignments
- **Document Management** — Attach and manage documents associated with assets

### 🤖 AI Assistant (Spring AI + Ollama)
- **Natural Language Search** — Query your asset inventory in plain English
- **AI Chatbot** — Ask questions about assets and get intelligent, context-aware answers
- **Smart Alerts** — AI-generated proactive alerts for issues like expiring warranties or underutilized assets
- **Asset Descriptions** — Auto-generate detailed descriptions for any asset by ID
- **Issue Summarizer** — Summarize maintenance or support issue text
- **Admin AI Reports** — Generate executive-level summaries of asset health by status, type, and department

### 🔐 Security & Access Control
- **JWT Authentication** — Stateless, token-based auth for all API endpoints
- **Role-Based Access Control (RBAC)** — Three roles with differentiated permissions:
    - `ADMIN` — Full access including reports and user management
    - `IT_STAFF` — Asset and allocation management
    - `EMPLOYEE` — Read access and AI search

### 📊 Reporting
- Asset counts by status, type, and department
- AI-generated narrative reports for administrators

---

## 🗂️ Project Structure

```
AssetHub/
├── docker-compose.yml                   # Orchestrates backend, frontend, and MySQL
├── asset-hub-pro/                       # React + Vite + shadcn/ui frontend
│   ├── src/
│   │   ├── pages/                       # Dashboard, Assets, Employees, AI Assistant, etc.
│   │   ├── contexts/AuthContext.tsx     # JWT auth state management
│   │   └── components/                 # Reusable UI components
│   └── Dockerfile
└── it-asset-management/
    └── it-asset-management/             # Spring Boot backend
        ├── src/main/java/com/asset/tracker/it_asset_management/
        │   ├── controller/              # REST controllers
        │   │   ├── AiController.java    # AI endpoints (/api/ai/*)
        │   │   ├── AssetController.java # Asset CRUD
        │   │   ├── AllocationController.java
        │   │   ├── AuthController.java  # Login / register
        │   │   ├── EmpController.java
        │   │   └── ReportController.java
        │   ├── model/                   # JPA entities
        │   │   ├── Asset.java
        │   │   ├── Allocation.java
        │   │   ├── Employee.java
        │   │   ├── Document.java
        │   │   └── User.java
        │   ├── service/                 # Business logic layer
        │   ├── repository/              # Spring Data JPA repositories
        │   ├── security/                # JWT filter, config, user details
        │   ├── config/                  # App config, cache, CORS
        │   ├── dto/                     # Request/Response DTOs
        │   ├── mapper/                  # Entity ↔ DTO mappers
        │   └── exception/               # Global error handling
        └── Dockerfile
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17, Spring Boot 3.5.3 |
| AI / LLM | Spring AI 1.1.2, Ollama (Phi-3) |
| Security | Spring Security, JWT (JJWT) |
| Persistence | Spring Data JPA / Hibernate, MySQL 8.0 |
| API Docs | SpringDoc OpenAPI (Swagger UI) |
| Frontend | React, Vite, TypeScript, shadcn/ui, Tailwind CSS |
| Containerization | Docker, Docker Compose |
| Build Tool | Maven |

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose
- [Ollama](https://ollama.ai/) running locally with the `phi3` model pulled

```bash
ollama pull phi3
```

### 1. Clone the repository

```bash
git clone https://github.com/R0hitshaw/AssetHub.git
cd AssetHub
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
MYSQL_DATABASE=assethub
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_PASSWORD=yourpassword
MYSQL_USER=assethub_user
JWT_SECRET=your_super_secret_jwt_key_here
```

### 3. Start the application

```bash
docker-compose up --build
```

This will spin up:
- **MySQL** on port `3306`
- **Spring Boot backend** on port `8080`
- **React frontend** on port `5173`

### 4. Access the application

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui.html |

---

## 📡 API Overview

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |

### Assets
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/asset/add` | ADMIN, IT_STAFF | Add a new asset |
| `GET` | `/api/asset/{id}` | All roles | Get asset by ID |
| `GET` | `/api/asset` | All roles | List all assets (paginated) |
| `PUT` | `/api/asset/{id}` | ADMIN, IT_STAFF | Update asset |
| `PATCH` | `/api/asset/{id}/status` | ADMIN, IT_STAFF | Update asset status |

### AI Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/ai/search` | All roles | Natural language asset search |
| `POST` | `/api/ai/chat` | All roles | General AI chatbot |
| `POST` | `/api/ai/report` | ADMIN | Generate AI asset report |
| `GET` | `/api/ai/alerts` | ADMIN, IT_STAFF | Smart alerts |
| `POST` | `/api/ai/summarize` | All roles | Summarize an issue |
| `GET` | `/api/ai/asset/{assetId}` | All roles | AI asset description |

### Allocations & Employees
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/allocation` | Allocate asset to employee |
| `GET` | `/api/allocation` | List all allocations |
| `GET` | `/api/employee` | List employees |
| `POST` | `/api/employee` | Add employee |

---

## 🔑 Roles & Permissions

| Feature | ADMIN | IT_STAFF | EMPLOYEE |
|---|:---:|:---:|:---:|
| View assets | ✅ | ✅ | ✅ |
| Add / update assets | ✅ | ✅ | ❌ |
| AI search & chat | ✅ | ✅ | ✅ |
| Smart alerts | ✅ | ✅ | ❌ |
| AI reports | ✅ | ❌ | ❌ |
| Manage employees | ✅ | ✅ | ❌ |
| Manage documents | ✅ | ✅ | ❌ |
| View reports | ✅ | ❌ | ❌ |

---

## 🧪 Running Tests

```bash
cd it-asset-management/it-asset-management
./mvnw test
```

---

## 📦 Building for Production

### Backend (JAR)
```bash
cd it-asset-management/it-asset-management
./mvnw clean package -DskipTests
```

### Frontend
```bash
cd asset-hub-pro
npm install
npm run build
```

### Docker (all services)
```bash
docker-compose up --build -d
```

---

## ☁️ Cloud Deployment (AWS)

For production deployment on AWS, consider the following setup:

- **EC2** — Host Docker containers for backend and frontend
- **RDS (MySQL)** — Managed MySQL instance replacing the Docker MySQL service
- **S3** — Store uploaded documents and assets
- **AWS Bedrock** — Replace Ollama with a managed LLM (e.g. Claude Haiku) for cloud-native AI inference

Update `SPRING_DATASOURCE_URL` in your environment to point to your RDS endpoint.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Rohit Kumar Shaw**  
Backend Developer · Java & Spring Boot · AWS · Spring AI  
[GitHub](https://github.com/R0hitshaw)

---

## 📄 License

This project is open source. See the repository for license details.