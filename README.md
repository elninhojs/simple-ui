## Messages component JQuery pluggin

This component is just a jquery plugin to show messages to the final user.
With this component is possible show one or mor messages in the same time 
and it will not interrupt the UI.

To see the DEMO page just follow this link:
 [DEMO](https://g4ninh0.000webhostapp.com/messages/index.html)

Below you will find some information on how to perform common tasks.<br>

## Project Folder Structure
```
messages/
    error-bw.png
    error.png
    fatal-bw.png
    fatal.png
    info-bw.png
    info.png
    messages-blue.css
    messages-bw.css
    messages-jam.css
    messages.css
    messages.js
    warn-bw.png
    warn.png
    demo.html
```

To use this plugin first include the files in your page: 

* `<script src="messages.js"></script>` to include js file in your page
* `<link rel="stylesheet" type="text/css" id="msg-style" href="messages-bw.css">` to include one of 4 css avaliable.

After, you can use theese funcions:
//showing an info message
### `Messages.addInfoMessage('Some title not required', 'Message body! Awesome!');`

//showing an error message
### `Messages.addErrorMessage('Some title not required', 'Message body! Awesome!');`

//showing an warn message
### `Messages.addWarnMessage('Some title not required', 'Message body! Awesome!');`

//showing an fatal message
### `Messages.addFatalMessage('Some title not required', 'Message body! Awesome!');`


If you wish, you can configure some attributes in your page load.

### `Messages.init({button:false, image:true, closeAll:true, closeAllLabel:'Close All', listenerWindowScroll:true, time:10000});`

