import { Elm } from './src/Main';

document.addEventListener('DOMContentLoaded', function() {
    const app = Elm.Main.init({
        node: document.getElementById('root'),
        flags: null,
    });

    app.ports.send.subscribe(console.log);

    app.ports.received.send('hello');
});
