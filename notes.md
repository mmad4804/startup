# CS 260 Notes

[My startup](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## Github Notes

Use 'git pull' to bring in new changes, 'git commit -am' to update all files with a message, and 'git push' to send back to the online version.

For help with Markdown: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

If I want to add a sequence diagram later:
```mermaid
sequenceDiagram
    actor User1
    actor User2
    User1->>Login: Entering the login information
```

- Endpoints in web programming is basically like the functions/methods of object-oriented programming. We make calls to servers/computers, to enable certain features or retrieve data

- Need to have something from the frontend calling to someone else's backend (that's the purpose of a third party service call)

## Development Notes

- Good questions should 1) describe what the problem is, 2) what you're trying to do, and 3) what you've already done.
- Good uses of AI would be to critique code, or to explain code that you then rewrite from scratch.
- VIM is a ubiquitous console editor...it's the way we can change text-based data remotely, can use SSH to connect remotely with whatever servers we need. Can login with your DNS
- VIM Commands: :q to quit, :q! to quit when you've made changes, i to enter insert mode, esc to go back to command mmode, and :w to write/serve
- `./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon` to deploy on the terminal the new version of simon

## AWS Notes

- My public IP address is: http://98.82.152.63/
- In creating an instance of a web server, it essentially means I now have my own computer sitting in a warehouse.
- We use EC2 for the web server service, Route53 for the DNS service
- To remote shell (SSH) into my server, I just need the public IP address and address of production.pem, then put in the following: 
`ssh -i [key pair file] ubuntu@[ip address]`
- Use `exit` to exit the remote shell

A domain name is just a text string listed in a special database (domain name registry) that are connected to IP addresses to make them more user-friendly. Route 53 is the AWS service that handles everything DNS-related: where we can buy a domain name, host the domain on their DNS servers, and create DNS records.

Caddy helps route HTTP requests, basically a service that listens and serves up the requested static files or routes it to another web service. Caddyfile is our configuration file containing definitions for routhing HTTP requests, usually don't have to modify. The public_html file is a directory of files that Caddy serves up when requests are made to the root or web server. 

- Tech stack from high overview to low looks like: React -> Caddy2 -> NodeJS -> MongoDB (on the backend)
- NodeJS runs all the Javascript, it's the interpreter and will help run all the web services
- Frontend application: includes the browser, html/css, react
- Backend application: running on Node.js to work with server, database, etc
- Every device has a unique IP address, each connection point is a port. Certain ports like 443, is for secure HTTPS, and then once you get through you're just moved to another random port
- First layer in connections is Link layer (physical wire connections), then up is internet, like IP for establishing connections, third is transport, like TCP/UDP for packet delivery, last is application, like HTTPS for functionality like web browsing
- With the domain name, the root will include the suffix (.edu), or the TLD top level domain, along with the SLD secondary level domain (ex: tuneshare.click) which is bought together
- Subdomain comes before the root
- localhost is one domain that your computer will always know (127.0.0.1), hardcoded
- After creating a domain type, you can create DNS record types that will map certain names/domains to specific IP addresses

## HTML Notes

- We use tags to designate the start/end of an HTML element using (<> and </>)
- <!DOCTYPE html> should always go at the very beginning of the file
- HTML elemnt is top level structure, head comes next containing metadata and the <title> within. Body element will contain content structure, with <main> holding the bulk outside of headers, footers, etc
- Each element can have attributes that describe specific details of the element. Common example is the `id` attribute to distinguish it, or `class` to classify the element into a named group of elements. They're written inside the element tag with a name followed by an optional value. Ex:
- `<p> id="hello" class="greeting">Hello world</p>`
- Hyperlinks are represented by an anchor element <a> with an attribute `href` containg the address of the link. Ex:
- `<a href="https://byu.edu">Go to the Y</a>`
- Comments can be made using <!-- commented text -->
- The main HTML file should usually be named index.html (default)
- Block elements are a distinct element in the flow of the content structure, while inline doesn't disrupt the flow of a block element's content
- Ex: `div` is a block element that could have an inline element `b` to bring attention to its subtext
- To insert an image, use `<img src="link" alt="text" width="300">` etc
- Most input elements have some common attributes: `name` of the input, `disabled`, initial `value` of the input, `required` to signify if it has to be filled out to be valid
- To include an audio file you use `audio` element and use `src` to specify the URL. Include `controls` attribute if you want the user to be able to control the audio playback
- Document Object Model (DOM) is like the tree structure that specifies how HTML documents are rendered
- Might be a good idea to specify html document as `<html lang="en"></html>`


## CSS Notes

- A rule is comprised of a selector (selects elements to apply rule to) and 1+ declarations that represent the property to style with the given value
- Ex: p {color: green;} where p is the selector, color is the property, and green is the value. p would select all paragraph elements
- Can use the `style` attribute of an HTML element to explicitly assign declarations, or can add a style element in the `head` of the HTML document
- Alternatively, could use the HTML `link` element to create a hyperlink to an external file containing CSS rules (link must also be in the head element) (PREFERRED)
- `box_sizing: border-box` could be helpful for padding and border to be included in the size of a box
- Descendant combinators let us specify certain elements in relation to other elements that we want to modify
- If we have used the `class` attribute in our HTML elements, then we can add CSS attributes by `.classname {properties: values;}`
- IDs work in a similar way, but it targets a specific element, and use prefix #
- Pseudo-selectors are those linked to interactions, like links clicked, our mouse positions
- Use @font-face to provide a font name and source location (URL) to guarantee consistency
- Can also import Google fonts with `@import url('google fonts url')`
- To create CSS animations, we use `animation` properties and define `keyframes`, example:
- @keyframes demo {from{font-size: 0vh} to{font-size: 20vh} } to zoom in
- To debug CSS, you can right-click an element and selext `inspect`
- Can use the CSS `display` property to show element's children in a flexible or grid orientation, a block display (fills width of parent), or inline (has width as big as content)
- `<meta name="viewport" content="width=device-width,initial-scale=1" />` use this meta tag in all <head> elements so the browser doesn't scale the page


## Javascript Notes

- Uses function name(){statements;} format, similar to Java
- // for block comments
- Can directly include JavaScript into HTML using `<script>` element, using `src` attribute to reference an external JavaScript file, or putting it directly inline as part of an even attribute handler
- can then call a function with a button click  for example using `<button onclick="functionName()">`
- User `require` statement to reference package name (like imports)
- Use 'let' to declare variables instead of 'var'

## React Notes

- Web frameworks like React help us simplify common patterns, provide common components, to improve performance
- JSX combines html and javascript into one file
- we call const jsx = React.createElement("content") to transpile, for the browser to be able to render the javascript
- Can reference React components, basically functions that can be reused, first by defining it, and then using it in cases like `root.render(<Hello />)`
- Can also feed it arguments, but if giving multiple, need to make sure they're wrapped into only one element
- React.useState() is used to be able to change the state of variables or values
- BrowserRouter  helps map route to components, where given certain routing links, we use/render certain components (might use it to update the home page when selecting songs) (will need to import react-router-dom)
- Vite is the tool we use to be able to display our React/jsx files

## Javascript Notes

- With console.log(), can use it like print feature to help debug
- Can call console.time() or even console.count()
- Functions are another type in JS, meaning we can pass them as parameters too
- Anonymous functions basically define the function within wherever we're calling; the arrow syntax makes it more concise
- ex: 'doMath((a,b) => a - b, 5, 3));'
- Once an arrow function has multiple lines or we add brackets, we need to explicitly state a return value
- Closure: definition + stack of variables with their states, provides like exceptions to scope
- ex: 'function makeClosure(init) { let closureValue = init; return () => 'closure $(++closureValue}';'
- then we can call closure() and it won't init again but just return the original incremented value over and over again
- Need to link variables to react so that it knows to rerender the html page when variables are updated
- If the state of the variable ever changes, then we update the html page

- Every attribute we add to an html element in jsx becomes a property in react that we can access later
- React basically monitors if any state has changed, and if so, reacts to it by rerendering the page
- JSX doesn't do CSS styles, but have to use {} to show we're escaping JSX and then another {} set to define your object literal
- Begin by setting state variables that we want to keep track of to be able to update our elementss
- Ex: 'const [value, updateFunction] = React.useState('defaultValue');'
- And then we can reference those values in the html elements as <element>{value}</element>
- We'll also need a function to call our updateFunction() that allows us to set/update our value, and then we just need to call that function somewhere
- React.useEffect(() => {}, []); [] meaning its only called on the initial render...and inside of this function we can call all the updateFunctions() of the state variables we want to update
- Can use actual javascript (if statements) and insert with {} into jsx html elements

- Browser rendering is single threaded, meaning that things can only be rendered one at a time, nothing running in parallel
- Can be tricky if all the computing power is directed to a task, because then nothing else on your page will be working until the task is completed -> Promises help us work asynchronously
- Each Promise has a state: could be pending, fulfilled, or rejected
- resolve is a function in javascript that will change our promise state to fulfilled, need to create our functions to implement resolve and reject
- ex: 'const p = new Promise(ourFunction);' where function ourFunction(resolve, reject) {//implements resolve, reject}
- 'p.then((result) => callNewFunction() or console.log(result))' is basically doing whatever you want if the result is fulfilled
-  Every Promise has a state (fulfilled) and a result ('done')
-  .catch() is used for reject or failed results, .finally() is always called at the very end
-  'await' makes a then for you, so it just gives the result of a promise without the promise itself, but it will block the next code from running until it resolves or rejects
- The promises/await/async are going to be very crucial for web api calls so our page doesn't lock up while we're trying to retrieve information!
- If we have a function returning a promise, we can wrap it with await to only return its result
- We add async at the beginning of a function declaration to know that we're returning a promise that will be connected to an await
- When we call await, that function and all the parents have to be async (top level module function)


## Web Services
- Browser requests files over HTTPS, our Node.js web service returns those static files like index.html
- But we can also request other dynamic resources over HTTPS (like our 3rd party web api call). We'll end up modifying our own web service to have endpoints that we can call with HTTPS to [POST]/[GET] etc
- And our service can call other services! Like the database, all happening on the backend
- URL (Uniform Resource Locator) is composed of scheme, domain, port, path, parameters, anchor
- Caddy routes our program for us, in the sense it is running on port 443. It looks at the requested domain names, and then will move us to another port
- We also expose port 22 to write and copy our files over when deploying
- HTTP-Hyper Text Transfer Protocol. To make a request, we specify the method, give it a path, and version. We use headers afterwards as parameters to give more information, and then a body
- GET gets a resource, POST creates a resource
- We then get our response, which has the version and status code, headers, and body that it gave us back
- Express is Javascript that write wrappers for our HTML
- Express is our constructor and default functionality, 'app' is our service application, 'req' is our request object, 'res' is our response object
- `app.use(express.static('public'));` looks for those files in the public directory
- whatever term you use after app. will be the http method you want to use linked with middleware functions
