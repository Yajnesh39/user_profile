User profile Registration Task - Database_Name: profilesdb ; Database used : Local MongoDB
Installed pkgs: express mongoose body-parser bcryptjs jsonwebtoken
Endpoints are 

1. .../api/auth/register - POST method
  provide user details in JSON format as given below
  Ex:
  {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123"
  }

2. .../api/auth/login - POST method
  provide login details in JSON format as given below
  Ex:
  {
      "email": "test@example.com",
     "password": "password123"
   }
   #here token is generated - is useful for authorized user

3. .../api/auth/update - PUT method
  provide updated user details along with bearer Authorization token for successful authorization
  Ex:
  {
      "username": "newuser",
      "email": "new@example.com",
  }

4. .../api/auth/delete - DELETE method
   provide just the bearer Authorization token for successful authorization and deletion

5. .../api/auth/logout
   provide just the bearer Authorization token for successful authorization and logout
