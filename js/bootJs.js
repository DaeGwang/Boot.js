/*
 * Bootstrap javascript UI Library
 * 
 * author: DaeGwang Jang
 */

Bt = {
};

Bt.extend = function(obj, prop) {
	if(obj && prop && typeof prop == 'object'){
		for ( var i in prop ){
			obj[i] = prop[i];
		}
	}
	return obj;
};

(function(){
	var agent = navigator.userAgent.toLowerCase(),
		isIE = agent.indexOf("msie") > -1;
	
	if(msIE){
		XMLHttpRequest = function(){
			return new ActiveXObject(
				navigator.userAgent.indexOf("MSIE 5") >= 0 ?
				"Microsoft.XMLHTTP" : "Msxml2.XMLHTTP"
			);
		}
	}
	
	Bt.extend({
		isIE: isIE
	});
})

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
	},
	get: function(id){
		return document.getElementById(id);
	},
	objEncode : function(){
        if(!o){
            return "";
        }
        var buf = [];
        for(var key in o){
            var ov = o[key], k = encodeURIComponent(key);
            var type = typeof ov;
            if(type == 'undefined'){
                buf.push(k, "=&");
            }else if(type != "function" && type != "object"){
                buf.push(k, "=", encodeURIComponent(ov), "&");
            }else if(ov instanceof Array){
                if (ov.length) {
                    for(var i = 0, len = ov.length; i < len; i++) {
                        buf.push(k, "=", encodeURIComponent(ov[i] === undefined ? '' : ov[i]), "&");
                    }
                } else {
                    buf.push(k, "=&");
                }
            }
        }
        buf.pop();
        return buf.join("");
	},
	arrEncode: function(a) {
		var s = [];
		
		if ( a.constructor == Array ) {
			for ( var i = 0; i < a.length; i++ )
				s.push( a[i].name + "=" + encodeURIComponent( a[i].value ) );
			
		} else {
			for ( var j in a )
				s.push( j + "=" + encodeURIComponent( a[j] ) );
		}
		
		return s.join("&");
	}
});

Bt.Request = {
	httpSuccess: function(r) {
		try {
			return !r.status && location.protocol == "file:" ||
					( r.status >= 200 && r.status < 300 );
		} catch(e) {}
		return false;
	},
	ajax: function(type, url, data){
		if(!url){
			var success = type.success;
			data = type.data;
			url = typelurl;
			type = type.type;
		}
		
		var xml = new XMLHttpRequest();
		xml.open(type || "GET", url, true);
		var onreadystatechange = function(){
			if (xml && (xml.readystate == 4)){
				var status = Bt.Request.httpSuccess(xml) ? "success" : "error";
				if(status != "error") success(xml, status);
				xml.onreadystatechange = function(){};
				xml = null;
			}
		};
		xml.onreadystatechange = onreadystatechange;
		xml.send(data);
	}
}

Bt.Dom = {
	init: function(){
		this.getEl();
		this.setItem();
	},
	show: function(id){
		var dom;
		if(Bt.get(id) === null){
			dom = document.getElementsByTagName("body")[0]; 
		}
		else{
			dom = Bt.Dom.get(id);
		}
		dom.appendChild(this.el); 
	},
	visible: function(v){
		if(this.el) this.el.style.display = (v ? "block" : "none");
	},
	addClass: function(name){
		this.el.className += (" " + name);
	},
	removeClass: function(name){
		
	},
	setItem: function(item){
		if(this.item instanceof Array){
			for(var i=0; i<this.item.length; i++){
				this.mainEl.appendChild(this.item[i].el);
			}
		}
	}
};


//Button

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


Bt.Group = function(config){
	Bt.extend(this, config);
	this.init();
};
Bt.extend(Bt.Group.prototype, Bt.Dom);
Bt.extend(Bt.Group.prototype, {
	getEl: function(){
		var div, btnColor;
		var size = ((!this.size) ? '' : "btn-group-" + Bt.size[this.size]);
		div = Bt.tag("div", "btn-group" 
				+ (this.type ? '-' + this.type : ' ') + size);
		
		this.mainEl = div;
		this.el = div;
		return div;
	}
});


//Column

Bt.Col = function(config){
	Bt.extend(this, config);
	this.init();
};
Bt.extend(Bt.Col.prototype, Bt.Dom);
Bt.extend(Bt.Col.prototype, {
	init: function(){
		this.getEl();
	},
	getEl: function(){
		var div, col;
		div = Bt.tag('div', 'row');
		for(var i=0; i<this.item.length; i++){
			col = Bt.tag('div','col-xs-' + this.item[i].size);
			col.innerHTML = this.item[i].html;
			div.appendChild(col);
		}
		this.el = div;
		return div;
	}
});


//default component

Bt.Comp = function(config){
	Bt.extend(this, config);
	this.init();
};
Bt.extend(Bt.Comp.prototype, Bt.Dom);
Bt.extend(Bt.Comp.prototype, {
	init: function(){
		this.getEl();
	},
	getEl: function(){
		this.el = comp;
		return comp;
		
	}
});



//Form

//Input
Bt.fmInput = function(config){
	Bt.extend(this, config);
	this.init();
};
Bt.extend(Bt.fmInput.prototype, Bt.Dom);
Bt.extend(Bt.fmInput.prototype, {
	init: function(){
		this.getEl();
	},
	getEl: function(){
		var input;
		var size = ((!this.size) ? '' : "input-" + Bt.size[this.size]);
		
		input = Bt.tag("input", "form-control");
		if(this.placeholder) input.setAttribute("placeholder",this.placeholder);
		input.className += " " + size;
		
		this.el = input;
		return input;
	}
});

//Select
Bt.fmSelect = function(config){
	Bt.extend(this, config);
	this.init();
};
Bt.extend(Bt.fmSelect.prototype, Bt.Dom);
Bt.extend(Bt.fmSelect.prototype, {
	init: function(){
		this.getEl();
	},
	getEl: function(){
		var select, option;
		select = Bt.tag('select', 'form-control');
		for(var i=0; i<this.data.length; i++){
			option = Bt.tag('option');
			option.innerText = this.data[i];
			option.value = this.data[i];
			select.appendChild(option);
		}
		return select;
	}
});



//Grid

Bt.Grid = function(config){
	Bt.extend(this, config);
	this.init();
};
Bt.extend(Bt.Grid.prototype, Bt.Dom);
Bt.extend(Bt.Grid.prototype, {
	setStore: function(json, name){
		var data, record;
		record = [];
		data = json[this.name];
		
		for(var s in json[name][0]){
			record.push(s);
		}
		
		this.data = data;
		this.record = this.activeRecord = record;
	},
	load: function(param, callback){
		var that = this;
		Bt.Request.ajax({
			type: this.type,
			url: this.url + (params ? "&" + Bt.objEncode(params) : ' '),
			success: function(r, status){
				var json = JSON.parse(r.responseText);
				that.setStore(json, that.name);
				if(that.el){
					that.el.remove();
				}
				that.getEl();
			}
		});
	},
	getEl: function(){
		var tb, tr, th, thd, tbd, div;
		div = Bt.tag('div');
		div.id = this.id;
		tb = Bt.tag('table', 'table table-striped');
		thd = Bt.tag('thead');
		tr = Bt.tag('tr');
		th = Bt.tag('th');
		th.innerText = "#";
		tr.appendChild(th);
		
		for(var i=0; i<this.activeRecord.length; i++){
			th = Bt.tag('th');
			th.innerText - this.activeRecord[i];
			tr.appendChild(th);
		}
		thd.appendChild(tr);
		
		tbd = Bt.tag('tbody');
		for(var j=0; j<this.data.length; j++){
			tr = Bt.tag('tr');
			td = Bt.tag('td');
			td.innerText = j + 1;
			tr.appendChild(td);
			for(var k=0; k<this.activeRecord.length; k++){
				td = Bt.tag('td');
				td.innerText = this.data[j][this.activeRecord[k]];
				tr.appendChild(td);
			}
			tbd.appendChild(tr);
		}
		tb.appendChild(thd);
		tb.appendChild(tbd);
		div.appendChild(tb);
		
		this.el = div;
		return div;
	}
});




//Panel

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
			p.appendChild(pHead);
		}

		pBody = Bt.tag("div","panel-body");
		p.appendChild(pBody);
		
		this.mainEl = pBody;
		this.el = p;
		
		return p;
	}
});



//Window

Bt.Window = function(config){
	Bt.extend(this, config);
	this.init();
};
Bt.extend(Bt.Window.prototype, Bt.Dom);
Bt.extend(Bt.Window.prototype, {
	init: function(){
		this.getEl();
	},
	getEl: function(){
		var m, mDialog, mContent, mHeader, mBody, mFooter, mClose;
		var $this = this;
		m = Bt.tag('div', 'modal fade in');
		m.style.display = "block";
		mDialog = Bt.tag('div', 'modal-dialog modal-sm');
		mContent = Bt.tag('div', 'modal-content');
		mHeader = Bt.tag('div', 'modal-header');
		mBody = Bt.tag('div', 'modal-body');
		mFooter = Bt.tag('div', 'modal-footer');
		
		if(this.title){
			mClose = Bt.tag('button', 'close');
			mClose.innerText = "x";
			mClose.onclick = function(){
				$this.visible(false);
			}
			
			mHeader.appendChild(mClose);
			mHeader.innerHTML += this.title;
			mContent.appendChild(mHeader);
		}
		mContent.appendChild(mBody);
		mContent.appendChild(mFooter);
		mDialog.appendChild(mContent);
		m.appendChild(mDialog);
		
		this.el = m;
		return m;	
	}
});

