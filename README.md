# Intelligent Media Processing Pipeline


## Overview

The Intelligent Media Processing Pipeline is an asynchronous backend application that processes uploaded vehicle images efficiently using a queue-based architecture.

When a user uploads an image, the system stores the file locally, saves metadata in MongoDB, adds a processing job to a BullMQ queue, and immediately returns a unique processing ID. A background worker then analyzes the image and updates the processing results in the database.

The system exposes REST APIs that allow users to check processing status, retrieve analysis results, and view failure information if processing does not complete successfully.

---

# Features

- Upload vehicle images using REST API
- Store image metadata in MongoDB Atlas
- Background job processing with BullMQ and Redis
- OCR (Optical Character Recognition) using Tesseract.js
- Brightness detection
- Blur detection
- Indian vehicle number plate validation
- Processing status tracking
- Analysis result retrieval
- Failure handling and logging
- Docker support for Redis

---

# Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | REST API Framework |
| MongoDB Atlas | Database |
| Mongoose | MongoDB ODM |
| BullMQ | Background Job Queue |
| Redis | Queue Storage |
| Docker | Redis Container |
| Multer | Image Upload |
| Jimp | Image Processing |
| Tesseract.js | OCR |
| UUID | Processing ID Generation |
| Morgan | API Logging |

---

# Project Structure

```text
intelligent-media-processing

│
├── uploads
│
├── src
│   ├── config
│   │   ├── db.js
│   │   └── redis.js
│   │
│   ├── controllers
│   │   ├── imageController.js
│   │   ├── statusController.js
│   │   ├── resultController.js
│   │   └── failureController.js
│   │
│   ├── middleware
│   │   └── upload.js
│   │
│   ├── models
│   │   └── Image.js
│   │
│   ├── queues
│   │   └── imageQueue.js
│   │
│   ├── routes
│   │   ├── imageRoutes.js
│   │   ├── statusRoutes.js
│   │   ├── resultRoutes.js
│   │   └── failureRoutes.js
│   │
│   ├── services
│   │   └── imageAnalysis.js
│   │
│   ├── workers
│   │   └── imageWorker.js
│   │
│   └── utils
│
├── uploads
├── .env
├── .gitignore
├── docker-compose.yml
├── package.json
├── server.js
└── README.md
```

---

# System Workflow

```text
                Client

                  │

        POST /api/upload

                  │

                  ▼

          Express Backend

                  │

       Save Image & Metadata

                  │

              MongoDB

                  │

        Add Job to BullMQ

                  │

                Redis

                  │

         Background Worker

                  │

          Image Analysis

      ┌────────┬────────┬────────────┬─────────────┐
      │        │        │            │
      ▼        ▼        ▼            ▼
 Brightness  Blur      OCR     Plate Validation

                  │

          Update MongoDB

                  │

                  ▼

      GET /api/result/:processingId
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/upload` | Upload image |
| GET | `/api/status/:processingId` | Check processing status |
| GET | `/api/result/:processingId` | Retrieve analysis result |
| GET | `/api/failure/:processingId` | Retrieve failure reason |
| GET | `/api/health` | Check API health |

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/intelligent-media-processing.git

cd intelligent-media-processing
```

## Install Dependencies

```bash
npm install
```

## Start Redis

```bash
docker compose up -d
```

## Start the Server

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

REDIS_HOST=127.0.0.1

REDIS_PORT=6379
```

---

# Sample API Response

### Upload

```json
{
  "success": true,
  "processingId": "123456-abcd",
  "status": "pending"
}
```

### Result

```json
{
  "success": true,
  "processingId": "123456-abcd",
  "status": "completed",
  "analysis": {
    "brightness": "Normal",
    "blur": false,
    "blurScore": 27.8,
    "averageBrightness": 122.3,
    "extractedText": "KA19AB1234",
    "validNumberPlate": true
  }
}
```

---

# AI Usage

This project was developed with assistance from ChatGPT for:

- Project planning
- Backend architecture
- Express.js API development
- BullMQ integration
- OCR implementation
- Documentation preparation

All generated code was manually reviewed, tested, and validated using Postman, MongoDB Atlas, and Docker.

---

# Design Decisions

- Used BullMQ to process images asynchronously.
- Used Redis as the message broker for BullMQ.
- Used MongoDB Atlas to store metadata and processing results.
- Used Jimp for lightweight image processing on Windows.
- Used Tesseract.js for OCR-based text extraction.
- Used regular expressions to validate Indian vehicle registration numbers.

---

# Future Improvements

- AWS S3 for image storage
- OpenCV-based blur detection
- YOLO object detection
- Duplicate image detection
- EXIF metadata analysis
- JWT Authentication
- Automated testing with Jest and Supertest

## AI Usage

AI tools used:

- ChatGPT

AI assisted with:

- Project planning
- Folder structure
- Express API design
- BullMQ integration
- OCR implementation
- README preparation

Validation performed:

- Tested every API in Postman
- Verified MongoDB records
- Verified BullMQ job execution
- Debugged runtime errors manually

Limitations:

- AI-generated code was reviewed and modified where necessary.
- OCR accuracy depends on image quality.

## Trade-offs

- Used Jimp instead of native OpenCV because it is easier to install and maintain on Windows.
- Used heuristic blur detection instead of Laplacian variance.
- Used regex for Indian number plate validation instead of an ML model.
- Stored uploaded images locally for simplicity.
-----

# Author

**Madhushree**
