YUI.add("gallery-asynchronouscommandqueue-base",function(b){var a;a=function(c){a.superclass.constructor.call(this,c);};a.ATTRS={completed:{readOnly:true,value:false},paused:{value:false},started:{readOnly:true,value:false},queue:{value:[],writeOnce:"initOnly"}};a.NAME="AsynchronousCommandQueue";b.extend(a,b.Base,{addCommand:function(c){this.get("queue").push(c);return this;},getCommandCount:function(){return this.get("queue.length");},initializer:function(){this.publish("complete",{fireOnce:true});this.publish("pause");this.publish("resume");this.publish("start",{fireOnce:true});this.on("complete",function(e,c,d){this._set("completed",true);},this);this.on("start",function(e,c,d){this._set("started",true);},this);},pauseQueue:function(){this.set("paused",true);this.fire("pause");return this;},resumeQueue:function(){this.set("paused",false);this.fire("resume");return this.startQueue();},startAll:function(){var d,e=0,f,g,c=this.get("queue");g=function(h){h.execute().on("complete",function(){e+=1;if(e===d){this._set("queue",c.slice(d));if(this.get("queue.length")){this.startAll();}else{this.fire("complete");}}},this);};this.fire("start");for(f=0,d=c.length;f<d;f+=1){g.call(this,c[f]);}return this;},startQueue:function(){if(this.get("paused")){return this;}else{if(!this.get("queue.length")){this.fire("complete");return this;}}this.fire("start");this.get("queue").shift().execute().on("complete",function(){this.startQueue();},this);return this;}});b.AsynchronousCommandQueue=a;},"gallery-2011.03.16-21-24",{requires:["base"],skinnable:false});YUI.add("gallery-asynchronouscommand",function(b){var a;a=function(c){a.superclass.constructor.call(this,c);};a.ATTRS={args:{value:[],writeOnce:"initOnly"},completed:{readOnly:true,value:false},context:{value:b.config.win,writeOnce:"initOnly"},delay:{readOnly:true,value:0},fn:{value:function(c){c.fire("complete");},writeOnce:"initOnly"},started:{readOnly:true,value:false}};a.NAME="AsynchronousCommand";b.extend(a,b.Base,{execute:function(){b.later(this.get("delay"),this,function(){this.fire("start");this.get("fn").apply(this.get("context"),this.get("args"));});return this;},initializer:function(){this.publish("complete",{fireOnce:true});this.publish("start",{fireOnce:true});var c=this.get("args");if(!b.Lang.isArray(c)){c=[c];}c.unshift(this);this._set("args",c);this.on("complete",function(){this._set("completed",true);},this);this.on("start",function(){this._set("started",true);},this);}});b.AsynchronousCommand=a;},"gallery-2011.03.16-21-24",{requires:["base"],skinnable:false});YUI.add("gallery-asynchronouscommandqueue",function(a){},"gallery-2011.03.16-21-24",{requires:["gallery-asynchronouscommand","gallery-asynchronouscommandqueue-base"],skinnable:false});