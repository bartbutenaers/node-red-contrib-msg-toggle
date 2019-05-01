module.exports = function(RED) {
    function ToggleMsgNode(config) {
        RED.nodes.createNode(this, config);
        this.toggleMode = config.initialMode || 'passing';
        
        var node = this;
        
        node.setToggleMode = function(toggleMode) {
            this.toggleMode = toggleMode;
            
            // Let all flow editors know about the mode update, so they can update the checkbox layout
            RED.comms.publish("toggle_msg_mode", { id:this.id, mode:toggleMode });
            
            switch (toggleMode) {
                case 'blocking':
                    this.status({fill:"yellow",shape:"ring",text:"blocking"});
                    break;
                case 'passing':
                    this.status({fill:"blue",shape:"dot",text:"passing"});
                    break;
            } 
        }
        
        // Let client know about the initial mode
        node.setToggleMode(node.toggleMode);

        node.on("input", function(msg) {
            switch (node.toggleMode) {
                case 'blocking':
                    // Block the message
                    break;
                case 'passing':
                    // Just pass the input message to the output
                    node.send(msg);
                    break;
            }
        });
    }
    
    RED.nodes.registerType("toggle-msg", ToggleMsgNode);
  
    // Allow clients to change the current mode of a Msg-Toggle node
    RED.httpAdmin.get('/toggle-msg/set/:id/:mode', function(req,res) {
        var node = RED.nodes.getNode(req.params.id);
        var toggleMode = req.params.mode;
        
        if ((node !== null && typeof node !== "undefined" ) && (toggleMode === 'passing' || toggleMode === 'blocking')) {
            node.setToggleMode(toggleMode);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    });
    
    // Allow clients to get the current mode of a Msg-Toggle node
    RED.httpAdmin.get('/toggle-msg/get/:id', function(req,res) {
        var node = RED.nodes.getNode(req.params.id);
        
        if (node !== null && typeof node !== "undefined" ) {
            res.json({ mode:node.toggleMode });
        }
        else {
            res.sendStatus(404);
        }
    });
};
