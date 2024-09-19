# CountryApp

# Init && Front
1. Clone Repository 

git clone https://github.com/{youruser}/countryapp.git
cd countryapp

2. Install modules
npm install

3. Configure enviroment variables
Create a .env file in the FRONT root and define the following variables:

NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

Make sure to replace http://localhost:3000 with the URL where the backend will run. Or use PORT 3000

4. To start the development server, use the following command;
npm run dev   ==>> In COUNTRYAPP/FRONT/country-app/package.json
This will start the server at http://localhost:3001 by default. (PORT 3000 IS BEING USED BY THE BACK). You can access the application in your browser.



# BackEnd 
1. cd ../BACK
2. npm install
3. run server
npm run start:dev
This will start the server at http://localhost:3000 by default

Parallel Execution
Frontend: http://localhost:3001
Backend: http://localhost:3000

### Additional Notes

1. **Make sure that both the frontend and backend are configured correctly so that they can communicate with each other.** The `NEXT_PUBLIC_API_BASE_URL` on the frontend should point to the port that the backend is running on.

2. **Verify that both servers (frontend and backend) are running smoothly and that routes are configured properly for communication between them.**

3. **FIRST TURN ON THE BACK AND THEN THE FRONT**


