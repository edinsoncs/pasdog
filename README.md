# PASDOG API

This api in Nodejs - use framework expressjs - jwt - mongoose - monk - mongodb - others modules npm

## List of avaiable methods

| Route | Method | Description |
|--------|--------|--------|
| `/` | `GET` | Hello World Route |
| `1. http://46.101.73.97:3000/api/newuser/` | `POST` | Return data |
| `2. http://46.101.73.97:3000/api/access/` | `POST` | Return data and token |
| `3. http://46.101.73.97:3000/api/profile/` | `POST` | Return data user complet|
| `4. http://localhost:3000/api/profile/saveimage` | `POST` | Return data url file avatar complet|
| `5. http://localhost:3000/api/newdog` | `POST` | Return success new dog|
| `6. http://localhost:3000/api/profile/role` | `POST` | Return success role user|
| `7. http://localhost:3000/api/profile/paseador` | `POST` | Return price and description success|
| `8. http://localhost:3000/api/listdog` | `POST` | Return list´s dog´s|
| `9. http://localhost:3000/api/updatedog` | `POST` | Return update |
| `10. http://localhost:3000/api/updatedog/photo` | `POST` | Return update photo dog |
| `11. http://localhost:3000/api/newcontract` | `POST` | Return contract  |
| `12. http://localhost:3000/api/listcontract` | `POST` | Return history all contract  |
| `13. http://localhost:3000/api/opencontract` | `POST` | Return one contract  |
| `14. http://localhost:3000/api/savechat` | `POST` | Return chat save  |
| `15. http://localhost:3000/api/listchat` | `POST` | Return all chats  |


### Example: Body of the request

Method 1. newuser
```json
{
    "email": "edinsoncode@gmail.com",
    "name": "edinson carranza",
    "password": "1234567",
    "city": "Argentina"
}
```

Method 2. access
```json
{
    "email": "edinsoncode@gmail.com",
    "password": "1234567"
}
```

Method 3. access
```json
{
    "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkaW5zb25jb2RlQGhvdG1haWwuY29tIiwibmFtZSI6IkVkaW5zb24gQ2FycmFuemEiLCJfaWQiOiI1YTY0YWY3Mjk0MWE0YTgzMWFlNDlhZWQiLCJpYXQiOjE1MTY1NTM1NzV9.y3ltGB-WehYZ2Ylc-yY70bCWrqf4Nqe4YwIeqGpWeWc"
    
}
```


Method 4. avatar profile upload and update avatar user
```json
{
    "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkaW5zb25jb2RlQGhvdG1haWwuY29tIiwibmFtZSI6IkVkaW5zb24gQ2FycmFuemEiLCJfaWQiOiI1YTY0YWY3Mjk0MWE0YTgzMWFlNDlhZWQiLCJpYXQiOjE1MTY1NTM1NzV9.y3ltGB-WehYZ2Ylc-yY70bCWrqf4Nqe4YwIeqGpWeWc",
   "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAA...."
    
}
```

Method 5. create new dog in database profile user related
```json
{
  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkaW5zb25jb2RlQGhvdG1haWwuY29tIiwibmFtZSI6IkVkaW5zb24gQ2FycmFuemEiLCJfaWQiOiI1YTY0YWY3Mjk0MWE0YTgzMWFlNDlhZWQiLCJpYXQiOjE1MTY1NTM1NzV9.y3ltGB-WehYZ2Ylc-yY70bCWrqf4Nqe4YwIeqGpWeWc",
  "name": "Rambo",
	"color": "amarillo",
	"race": "Normal",
	"age": "4",
  "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAA....",
  "details": "informacion como es esto"
    
}
```

Method 6. update role user: 0 => user normal and 1 => user paseador
```json
{
  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkaW5zb25jb2RlQGhvdG1haWwuY29tIiwibmFtZSI6IkVkaW5zb24gQ2FycmFuemEiLCJfaWQiOiI1YTY0YWY3Mjk0MWE0YTgzMWFlNDlhZWQiLCJpYXQiOjE1MTY1NTM1NzV9.y3ltGB-WehYZ2Ylc-yY70bCWrqf4Nqe4YwIeqGpWeWc",
  "type": 0 (boolean)
    
}
```

Method 7. update role user: 0 => user normal and 1 => user paseador
```json
{
  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkaW5zb25jb2RlQGhvdG1haWwuY29tIiwibmFtZSI6IkVkaW5zb24gQ2FycmFuemEiLCJfaWQiOiI1YTY0YWY3Mjk0MWE0YTgzMWFlNDlhZWQiLCJpYXQiOjE1MTY1NTM1NzV9.y3ltGB-WehYZ2Ylc-yY70bCWrqf4Nqe4YwIeqGpWeWc",
  "price": Number,
  "description": String
    
}
```


Method 8. list dogs, new request return json one or all dog´s
```json
{
  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkaW5zb25jb2RlQGhvdG1haWwuY29tIiwibmFtZSI6IkVkaW5zb24gQ2FycmFuemEiLCJfaWQiOiI1YTY0YWY3Mjk0MWE0YTgzMWFlNDlhZWQiLCJpYXQiOjE1MTY1NTM1NzV9.y3ltGB-WehYZ2Ylc-yY70bCWrqf4Nqe4YwIeqGpWeWc"
  
    
}
```

Method 9. update keys to dog - key DOGID if to continue update
```json
{
  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkaW5zb25jb2RlQGhvdG1haWwuY29tIiwibmFtZSI6IkVkaW5zb24gQ2FycmFuemEiLCJfaWQiOiI1YTY0YWY3Mjk0MWE0YTgzMWFlNDlhZWQiLCJpYXQiOjE1MTY1NTM1NzV9.y3ltGB-WehYZ2Ylc-yY70bCWrqf4Nqe4YwIeqGpWeWc",
  "dogid": "5acc1b989d48db0ca9875243",
  "user": "5a89a63b694dbc160595381d",
  "name": "Rambo es",
  "color": "amarillo",
  "race": "Normal",
  "age": "4",
  "avatar": "B1esj5FsG.png",
  "details": "epa",
  "size": "124",
  "body": null
  
    
}
```

Method 10. update photo dog return success
```json
{
  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkaW5zb25jb2RlQGhvdG1haWwuY29tIiwibmFtZSI6IkVkaW5zb24gQ2FycmFuemEiLCJfaWQiOiI1YTY0YWY3Mjk0MWE0YTgzMWFlNDlhZWQiLCJpYXQiOjE1MTY1NTM1NzV9.y3ltGB-WehYZ2Ylc-yY70bCWrqf4Nqe4YwIeqGpWeWc",
  "dogid": "5acc1b989d48db0ca9875243",
  "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA8Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjI..."
  
    
}
```


Method 11. update photo dog return success
```json
{
  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkaW5zb25jb2RlQGhvdG1haWwuY29tIiwibmFtZSI6IkVkaW5zb24gQ2FycmFuemEiLCJfaWQiOiI1YTY0YWY3Mjk0MWE0YTgzMWFlNDlhZWQiLCJpYXQiOjE1MTY1NTM1NzV9.y3ltGB-WehYZ2Ylc-yY70bCWrqf4Nqe4YwIeqGpWeWc",
  
  "pas_id": ["5b8c64924a753e5a7eccaf46"],
  "dog_ids": ["5b8c647c4a753e5a7eccaf43", "5b8c647e4a753e5a7eccaf44"]
  
    
}
```


Method 12. request to return history contracts
```json
{
  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkaW5zb25jb2RlQGhvdG1haWwuY29tIiwibmFtZSI6IkVkaW5zb24gQ2FycmFuemEiLCJfaWQiOiI1YTY0YWY3Mjk0MWE0YTgzMWFlNDlhZWQiLCJpYXQiOjE1MTY1NTM1NzV9.y3ltGB-WehYZ2Ylc-yY70bCWrqf4Nqe4YwIeqGpWeWc"
  
}
```


Method 13. request to return history contracts
```json
{
  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkaW5zb25jb2RlQGhvdG1haWwuY29tIiwibmFtZSI6IkVkaW5zb24gQ2FycmFuemEiLCJfaWQiOiI1YTY0YWY3Mjk0MWE0YTgzMWFlNDlhZWQiLCJpYXQiOjE1MTY1NTM1NzV9.y3ltGB-WehYZ2Ylc-yY70bCWrqf4Nqe4YwIeqGpWeWc",

  "contract": "id contract",
  "message": "hola buenas tardes necesito este servicio"
  
}
```


Method 14. request to return history contracts
```json
{
  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkaW5zb25jb2RlQGhvdG1haWwuY29tIiwibmFtZSI6IkVkaW5zb24gQ2FycmFuemEiLCJfaWQiOiI1YTY0YWY3Mjk0MWE0YTgzMWFlNDlhZWQiLCJpYXQiOjE1MTY1NTM1NzV9.y3ltGB-WehYZ2Ylc-yY70bCWrqf4Nqe4YwIeqGpWeWc",
  "idcontract": "id contract"
  
}
```


Method 15. return all chats => contract
```json
{
  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkaW5zb25jb2RlQGhvdG1haWwuY29tIiwibmFtZSI6IkVkaW5zb24gQ2FycmFuemEiLCJfaWQiOiI1YTY0YWY3Mjk0MWE0YTgzMWFlNDlhZWQiLCJpYXQiOjE1MTY1NTM1NzV9.y3ltGB-WehYZ2Ylc-yY70bCWrqf4Nqe4YwIeqGpWeWc",
  
  "idcontract": "id contract"
  
}
```


## Tools and modules used

* [`MongoDB`](https://www.mongodb.com/) as the database.
* [`mongoose`](http://mongoosejs.com/) in order to connect the application and the database.
* [`body-parser`](https://www.npmjs.com/package/body-parser) in order to get the body of the requests.
* [`chance`](https://www.npmjs.com/package/chance) as the string auto-generator
