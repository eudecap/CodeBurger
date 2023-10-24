import App from './app';

const port = 6000

App.listen(port, () => {
    console.log(`Server successfully started and runnning at http://localhost:${port}`)
});