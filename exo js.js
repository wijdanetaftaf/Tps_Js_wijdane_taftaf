/*function run() {
  function repetition() {
    callback(); 
    setTimeout(run,1000); 
  }

  setTimeout(repetition, interval); 
}*/

/*console.log("Program Started");

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("done");
  }, 3000);
});

console.log(promise); 
console.log("program in progress...");

promise.then(() => {
  console.log("Program complete:");
});*/

/*console.log("Program started");


const t= new Promise((res, rej) => {
  const tRej= setTimeout(() => rej(), 2000);
  const tRes= setTimeout(() => res(), 3000);


  const settle = (fn) => (value) => {
    clearTimeout(tReject);
    clearTimeout(tResolve);
    fn(value);
  };

  
  res= settle(res);
  rej= settle(rej);
});


console.log(t); 

console.log("Program in progress...");

t
  .then((msg) => {
    console.log("Program complete:", msg);
  })
  .catch((err) => {
    console.log("Program failure:", err.message);
  });*/


/*console.log("Program started");

const firstPromise = new Promise((resolve) => {
  setTimeout(() => resolve("Step 1 complete"), 3000);
});

console.log(firstPromise); 

console.log("Program in progress...");


firstPromise
  .then((message1) => {
    console.log(message1); 
    return new Promise((resolve) => {
      setTimeout(() => resolve("Step 2 complete"), 3000);
    });
  })
  .then((message2) => {
    console.log(message2); 
  });
*/


const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('home.html', (err, data) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
        });
    } else if (req.url === '/about') {
        fs.readFile('about.html', (err, data) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
        });
    } else if (req.url === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            firstName: 'Amal',
            lastName: 'Ourdou',
        }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

