
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
			p.appendChild(pHead);
		}

		pBody = Bt.tag("div","panel-body");
		p.appendChild(pBody);
		
		this.mainEl = pBody;
		this.el = p;
		
		return p;
	}
});
