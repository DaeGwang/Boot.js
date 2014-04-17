
// Grid

Bt.Grid = function(config){
	Bt.extend(this, config);
	this.init();
};
Bt.extend(Bt.Grid.prototype, Bt.Dom);
Bt.extend(Bt.Grid.prototype, {
	init: function(){
		this.getEl();
	},
	setStore: function(json, name){
		var data, record;
		record = [];
		data = json[this.name];
		
		for(var s in json[name][0]){
			record.push(s);
		}
		
		this.data = data;
		this.record = this.activeRecord = record;
	}
	load: function(param, callback){
		var $this = this;
		Bt.Request.ajax({
			type: this.type,
			url: this.url + (params ? "&" + Bt.objEncode(params) : ' '),
			success: function(r, status){
				var json = JSON.parse(r.responseText);
				that.setStore(json, $this.name);
				if($this.el){
					$this.el.remove();
				}
				$this.getEl();
			}
		});
	}
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

