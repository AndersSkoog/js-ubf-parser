# js-ubf-parser
Javascript Parser for UBF, to Enable the webbrowser to communicate with erlang through a websocket, work in progress.

[UBF](https://ubf.github.io/ubf/) and Erlang can eliminate much of the complexity in web development which stems from the extended ducktape use of HTTP—a protocol that was never originally designed for complex application logic, due to its stateless nature. UBF, on the other hand, allows application logic to be embedded directly in a customized protocol defined by the application programmer. By moving the responsibility for defining the rules of communication between the client and the server into the hands of the application programmer, you also eliminate much of the mystery and automatic behavior by web browsers, which causes much fatigue. It's also very easy to define a small subset of http messages which the custom UBF protocol should recognize, thus making it easy to integrate with external http based systems, when we are forced to do so.  

Here you can listen to Joe Armstrong's persentation for why we only need a **single, universal, customizable, stateful, bidirectional application layer protocol** 
https://www.youtube.com/watch?v=ed7A7r6DBsM

