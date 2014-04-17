
// Button

Bt.Button = function(config){
	Bt.extend(this, config);
	this.init();
};
Bt.extend(Bt.Button.prototype, Bt.Dom);
Bt.extend(Bt.Button.prototype, {
	init: function(){
		// get DOM Elements
		this.getEl();
		// add Events
		if(typeof this.onclick) this.el.onclick = this.onclick;
		
	},
	getIcon: function(){
		var span;
		if(this.icon){
			span = Bt.tag("span");
			span.className = "glyphicon glyphicon-" + this.icon;
		}
		return span;
		
	},
	getEl: function(){
		var btn, btnColor;
		var color = ((!this.color) ? "default" : Bt.color[this.color]);
		var size = ((!this.size) ? '' : "btn-" + Bt.size[this.size]);
		btn = Bt.tag("button");
		btnColor = "btn-" + color;
		btnSize = size;
		btnIcon = this.getIcon();
		if(btnIcon) btn.appendChild(btnIcon);
		
		btn.className = "btn " + btnColor + " " + btnSize;
		btn.innerHTML += " " + (this.text || "Button");
		
		this.el = btn;
		
		return btn;
		
	},
	setText: function(text){
		btnIcon = this.getIcon();
		this.el.innerText = "";
		if(btnIcon) this.el.appendChild(btnIcon);
		this.el.innerHTML += " " + text;
	}
});

