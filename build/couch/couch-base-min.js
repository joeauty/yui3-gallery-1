YUI.add("couch-base",function(e){var a=e.Lang,c=a.isBoolean,d="dataSource",b="couch:error";e.namespace("Couch").Base=e.Base.create("couch-base",e.Base,[],{initializer:function(){this.publish(b,{defaultFn:this._defErrorFn});},_getDataSource:function(f){if(f===true){return this._newDataSource();}return this.get(d);},_newDataSource:function(){return new e.Couch.DataSource(this.getAttrs());},_createDefaultDataSource:function(){return this._newDataSource();},_defErrorFn:function(f){}},{ATTRS:{dataSource:{valueFn:"_createDefaultDataSource"}}});e.QueryString._oldStringify=e.QueryString.stringify;e.QueryString.stringify=function(g,h,f){if(c(g)||Object.prototype.toString.call(g)==="[object Boolean]"){g=g.toString();}return e.QueryString._oldStringify(g,h,f);};},"@VERSION@",{requires:["base-build","querystring","json","event","couch-datasource"]});