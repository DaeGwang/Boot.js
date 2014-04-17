
// Window

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

