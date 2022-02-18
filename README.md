# altBalaji

first ->
clone repo
npm i
add .env ->
.env ->
NODE_ENV= development
PORT= 3000
DATABASEURL= mongodb+srv://user:user1234@cluster0.mwmpe.mongodb.net/altBalajiTest?retryWrites=true&w=majority
DATABASEURLTEST= mongodb+srv://user:user1234@cluster0.mwmpe.mongodb.net/altBalajiUnitTest?retryWrites=true&w=majority

second ->
application start: npm start
test case start: npm test

Test Cases Include ->

1. If no users found, send 404 with no users found.
2. Create user with status code 201 and expect json.
3. If users found, send 200 and expect json and users length > 0.

   Get user by id,

4. if user found -> send user json with 200.
5. Else -> send 404 with user not found.

   Update user by id,

6. if user found -> send user json with 200.
7. Else -> send 404 with user not found

   Delete user by id,

8. if user found -> send user json with 200.
9. Else -> send 404 with user not found

working url of above endpoints ->
https://alt-balaji-test-anshul.herokuapp.com/api/users
