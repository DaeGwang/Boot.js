/*
 * Bootstrap javascript UI Library
 * 
 * version: 0.1
 * author: DaeGwang Jang
 */

Bt = {
};

Bt.extend = function(obj, prop) {
	for ( var i in prop ){
		obj[i] = prop[i];
	}
	return obj;
};

Bt.extend(Bt, {
	color: {
		blue: "primary",
		green: "success",
		skyblue: "info",
		orange: "warning",
		red: "danger",
		trans: "link"
	},
	size: {
		large: "lg",
		small: "sm",
		xsmall: "xs",
		block: "block"
	},
	tag: function(name, cls){
		var dom;
		dom = document.createElement(name);
		if(cls) dom.className = cls;
		return dom;
	}
});

Bt.Dom = {
	get: function(id){
		return document.getElementById(id);
	},
	show: function(id){
		var dom;
		if(Bt.Dom.get(id) === null){
			dom = document.getElementsByTagName("body").item(); 
		}
		else{
			dom = Bt.Dom.get(id);
		}
		dom.appendChild(this.el); 
	}
};


// Panel
Bt.Panel = function(config){
	Bt.extend(this, config);
	this.init();
};
Bt.extend(Bt.Panel.prototype, Bt.Dom);
Bt.extend(Bt.Panel.prototype, {
	init: function(){
		// get DOM Elements
		this.getEl();
		
	},
	getEl: function(){
		var p, pColor, pIcon, pHead, pBody;
		var color = ((!this.color) ? "default" : Bt.color[this.color]);
		
		p = Bt.tag("div");
		pColor = "panel-" + color;
		p.className = "panel " + pColor;
		
		if(this.title || this.tbar){
			pHead = Bt.tag("div","panel-heading");
			if(this.title){
				pTitle = Bt.tag("h3","panel-title");
				pTitle.innerText = this.title;
				pHead.appendChild(pTitle);
			}
			if(this.tbar && this.tbar instanceof Array){
				for(var i in this.tbar){
					pHead.appendChild(this.tbar[i].el);
				}
			}
			
		}
		pBody = Bt.tag("div","panel-body");
		
		p.appendChild(pHead);
		p.appendChild(pBody);
		
		this.el = p;
		
		return p;
		
	}
});



// Buttons
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


/*
 * 
 *  Button Test
 * 
 */

window.onload = function(){
	aBtn = new Bt.Button({
		/*
		 * Button Text
		 * ================
		 * default: button
		 */
		text: "Text",
		
		/*
		 * Button Color
		 * ================
		 * blue-primary
		 * green-success
		 * skyblue-info
		 * orange-warning
		 * red-danger
		 * trans-link
		 */
		color: "red", 
	
		/*
		 * Button Size
		 * ===============
		 * large, default, small, xsmall, block
		 */
		size: "xsmall",
		
		/*
		 * Button Icon
		 * ===============
		 * Includes 200 glyphs in font format from the Glyphicon Halflings set
		 * http://glyphicons.com/
		 */
		icon: "ok",
		
		/*
		 * Add Event 
		 */
		onclick: function(){
			aBtn.setText("clicked");
		}
	});
	
	aPanel = new Bt.Panel({
		//title: "panel title",
		tbar: [aBtn],
		color: "orange"
	});
	aPanel.show();
	


}