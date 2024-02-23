## Endpoints

### Register
- **Endpoint:** `/api/v1/users/register`
- **Method:** `POST`
```js
{
    "name": "Jonas",
    "email": "jonas@gmail.com",
    "password": "123456789",
    "passwordConfirm": "123456789"
}
```

### Login
- **Endpoint:** `/api/v1/users/login`
- **Method:** `POST`
```js
{
    "email": "jonas@gmail.com",
    "password": "123456789"
}
```

### Logout
- **Endpoint:** `/api/v1/users/logout`
- **Method:** `GET` `AUTH`

### Create a participant
- **Endpoint:** `/api/v1/basketball/participants`
- **Method:** `POST` `AUTH`
```js
{
    "first_name": "Oliver",
	"last_name": "Kensmer",
	"age": 25,
	"team_name": "team3",
	"rating": 25
}
```

### Get participants
- **Endpoint:** `/api/v1/basketball/participants`
- **Method:** `GET`
- **Description:** available `filtering by fields` and url parameters: `sort`, `fields`, `limit`, `page`

### Get participant
- **Endpoint:** `/api/v1/basketball/participant/{participant_id}/card`
- **Method:** `GET`

### Get participants by team
- **Endpoint:** `/api/v1/basketball/team/{team_name}/members`
- **Method:** `GET`

### Get participants who are 20 years old or less
- **Endpoint:** `/api/v1/basketball/team/youngest`
- **Method:** `GET`

### Get top participants from all teams
- **Endpoint:** `/api/v1/basketball/top`
- **Method:** `GET`

### Get top participants by team
- **Endpoint:** `/v1/basketball/top/{team_name}`
- **Method:** `GET`