# Boot.js - BootStrap UI Library

## Introdution
Boot.js is a Bootstrap UI Library. It helps create UI components easily. 


## How to Use

implement bootstrap, [Boot.js](js/boot.js).

```html
<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
<script type="text/javascript" src="js/bootJs.js"></script>
```

### Panel
```js
var samplePanel = new Bt.Panel({
	title: "panel title",
	tbar: [sampleBtn],
	color: "orange"
 });
```

### Button
```js
var saveBtn = new Bt.Button({
	text: 'save Changes',
	color: 'blue'
});
```

### Window
```js
var win = new Bt.Window({
	title: 'Window Title',
	html: 'Window Content',
	footer: [closeBtn, saveBtn]
})
win.show();
```

## Link
* [Bootstrap](http://getbootstrap.com)


## License
MIT license.
