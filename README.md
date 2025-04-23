# kelp_global_backend_assessment
Backend Assessment for Kelp Global - Backend Developer Role

This assessment project provides a simple API to process a static CSV file stored in the `uploads` folder, parse it, and store the data into a PostgreSQL database. It also computes the age distribution from the parsed user data and supports optimizations for large CSV files.

## Features

- **Static CSV File Processing**: The application processes a pre-defined CSV file located in the `uploads` folder.
- **CSV Parsing**: Manually parses the CSV file without external libraries, efficiently handling large files using streams.
- **Nested Object Conversion**: Converts flat CSV data into nested JSON structures for better data organization.
- **Data Storage**: Saves parsed user data into PostgreSQL.
- **Age Distribution**: Computes the age distribution based on the uploaded data.
- **Error Handling**: Proper error handling for file parsing, and database interactions.

## Requirements

- **Node.js** (v14.x or higher)
- **PostgreSQL** database
- **Environment Variables** for configuration (see below)

## Installation

- Clone the repository:
   git clone https://github.com/HarshMalve/kelp_global_backend_assessment.git
   cd kelp_global_backend_assessment

- Install dependencies
    npm install

- Set up following environment variables in the .env file
    DB_HOST: Database host
    DB_PORT: Database port
    DB_USERNAME: Database username
    DB_PASSWORD: Database password
    DB_NAME: Database name
    PORT: Port to run the server on (default: 3000)
    CSV_FILE_PATH: Path to the CSV file to be processed (default: uploads/sample.csv)

## Usage

-   Run the server using: npm start
-   The application processes a static CSV file located in the uploads folder. It reads and parses the CSV file, performs the necessary transformations, and stores the results in PostgreSQL. No file upload is required.
To trigger the CSV processing, use a POST request to the /api/users/upload endpoint.
    Example using curl:
        curl -X POST http://localhost:3000/api/users/upload
    Example using Postman:
        Method: POST
        URL: http://localhost:3000/api/users/upload
-  Response
    On success, the server responds with the following JSON:
    {
        "message": "Users processed and stored",
        "distribution": {
            "ageGroup1": 50,
            "ageGroup2": 100,
            "ageGroup3": 150
        }
    }
    The distribution field contains the computed age group distribution from the parsed data.
-  Error Handling
    If the file is empty or contains only headers, the server will respond with an error:
    {
        "error": "CSV file is empty or contains only headers."
    }







