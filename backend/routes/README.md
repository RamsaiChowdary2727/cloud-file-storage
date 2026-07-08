# Cloud File Storage API

## Features
- Upload Files
- List Uploaded Files
- Download Files
- Delete Files

## Technologies Used
- Node.js
- Express.js
- Multer
- Postman

## API Endpoints

### Upload File
POST /upload

### List Files
GET /upload/files

### Download File
GET /upload/download/:filename

### Delete File
DELETE /upload/delete/:filename

## Run Project

```bash
npm install
node server.js
```