# DineSphere

DineSphere is a platform where restaurant owners can upload their restaurant details, menu, and users can order food. The application is built using Next.js, TypeScript, MongoDB, Razorpay for payment, Clerk for authentication, and jsPDF for invoice generation. Tailwind CSS and Shadcn UI are used for styling and UI components.

## Features

- Restaurant owners can create and manage their restaurant profiles, including details like location and cuisine.
- Restaurant owners can upload their menu items, including descriptions, prices, and images.
- Users can browse and search for restaurants based on various criteria like location, cuisine, and menu items.
- Users can add items to their cart and place orders.
- Users can pay for their orders using Razorpay.
- Users can view their order history and download invoices generated using jsPDF.
- Clerk is used for user authentication, allowing users to sign up, log in, and manage their profiles.

## Screenshots

## Tech Stack

- **Next.js**: A React framework for building server-rendered applications.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **MongoDB**: A NoSQL database for storing restaurant, menu, and order data.
- **Razorpay**: A payment gateway for processing online payments.
- **Clerk**: An authentication platform for handling user sign-up, login, and profile management.
- **jsPDF**: A library for generating PDF documents, used for invoice generation.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.
- **Shadcn UI**: A set of accessible and customizable React components built using Tailwind CSS.
- **Cloudinary**: An image hosting service that provides unlimited capacity for hosting large images and videos, along with features for image optimization and transformation.

## Getting Started

1. Clone the repository:

   ```sh
   git clone https://github.com/aniketchauhan18/nextjs-restaurant.git
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up environment variables for MongoDB, Razorpay, Clerk, and other services. Create a `.env.local` file in the root directory and add the following variables:

   ```plaintext
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   MONGODB_URI=your_mongodb_uri
   MONGODB_URI2=your_secondary_mongodb_uri
   BACKEND_SECRET_KEY=your_backend_secret_key
   NEXTAUTH_SECRET=your_nextauth_secret
   WEBHOOK_SECRET=your_webhook_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

   - [`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`](command:_github.copilot.openSymbolFromReferences?%5B%22NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A31%2C%22character%22%3A0%7D%7D%5D%5D "Go to definition"): Your Clerk publishable key.
   - [`CLERK_SECRET_KEY`](command:_github.copilot.openSymbolFromReferences?%5B%22CLERK_SECRET_KEY%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A32%2C%22character%22%3A0%7D%7D%5D%5D "Go to definition"): Your Clerk secret key.
   - [`NEXT_PUBLIC_CLERK_SIGN_IN_URL`](command:_github.copilot.openSymbolFromReferences?%5B%22NEXT_PUBLIC_CLERK_SIGN_IN_URL%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A33%2C%22character%22%3A0%7D%7D%5D%5D "Go to definition"): URL for the sign-in page.
   - [`NEXT_PUBLIC_CLERK_SIGN_UP_URL`](command:_github.copilot.openSymbolFromReferences?%5B%22NEXT_PUBLIC_CLERK_SIGN_UP_URL%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A34%2C%22character%22%3A0%7D%7D%5D%5D "Go to definition"): URL for the sign-up page.
   - [`CLOUDINARY_CLOUD_NAME`](command:_github.copilot.openSymbolFromReferences?%5B%22CLOUDINARY_CLOUD_NAME%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A35%2C%22character%22%3A0%7D%7D%2C%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fcloudinary.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fcloudinary.ts%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fcloudinary.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A3%2C%22character%22%3A26%7D%7D%5D%5D "Go to definition"): Your Cloudinary cloud name.
   - [`CLOUDINARY_API_KEY`](command:_github.copilot.openSymbolFromReferences?%5B%22CLOUDINARY_API_KEY%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A36%2C%22character%22%3A0%7D%7D%2C%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fcloudinary.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fcloudinary.ts%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fcloudinary.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A4%2C%22character%22%3A23%7D%7D%5D%5D "Go to definition"): Your Cloudinary API key.
   - [`CLOUDINARY_API_SECRET`](command:_github.copilot.openSymbolFromReferences?%5B%22CLOUDINARY_API_SECRET%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A37%2C%22character%22%3A0%7D%7D%2C%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fcloudinary.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fcloudinary.ts%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fcloudinary.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A5%2C%22character%22%3A26%7D%7D%5D%5D "Go to definition"): Your Cloudinary API secret.
   - [`MONGODB_URI`](command:_github.copilot.openSymbolFromReferences?%5B%22MONGODB_URI%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A38%2C%22character%22%3A0%7D%7D%2C%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fdb.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fdb.ts%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fdb.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A2%2C%22character%22%3A6%7D%7D%5D%5D "Go to definition"): Your primary MongoDB connection string.
   - [`MONGODB_URI2`](command:_github.copilot.openSymbolFromReferences?%5B%22MONGODB_URI2%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A39%2C%22character%22%3A0%7D%7D%2C%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fdb.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fdb.ts%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fsrc%2Flib%2Fdb.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A2%2C%22character%22%3A59%7D%7D%5D%5D "Go to definition"): Your secondary MongoDB connection string (if applicable).
   - [`BACKEND_SECRET_KEY`](command:_github.copilot.openSymbolFromReferences?%5B%22BACKEND_SECRET_KEY%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A40%2C%22character%22%3A0%7D%7D%5D%5D "Go to definition"): Secret key for backend operations.
   - [`NEXTAUTH_SECRET`](command:_github.copilot.openSymbolFromReferences?%5B%22NEXTAUTH_SECRET%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A41%2C%22character%22%3A0%7D%7D%5D%5D "Go to definition"): Secret key for NextAuth.
   - [`WEBHOOK_SECRET`](command:_github.copilot.openSymbolFromReferences?%5B%22WEBHOOK_SECRET%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A42%2C%22character%22%3A0%7D%7D%5D%5D "Go to definition"): Secret key for webhooks.
   - [`RAZORPAY_KEY_ID`](command:_github.copilot.openSymbolFromReferences?%5B%22RAZORPAY_KEY_ID%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A43%2C%22character%22%3A0%7D%7D%5D%5D "Go to definition"): Your Razorpay key ID.
   - [`RAZORPAY_KEY_SECRET`](command:_github.copilot.openSymbolFromReferences?%5B%22RAZORPAY_KEY_SECRET%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A44%2C%22character%22%3A0%7D%7D%5D%5D "Go to definition"): Your Razorpay key secret.

4. Run the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and visit [`http://localhost:3000`](command:_github.copilot.openSymbolFromReferences?%5B%22http%3A%2F%2Flocalhost%3A3000%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2F.gitignore%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2F.gitignore%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2F.gitignore%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A0%2C%22character%22%3A6%7D%7D%2C%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2F.prettierignore%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2F.prettierignore%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2F.prettierignore%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A0%2C%22character%22%3A6%7D%7D%2C%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fcomponents.json%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fcomponents.json%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2Fcomponents.json%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A1%2C%22character%22%3A14%7D%7D%2C%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Faniketcode%2Fprojects%2Fnext-restaurant-app%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A46%2C%22character%22%3A32%7D%7D%5D%5D "Go to definition").

## Contributing

We welcome contributions from everyone! If you're interested in helping improve this project, here's how you can contribute:

1. **Fork** the repository on GitHub.
2. **Clone** your forked repository to your local machine.
3. **Create a new branch** for your feature or fix.
4. **Make your changes** and commit them with clear, descriptive messages.
5. **Push** your changes to your fork on GitHub.
6. **Submit a Pull Request** against the main branch of this repository.

Please ensure your code adheres to the project's coding standards and include any relevant tests. Before submitting a Pull Request, also make sure to update the README.md if necessary to reflect your changes or additions.

Thank you for your interest in contributing to our project!

## Contact

For any questions or suggestions, feel free to reach out to us via email: workwithaniket18@gmail.com
