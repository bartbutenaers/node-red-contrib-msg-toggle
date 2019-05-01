# node-red-contrib-msg-toggle
A Node-RED node to toggle (i.e. switch on/off) messages passing through

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-msg-toggle --save 
```

## Node usage
This node let you control if messages are allowed to pass through, by a simple checkbox, without having to (re)deploy your flow:

![Demo](/images/toggle_msg_demo.gif)

```
[{"id":"1e69f6d6.45b609","type":"toggle-msg","z":"95744d6c.fa339","initialMode":"blocking","name":"My msg controller","x":630,"y":460,"wires":[["9352ee9a.c3b0d"]]},{"id":"c010f6a1.601118","type":"inject","z":"95744d6c.fa339","name":"Inject msg every second","topic":"","payload":"","payloadType":"date","repeat":"1","crontab":"","once":false,"onceDelay":0.1,"x":170,"y":460,"wires":[["47da134a.10367c"]]},{"id":"9352ee9a.c3b0d","type":"debug","z":"95744d6c.fa339","name":"Anything arrived ???","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":860,"y":460,"wires":[]},{"id":"47da134a.10367c","type":"function","z":"95744d6c.fa339","name":"Counter in payload","func":"var msgCounter = flow.get(\"msgCounter\") || 0;\nmsgCounter = msgCounter + 1;\nflow.set(\"msgCounter\", msgCounter);\n\nreturn {payload: msgCounter};","outputs":1,"noerr":0,"x":410,"y":460,"wires":[["1e69f6d6.45b609"]]}]
```

This can be particularly handy when doing test work in your Node-RED flow.  Indeed your can play with the messages at run-time, without having to change your flow.

The values of the checkboxes will also be synchronized between multiple flow editors:

![Synchronized](/images/toggle_msg_sync.gif)

## Node configuration

### Initial
The initial mode that this node will use after a (re)deploy.  Possible values are *'blocking'* and *'passing'*.
