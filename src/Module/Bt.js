/*
 * Bootstrap javascript UI Framework
 * 
 * version: 0.1
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
			dom = document.getElementsByTagName("body").item(); 
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



