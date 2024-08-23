# Visa & Immigration Process Helper Chatbot

This is a Next.js project bootstrapped with create-next-app, designed to assist users with visa and immigration processes. The chatbot leverages the power of OpenAI Assistant APIs to provide accurate and helpful responses, ensuring a smooth user experience.

## Features

- **AI-Powered Chatbot**: Utilizes OpenAI Assistant APIs to provide intelligent and context-aware responses for visa and immigration inquiries.
- **Dockerized for Scalability**: The entire application is containerized using Docker, ensuring consistency across different environments.
- **Deployed on Azure Container Apps**: The chatbot is deployed on Azure Container Apps, offering seamless scalability and integration with other Azure services.

## Getting Started

First, run the development server:

```bash
npm install //For Installing All Required Packages

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment Variables

Before running the application, you need to set the following environment variables in your .env.local file:

- OPENAI_API_KEY: Your OpenAI API key.
- ASSISTANT_ID: "asst_v6UfAE9sr4oEFpg3p4HfIl9P".

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## 


## Deployment
The project is dockerized for easy deployment and scaling. It’s deployed on **Azure Container Apps**, offering high availability and robust infrastructure.

For more information on deployment, see the [Next.js deployment documentation](https://nextjs.org/docs/deployment).