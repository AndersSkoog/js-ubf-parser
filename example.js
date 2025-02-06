import UBFParser from './ubf_parser.js'

const parser = new UBFParser();
const test_jsData = {
    atom: "example",
    bool: true,
    number: 123,
    string: "Hello",
    list: [1, 2, 3]
};

const test_ubfMessage = parser.encode(test_jsData);
console.log(ubfMessage);
// Output: {atom, "example", bool, true, number, 123, string, "Hello", list, [1, 2, 3], tuple, {key, "value"}}

const test_ubfString = `{atom, "example", bool, true, number, 123, string, "Hello", list, [1, 2, 3]}`;
const test_decoded = parser.decode(test_ubfString);
console.log(test_decoded);
// Output: { atom: "example", bool: true, number: 123, string: "Hello", list: [1, 2, 3] }

const ws = new WebSocket("ws://localhost:8080/browser_connect","ubf");

ws.onopen = () => {
    console.log("WebSocket connection established");
    msg = parser.encode({secret:"aladin"});
    ws.send(msg)
};

ws.onmessage = (event) => {
    console.log("Received message:", event.data);
    let decoded_message = parser.decode(event.data);
    let json_str = JSON.Stringify(decoded_message);
    document.getElementById("server_message").textContent = json_str;
    console.log(decoded_message);
    if(json_str == `{ok:"choose a number between 1-5 to get your prize"}`){
    	msg = parser.encode({picking_price:"1"})
    	ws.send(msg);	
    }
};

ws.onclose = () => {
    console.log("WebSocket connection closed");
};

ws.onerror = (error) => {
    console.error("WebSocket error:", error);
};

