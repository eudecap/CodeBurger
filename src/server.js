import App from './app';

const port = 3003

App.listen(port, () => {
    console.log(`Server successfully started and runnning at http://localhost:${port}`)
});