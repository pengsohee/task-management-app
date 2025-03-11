# Task Management App

This is a full-stack Task Management application built using:
- **Frontend**: Next.js with TypeScript, Tailwind CSS
- **Backend**: .NET with C#, PostgreSQL
- **Authentication**: Implemented in .NET backend
- **Database**: PostgreSQL

## Project Structure
```
📂 task-management-app
├── 📂 fe   # Frontend (Next.js, TypeScript)
├── 📂 be   # Backend (.NET, C#)
└── 📂 notes # Documentation & development notes
```

## Features
- **User Authentication**
- **Task Management** (Create, Read, Update, Delete)
- **Project Assignment**
- **Tracking Task Status**
- **Database Integration with PostgreSQL**
- **API with .NET Core**

## Getting Started

### Prerequisites
- **Frontend**: Node.js (v20.18.3), npm (v11.2.0)
- **Backend**: .NET SDK, PostgreSQL

### Setup Guide

#### Clone the Repository
```sh
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

#### Setup Frontend
```sh
cd task-management-fe
npm install
npm run dev
```

#### Setup Backend
```sh
cd ../task-management-api
dotnet restore
dotnet run
```

## Git Best Practices
- Frontend (`fe/`) and Backend (`be/`) **should not be separate repositories**, they are structured in a single repository.
- Ensure `.gitignore` ignores unnecessary files like `.vs/`, `node_modules/`, `bin/`, `obj/`, and `.env` files.

## Common Git Issues & Fixes

**1. Permission Denied Error While Adding Files**
```sh
sudo chmod -R 777 .vs/
```

**2. LF vs. CRLF Warnings**
```sh
git config --global core.autocrlf true
```

**3. Fix Missing Upstream Branch**
```sh
git push --set-upstream origin master
```

## Contributions
Feel free to fork the repository, create a branch, and submit a pull request. Open issues for bug reports and suggestions!

## License
This project is licensed under the MIT License.

