  # Use an official Node runtime as a parent image
  FROM node:18.17.0

  # Set the working directory in the container
  WORKDIR /app

  # Copy the package.json and package-lock.json files
  COPY package*.json ./

  # Install dependencies
  RUN npm install

  # Copy the rest of the application code
  COPY . .

  # Build the Next.js app
  RUN npm run build

  # Expose the port the app runs on
  EXPOSE 3000

  # Start the Next.js app
  CMD ["npm", "start"]