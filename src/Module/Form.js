
// Form

// Input
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

// Select
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