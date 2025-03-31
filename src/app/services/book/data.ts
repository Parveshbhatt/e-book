import { Book } from "../../models/book.model";

export const books: Book[] = [
  {
    id: '1',
    title: 'Angular Development',
    author: 'John Doe',
    category: 'Programming',
    price: 29.99,
    content: `
        <h1>Chapter 1: Introduction to Angular</h1>
        <p>Angular is a powerful frontend framework developed by Google. It allows developers to build scalable web applications.</p>
        
        <h2>1.1 Key Features</h2>
        <p>- Component-based architecture</p>
        <p>- Dependency Injection for better modularity</p>
        <p>- Two-way data binding for seamless UI updates</p>
  
        <h2>1.2 Getting Started</h2>
        <p>To set up an Angular project, use the Angular CLI:</p>
        <pre>npm install -g @angular/cli</pre>
        <pre>ng new my-angular-app</pre>
  
        <h1>Chapter 2: Components & Directives</h1>
        <p>Components are the building blocks of an Angular application. Each component consists of:</p>
        <p>- A template (HTML)</p>
        <p>- A class (TypeScript)</p>
        <p>- Styles (CSS/SCSS)</p>
  
        <h2>2.1 Creating a Component</h2>
        <pre>ng generate component my-component</pre>
  
        <h1>Chapter 3: Services & Dependency Injection</h1>
        <p>Services in Angular help manage business logic independently of components.</p>
        
        <h2>3.1 Creating a Service</h2>
        <pre>ng generate service my-service</pre>
        <p>Inject the service into a component using the constructor:</p>
        <pre>constructor(private myService: MyService) {}</pre>
  
        <h1>Chapter 4: Routing & Navigation</h1>
        <p>Angular Router enables navigation between different components.</p>
        
        <h2>4.1 Setting Up Routes</h2>
        <pre>const routes: Routes = [{ path: 'home', component: HomeComponent }];</pre>
      `,
    totalPages: 4
  },
  {
    id: '2',
    title: 'React Mastery',
    author: 'Jane Smith',
    category: 'Programming',
    price: 24.99,
    content: `
        <h1>Chapter 1: React Fundamentals</h1>
        <p>React is a JavaScript library for building user interfaces.</p>
        
        <h2>1.1 Components</h2>
        <p>React applications are built using components, which are either functional or class-based.</p>
  
        <h2>1.2 JSX</h2>
        <p>JSX allows writing HTML-like syntax within JavaScript:</p>
        <pre>const element = <h1>Hello, React!</h1>;</pre>
  
        <h1>Chapter 2: State & Props</h1>
        <p>State and Props help manage dynamic content in React.</p>
        
        <h2>2.1 Managing State</h2>
        <pre>const [count, setCount] = useState(0);</pre>
        <p>Updating state triggers a re-render of the component.</p>
  
        <h1>Chapter 3: React Hooks</h1>
        <p>Hooks provide a way to use state and other React features without writing a class.</p>
        
        <h2>3.1 useEffect Hook</h2>
        <p>useEffect is used for handling side effects:</p>
        <pre>useEffect(() => { console.log("Component Mounted"); }, []);</pre>
  
        <h1>Chapter 4: Advanced Patterns</h1>
        <p>React supports advanced design patterns like Context API and Higher-Order Components.</p>
      `,
    totalPages: 4
  },
  {
    id: '3',
    title: 'Node.js for Backend',
    author: 'Mike Johnson',
    category: 'Backend Development',
    price: 19.99,
    content: `
        <h1>Chapter 1: Introduction to Node.js</h1>
        <p>Node.js is a JavaScript runtime for building scalable backend applications.</p>
  
        <h2>1.1 Event Loop</h2>
        <p>Node.js is event-driven, meaning it uses an event loop to handle asynchronous tasks.</p>
  
        <h1>Chapter 2: Express.js</h1>
        <p>Express is a minimal Node.js framework for building web applications.</p>
  
        <h2>2.1 Setting Up Express</h2>
        <pre>const express = require('express'); const app = express();</pre>
  
        <h1>Chapter 3: Database Integration</h1>
        <p>Node.js can integrate with SQL (MySQL, PostgreSQL) and NoSQL (MongoDB) databases.</p>
  
        <h2>3.1 Connecting to MongoDB</h2>
        <pre>const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017');</pre>
  
        <h1>Chapter 4: Authentication & Security</h1>
        <p>Implementing JWT-based authentication for user login.</p>
      `,
    totalPages: 4
  },
  {
    id: '4',
    title: 'Mastering TypeScript',
    author: 'Sarah Williams',
    category: 'Programming',
    price: 22.99,
    content: `
        <h1>Chapter 1: Introduction to TypeScript</h1>
        <p>TypeScript adds static typing to JavaScript, making development safer.</p>
  
        <h2>1.1 Type Annotations</h2>
        <pre>let age: number = 30;</pre>
  
        <h1>Chapter 2: Interfaces & Generics</h1>
        <p>Interfaces define the structure of objects.</p>
  
        <h2>2.1 Using Interfaces</h2>
        <pre>interface User { name: string; age: number; }</pre>
  
        <h1>Chapter 3: Advanced TypeScript</h1>
        <p>Exploring generics, utility types, and advanced concepts.</p>
  
        <h2>3.1 Generics in TypeScript</h2>
        <pre>function identity<T>(arg: T): T { return arg; }</pre>
      `,
    totalPages: 4
  },
  {
    id: '5',
    title: 'Databases for Developers',
    author: 'Robert Brown',
    category: 'Databases',
    price: 27.99,
    content: `
        <h1>Chapter 1: SQL vs NoSQL</h1>
        <p>Understanding the differences between SQL (relational) and NoSQL (non-relational) databases.</p>
  
        <h2>1.1 SQL Databases</h2>
        <p>SQL databases store data in tables with fixed schemas.</p>
  
        <h1>Chapter 2: NoSQL Databases</h1>
        <p>NoSQL databases like MongoDB are document-based and schema-less.</p>
  
        <h2>2.1 Working with MongoDB</h2>
        <pre>db.users.insert({ name: "Alice", age: 25 });</pre>
  
        <h1>Chapter 3: Indexing & Performance</h1>
        <p>Indexes speed up database queries.</p>
  
        <h2>3.1 Creating an Index</h2>
        <pre>db.users.createIndex({ name: 1 });</pre>
      `,
    totalPages: 4
  }
];