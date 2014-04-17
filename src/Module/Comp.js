
// default component

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

