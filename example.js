import UBFParser from './ubf_parser.js'

const parser = new UBFParser();
const jsData = {
    atom: "example",
    bool: true,
    number: 123,
    string: "Hello",
    list: [1, 2, 3],
    tuple: {key: "value"}
};

const ubfMessage = parser.encode(jsData);
console.log(ubfMessage);
// Output: {atom, "example", bool, true, number, 123, string, "Hello", list, [1, 2, 3], tuple, {key, "value"}}

const ubfString = `{atom, "example", bool, true, number, 123, string, "Hello", list, [1, 2, 3]}`;
const decoded = parser.decode(ubfString);
console.log(decoded);
// Output: { atom: "example", bool: true, number: 123, string: "Hello", list: [1, 2, 3] }

const ws = new WebSocket("ws://localhost:8080/browser_connect","ubf");

ws.onopen = () => {
    console.log("WebSocket connection established");
    ws.send(ubfMessage);
};

ws.onmessage = (event) => {
    console.log("Received message:", event.data);
    let decoded_message = parser.decode(event.data);
    let json_str = JSON.Stringify(decoded_message);
    document.getElementById("server_message").textContent = json_str
    console.log(decoded_message)
};

ws.onclose = () => {
    console.log("WebSocket connection closed");
};

ws.onerror = (error) => {
    console.error("WebSocket error:", error);
};

