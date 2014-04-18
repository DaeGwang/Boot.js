
// Column

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

