### Ports used:
- HTTP: Port 80
- HTTPS: Port 443
- SSH: Port 22

### HTTP status codes:
- 300 range: Indicates redirection.
- 400 range: Indicates client errors (e.g., 404 for not found, 403 for forbidden).
- 500 range: Indicates server errors (e.g., 500 for internal server error).

### HTTP header Content-Type:
- Specifies the media type of the resource being sent or requested.
- It allows the client and server to understand how to handle the body of the request or response.

### Attributes of a cookie:
- Domain: Specifies the domain for which the cookie is valid.
- Path: Specifies the URL path for which the cookie is valid.
- SameSite: Specifies if the cookie should be sent with cross-site requests.
- HTTPOnly: Restricts the cookie from being accessed by JavaScript and only allows it to be sent over HTTP(S).

### Express middleware:
- 

### Express service code and JavaScript fetch:

- 

### MongoDB query:
- Selects all documents where the "cost" field is greater than 10 and the "name" field matches the regular expression `/fran.*/`.
- ```{ cost: { $gt: 10 }, name: /fran.*/}```

### Storing user passwords:
- Passwords should be hashed and salted before storing them in a database to enhance security.

### Node.js service code with websockets:

- The console might log WebSocket-related information like connection status, received messages, etc.

### WebSocket protocol:
- Used for full-duplex communication between a client and a server over a single, long-lived connection.

### JSX and curly braces:
- JSX is a syntax extension for JavaScript used with React.
- Curly braces in JSX are used to embed JavaScript expressions or variables within JSX elements.

### React components:
- Component with `Welcome` and `App`: Generates `<h1>` elements displaying "Hello, [name]" based on provided names.
```<div id="root"></div>```
element, what content will the following React component generate?

      ```function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }
      function App() {
        return (
          <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
          </div>
        );
      }
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);```
  
- Component with `Numbers`: Generates an unordered list with numbers 1 to 5.

  ```<div id="root"></div>```
  
  element, what content will the following React component generate?

  ```function Numbers() { 
      const numbers = [1, 2, 3, 4, 5];
      const listItems = numbers.map((number) =>
        <li>{number}</li>
      );
      return(<ul>{listItems}</ul>)
    }
    const root = ReactDOM.createRoot(document.getElementById('root')); 
    root.render(<Numbers/>);
  ```

  - What does the following React component do?

  ```function Example() {
  // Declare a new state variable, which we'll call "count"  
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
  }
  ```

### React Hooks:
- Used to manage state and other React features without using class components.

### `useEffect` hook:
- Used to perform side effects in functional components, like data fetching or DOM manipulation.

### React Router in `App` component:
- Sets up routing for different paths (`"/"`, `"/blogs"`, `"/contact"`, etc.).

  ```  export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  }

### npm in web development:
- npm is a package manager for JavaScript to manage dependencies in web development projects.

### `package.json`:
- Contains metadata about a project and specifies its dependencies in npm projects.

### `fetch` function:
- Used to make HTTP requests from the browser to fetch resources from a server.

### Node.js:
- Server-side JavaScript runtime used to execute JavaScript code outside a web browser.

### Vite:
- A build tool providing a faster development experience for web development projects using modern technologies like React, Vue, etc.
