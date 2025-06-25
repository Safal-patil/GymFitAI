# FitNation API Documentation

## Base Configuration
- **Base URL**: `http://localhost:8000/api/v1`
- **Authentication**: JWT Bearer Token
- **Content-Type**: `application/json`

## Authentication Endpoints

### 1. User Registration
- **URL**: `POST /user/register`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
- **Response (201)**:
```json
{
  "statusCode": 200,
  "data": {
    "id": "user_id",
    "email": "user@example.com"
  },
  "message": "User registered Successfully",
  "success": true
}
```

### 2. User Login
- **URL**: `POST /user/login`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
- **Response (200)**:
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "profile": {...},
      "tier": "free"
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  },
  "message": "User logged In Successfully",
  "success": true
}
```

### 3. Logout
- **URL**: `POST /user/logout`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
```json
{
  "statusCode": 200,
  "data": {},
  "message": "User logged Out",
  "success": true
}
```

### 4. Get Current User
- **URL**: `GET /user/current-user`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
```json
{
  "statusCode": 200,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "profile": {
      "name": "John Doe",
      "age": 25,
      "gender": "male",
      "weightKg": 70,
      "heightCm": 175
    },
    "tier": "free"
  },
  "message": "User fetched successfully",
  "success": true
}
```

## Exercise Endpoints

### 1. Get All Gym Exercises
- **URL**: `GET /exercise/getgymexercises`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "exercise_id",
      "Title": "Push-ups",
      "Desc": "Upper body exercise",
      "Type": "Strength",
      "BodyPart": "Chest",
      "Equipment": "Bodyweight",
      "Level": "Beginner",
      "Rating": 4.5,
      "RatingDesc": "Excellent exercise"
    }
  ],
  "message": "Gym exercises fetched successfully!",
  "success": true
}
```

### 2. Search Exercises
- **URL**: `GET /exercise/search?query={searchTerm}`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
```json
{
  "statusCode": 200,
  "data": [...exercises],
  "message": "Exercises fetched successfully",
  "success": true
}
```

## Workout Status Endpoints

### 1. Get Exercises by Day
- **URL**: `POST /statusexercise/exercisesbyday`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "date": "2025-01-15"
}
```
- **Response (200)**:
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "exercise_id",
      "userId": "user_id",
      "name": "Push-ups",
      "date": "2025-01-15",
      "status": {
        "totalSets": 3,
        "completedSets": 2,
        "totalReps": 30,
        "completedReps": 20,
        "completePercent": 66.67
      }
    }
  ],
  "message": "Exercises fetched successfully!",
  "success": true
}
```

### 2. Update Exercise Status
- **URL**: `POST /statusexercise/exerciseupdated`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "exercises": [
    {
      "_id": "exercise_id",
      "status": {
        "totalSets": 3,
        "completedSets": 3,
        "totalReps": 30,
        "completedReps": 30
      }
    }
  ]
}
```

### 3. Get Calories by Exercises
- **URL**: `GET /statusexercise/caloriesbyexercises`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
```json
{
  "statusCode": 200,
  "data": [
    {
      "date": "2025-01-15",
      "totalCaloriesBurnt": 250,
      "completionPercent": 85.5
    }
  ],
  "message": "Calories fetched successfully!",
  "success": true
}
```

## Planner Endpoints

### 1. Get User Planner
- **URL**: `GET /planner/plannerbyuser`
- **Headers**: `Authorization: Bearer {token}`
- **Response (200)**:
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "planner_id",
      "userId": "user_id",
      "days": [
        {
          "date": "2025-01-15",
          "exercises": ["exercise_id1", "exercise_id2"]
        }
      ],
      "nutrition": ["Tip 1", "Tip 2"],
      "recommendations": ["Rec 1", "Rec 2"],
      "goals": ["Goal 1", "Goal 2"],
      "prediction": ["Pred 1", "Pred 2"]
    }
  ],
  "message": "Planner fetched successfully!",
  "success": true
}
```

## Recommendation Endpoints

### 1. Create Plan Recommendation
- **URL**: `POST /recommendation/planrecommendation`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "input": {
    "date": "2025-01-15",
    "profile": {
      "name": "John Doe",
      "gender": "male",
      "age": 25,
      "weightKg": 70,
      "heightCm": 175,
      "bodyfat": 15,
      "experienceLevel": "beginner",
      "maxPushups": 20,
      "maxPullups": 3,
      "maxSquats": 30
    },
    "preferences": {
      "goal": "muscular",
      "daysPerWeek": 4,
      "planStyle": "push-pull-leg"
    }
  }
}
```

### 2. AI Chat
- **URL**: `POST /recommendation/chat`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "chat": "How can I improve my bench press?"
}
```

## Transaction Endpoints

### 1. Get User Transactions
- **URL**: `GET /transaction/transactionbyuser`
- **Headers**: `Authorization: Bearer {token}`

### 2. Save Transaction
- **URL**: `POST /transaction/savetransaction`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "transaction": {
    "planAmount": 19,
    "amount": 19,
    "amountInWords": "Nineteen dollars only",
    "transactionDate": "2025-01-15",
    "transactionId": "txn_123",
    "platform": "Stripe",
    "status": "success",
    "premiumExpiry": "2025-02-15"
  }
}
```

## Error Responses

### Common Error Formats
```json
{
  "statusCode": 400,
  "data": null,
  "message": "Error message",
  "success": false,
  "errors": ["Detailed error info"]
}
```

### Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **500**: Internal Server Error