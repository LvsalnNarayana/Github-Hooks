// server.js
import express, { json } from 'express';
import { exec } from 'child_process';
import { log } from 'console';

const app = express();
app.use(json());

app.get('/',(req,res) => {
    res.send("Hello world");
});
app.use(express.json());
app.post('/', (req, res) => {
  const payload = req.body;
//   console.log(payload);
  
  // Check if it's a push event to the main branch
  if (payload.ref === 'refs/heads/main') {
    console.log('Push event detected on main branch. Building Docker image...');

    // Command to pull the latest changes and build the Docker image
    exec(
      'cd /path/to/your/repo && git pull origin main && docker build . -t my-local-image:latest',
      (err, stdout, stderr) => {
        if (err) {
          console.error(`Error: ${stderr}`);
          res.status(500).send('Error occurred while building the Docker image');
          return;
        }
        console.log(stdout);
        res.status(200).send('Docker image built successfully');
      }
    );
  } else {
    res.status(200).send('No action taken');
  }
});

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
