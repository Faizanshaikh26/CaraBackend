<h1>Cara E-commerce Backend</h1>

<p>This repository contains the backend code for the <strong>Cara E-commerce</strong> platform. It provides APIs for managing products, handling user authentication, processing payments, and more.</p>

<h2>Table of Contents</h2>
<ul>
    <li><a href="#about-the-project">About the Project</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#tech-stack-and-dependencies">Tech Stack and Dependencies</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#environment-variables">Environment Variables</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
</ul>

<h2 id="about-the-project">About the Project</h2>
<p>The <strong>Cara E-commerce Backend</strong> is designed to provide robust APIs for functionalities such as user authentication, product management, payment processing with Stripe, and contact form submissions. The backend is built with Node.js and Express, and it uses MongoDB for data storage.</p>

<h2 id="features">Features</h2>
<ul>
    <li><strong>User Authentication:</strong> Secure login, registration, and password reset.</li>
    <li><strong>Product Management:</strong> Create, read, update, and delete products.</li>
    <li><strong>Payment Processing:</strong> Stripe integration for secure payment transactions.</li>
    <li><strong>Contact Form:</strong> API endpoint for user contact form submissions.</li>
</ul>

<h2 id="tech-stack-and-dependencies">Tech Stack and Dependencies</h2>
<p>The backend is built with Node.js and Express. Below are the main dependencies:</p>
<ul>
    <li><strong>@stripe/stripe-js:</strong> Stripe library for secure payments</li>
    <li><strong>bcryptjs:</strong> Hashing passwords</li>
    <li><strong>body-parser:</strong> Middleware for parsing request bodies</li>
    <li><strong>cors:</strong> Handling cross-origin requests</li>
    <li><strong>dotenv:</strong> Environment variable management</li>
    <li><strong>express:</strong> Web framework for creating API routes</li>
    <li><strong>jsonwebtoken:</strong> Secure authentication with JWT</li>
    <li><strong>mongoose:</strong> MongoDB ODM for data modeling</li>
    <li><strong>multer:</strong> Handling file uploads (e.g., product images)</li>
    <li><strong>nodemailer:</strong> Sending emails to users</li>
    <li><strong>strip:</strong> Data sanitization</li>
    <li><strong>stripe:</strong> Server-side Stripe integration</li>
</ul>

<h2 id="installation">Installation</h2>
<p>To get a local copy up and running, follow these steps:</p>

<h3>Prerequisites</h3>
<ul>
    <li><strong>Node.js:</strong> Make sure you have <a href="https://nodejs.org/">Node.js</a> installed on your machine.</li>
    <li><strong>MongoDB:</strong> A MongoDB database to connect with this project.</li>
</ul>

<h3>Steps</h3>
<ol>
    <li>Clone the repository:
        <pre><code>git clone https://github.com/yourusername/cara-ecommerce-backend.git</code></pre>
        <pre><code>cd cara-ecommerce-backend</code></pre>
    </li>
    <li>Install dependencies:
        <pre><code>npm install</code></pre>
    </li>
</ol>

<h2 id="environment-variables">Environment Variables</h2>
<p>Create a <code>.env</code> file in the root directory to configure your environment variables:</p>

<pre><code>PORT=3000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_KEY==your_stripe_secret_key
BREVO_API_KEY=your-brevo-api-key

</code></pre>

<h2 id="usage">Usage</h2>
<p>Run the backend server locally with:</p>
<pre><code>npm start</code></pre>
<p>By default, the server will run on <code>http://localhost:5000</code>. You can modify the port in the <code>.env</code> file.</p>

<h2 id="api-endpoints">API Endpoints</h2>
<p>Below is a summary of the main API endpoints:</p>

<h3>Product Routes</h3>
<ul>
    <li><code>POST /addProduct</code>: Add a new product</li>
    <li><code>GET /allProduct</code>: Retrieve all products</li>
    <li><code>DELETE /delete/:id</code>: Remove a product by ID</li>
    <li><code>PUT /update/:id</code>: Update product details by ID</li>
</ul>

<h3>User Authentication Routes</h3>
<ul>
    <li><code>POST /signup</code>: Register a new user</li>
    <li><code>POST /login</code>: User login</li>
    <li><code>POST /forgot-password</code>: Request a password reset</li>
    <li><code>POST /reset-password/:token</code>: Reset password using token</li>
</ul>

<h3>Contact Form Route</h3>
<ul>
    <li><code>POST /Contactform</code>: Submit a contact form</li>
</ul>

<h3>Payment Route</h3>
<ul>
    <li><code>POST /create-checkout-session</code>: Create a Stripe checkout session for payments</li>
</ul>

<h3>User Address Route</h3>
<ul>
    <li><code>POST /user-Address</code>: Add or update the user's address</li>
</ul>

<h2 id="contributing">Contributing</h2>
<p>Contributions are welcome! Please fork the repository and submit a pull request.</p>
<ol>
    <li>Fork the repository.</li>
    <li>Create a feature branch: <code>git checkout -b feature/new-feature</code>.</li>
    <li>Commit your changes: <code>git commit -m 'Add new feature'</code>.</li>
    <li>Push to the branch: <code>git push origin feature/new-feature</code>.</li>
    <li>Open a pull request.</li>
</ol>

<h2 id="license">License</h2>
<p>Distributed under the MIT License. See <code>LICENSE</code> for more information.</p>

<h2 id="contact">Contact</h2>
<p>For questions or feedback, contact the maintainers:</p>
<ul>
    <li><strong>Faizan</strong> - <a href="https://github.com/Faizanshaikh26/CaraBackend.git">@Faizanshaikh26</a> - faizansheikh8209.com</li>
</ul>
