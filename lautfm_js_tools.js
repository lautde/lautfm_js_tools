// json2.js:          https://github.com/douglascrockford/JSON-js/raw/master/json2.js
// compressed with:   http://dean.edwards.name/packer/
//
var JSON;if(!JSON){JSON={}}(function(){"use strict";function f(n){return n<10?'0'+n:n}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse');}}}());


/*
 * flowplayer.js 3.2.11. The Flowplayer API
 *
 * Copyright 2009-2011 Flowplayer Oy
 *
 * This file is part of Flowplayer.
 *
 * Flowplayer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Flowplayer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Flowplayer.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Date: 2012-06-16 10:34:45 -0400 (Sat, 16 Jun 2012)
 * Revision: 808
 */
(function(){function g(o){console.log("$f.fireEvent",[].slice.call(o))}function k(q){if(!q||typeof q!="object"){return q}var o=new q.constructor();for(var p in q){if(q.hasOwnProperty(p)){o[p]=k(q[p])}}return o}function m(t,q){if(!t){return}var o,p=0,r=t.length;if(r===undefined){for(o in t){if(q.call(t[o],o,t[o])===false){break}}}else{for(var s=t[0];p<r&&q.call(s,p,s)!==false;s=t[++p]){}}return t}function c(o){return document.getElementById(o)}function i(q,p,o){if(typeof p!="object"){return q}if(q&&p){m(p,function(r,s){if(!o||typeof s!="function"){q[r]=s}})}return q}function n(s){var q=s.indexOf(".");if(q!=-1){var p=s.slice(0,q)||"*";var o=s.slice(q+1,s.length);var r=[];m(document.getElementsByTagName(p),function(){if(this.className&&this.className.indexOf(o)!=-1){r.push(this)}});return r}}function f(o){o=o||window.event;if(o.preventDefault){o.stopPropagation();o.preventDefault()}else{o.returnValue=false;o.cancelBubble=true}return false}function j(q,o,p){q[o]=q[o]||[];q[o].push(p)}function e(){return"_"+(""+Math.random()).slice(2,10)}var h=function(t,r,s){var q=this,p={},u={};q.index=r;if(typeof t=="string"){t={url:t}}i(this,t,true);m(("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop").split(","),function(){var v="on"+this;if(v.indexOf("*")!=-1){v=v.slice(0,v.length-1);var w="onBefore"+v.slice(2);q[w]=function(x){j(u,w,x);return q}}q[v]=function(x){j(u,v,x);return q};if(r==-1){if(q[w]){s[w]=q[w]}if(q[v]){s[v]=q[v]}}});i(this,{onCuepoint:function(x,w){if(arguments.length==1){p.embedded=[null,x];return q}if(typeof x=="number"){x=[x]}var v=e();p[v]=[x,w];if(s.isLoaded()){s._api().fp_addCuepoints(x,r,v)}return q},update:function(w){i(q,w);if(s.isLoaded()){s._api().fp_updateClip(w,r)}var v=s.getConfig();var x=(r==-1)?v.clip:v.playlist[r];i(x,w,true)},_fireEvent:function(v,y,w,A){if(v=="onLoad"){m(p,function(B,C){if(C[0]){s._api().fp_addCuepoints(C[0],r,B)}});return false}A=A||q;if(v=="onCuepoint"){var z=p[y];if(z){return z[1].call(s,A,w)}}if(y&&"onBeforeBegin,onMetaData,onStart,onUpdate,onResume".indexOf(v)!=-1){i(A,y);if(y.metaData){if(!A.duration){A.duration=y.metaData.duration}else{A.fullDuration=y.metaData.duration}}}var x=true;m(u[v],function(){x=this.call(s,A,y,w)});return x}});if(t.onCuepoint){var o=t.onCuepoint;q.onCuepoint.apply(q,typeof o=="function"?[o]:o);delete t.onCuepoint}m(t,function(v,w){if(typeof w=="function"){j(u,v,w);delete t[v]}});if(r==-1){s.onCuepoint=this.onCuepoint}};var l=function(p,r,q,t){var o=this,s={},u=false;if(t){i(s,t)}m(r,function(v,w){if(typeof w=="function"){s[v]=w;delete r[v]}});i(this,{animate:function(y,z,x){if(!y){return o}if(typeof z=="function"){x=z;z=500}if(typeof y=="string"){var w=y;y={};y[w]=z;z=500}if(x){var v=e();s[v]=x}if(z===undefined){z=500}r=q._api().fp_animate(p,y,z,v);return o},css:function(w,x){if(x!==undefined){var v={};v[w]=x;w=v}r=q._api().fp_css(p,w);i(o,r);return o},show:function(){this.display="block";q._api().fp_showPlugin(p);return o},hide:function(){this.display="none";q._api().fp_hidePlugin(p);return o},toggle:function(){this.display=q._api().fp_togglePlugin(p);return o},fadeTo:function(y,x,w){if(typeof x=="function"){w=x;x=500}if(w){var v=e();s[v]=w}this.display=q._api().fp_fadeTo(p,y,x,v);this.opacity=y;return o},fadeIn:function(w,v){return o.fadeTo(1,w,v)},fadeOut:function(w,v){return o.fadeTo(0,w,v)},getName:function(){return p},getPlayer:function(){return q},_fireEvent:function(w,v,x){if(w=="onUpdate"){var z=q._api().fp_getPlugin(p);if(!z){return}i(o,z);delete o.methods;if(!u){m(z.methods,function(){var B=""+this;o[B]=function(){var C=[].slice.call(arguments);var D=q._api().fp_invoke(p,B,C);return D==="undefined"||D===undefined?o:D}});u=true}}var A=s[w];if(A){var y=A.apply(o,v);if(w.slice(0,1)=="_"){delete s[w]}return y}return o}})};function b(q,G,t){var w=this,v=null,D=false,u,s,F=[],y={},x={},E,r,p,C,o,A;i(w,{id:function(){return E},isLoaded:function(){return(v!==null&&v.fp_play!==undefined&&!D)},getParent:function(){return q},hide:function(H){if(H){q.style.height="0px"}if(w.isLoaded()){v.style.height="0px"}return w},show:function(){q.style.height=A+"px";if(w.isLoaded()){v.style.height=o+"px"}return w},isHidden:function(){return w.isLoaded()&&parseInt(v.style.height,10)===0},load:function(J){if(!w.isLoaded()&&w._fireEvent("onBeforeLoad")!==false){var H=function(){if(u&&!flashembed.isSupported(G.version)){q.innerHTML=""}if(J){J.cached=true;j(x,"onLoad",J)}flashembed(q,G,{config:t})};var I=0;m(a,function(){this.unload(function(K){if(++I==a.length){H()}})})}return w},unload:function(J){if(u.replace(/\s/g,"")!==""){if(w._fireEvent("onBeforeUnload")===false){if(J){J(false)}return w}D=true;try{if(v){if(v.fp_isFullscreen()){v.fp_toggleFullscreen()}v.fp_close();w._fireEvent("onUnload")}}catch(H){}var I=function(){v=null;q.innerHTML=u;D=false;if(J){J(true)}};if(/WebKit/i.test(navigator.userAgent)&&!/Chrome/i.test(navigator.userAgent)){setTimeout(I,0)}else{I()}}else{if(J){J(false)}}return w},getClip:function(H){if(H===undefined){H=C}return F[H]},getCommonClip:function(){return s},getPlaylist:function(){return F},getPlugin:function(H){var J=y[H];if(!J&&w.isLoaded()){var I=w._api().fp_getPlugin(H);if(I){J=new l(H,I,w);y[H]=J}}return J},getScreen:function(){return w.getPlugin("screen")},getControls:function(){return w.getPlugin("controls")._fireEvent("onUpdate")},getLogo:function(){try{return w.getPlugin("logo")._fireEvent("onUpdate")}catch(H){}},getPlay:function(){return w.getPlugin("play")._fireEvent("onUpdate")},getConfig:function(H){return H?k(t):t},getFlashParams:function(){return G},loadPlugin:function(K,J,M,L){if(typeof M=="function"){L=M;M={}}var I=L?e():"_";w._api().fp_loadPlugin(K,J,M,I);var H={};H[I]=L;var N=new l(K,null,w,H);y[K]=N;return N},getState:function(){return w.isLoaded()?v.fp_getState():-1},play:function(I,H){var J=function(){if(I!==undefined){w._api().fp_play(I,H)}else{w._api().fp_play()}};if(w.isLoaded()){J()}else{if(D){setTimeout(function(){w.play(I,H)},50)}else{w.load(function(){J()})}}return w},getVersion:function(){var I="flowplayer.js 3.2.11";if(w.isLoaded()){var H=v.fp_getVersion();H.push(I);return H}return I},_api:function(){if(!w.isLoaded()){throw"Flowplayer "+w.id()+" not loaded when calling an API method"}return v},setClip:function(H){m(H,function(I,J){if(typeof J=="function"){j(x,I,J);delete H[I]}else{if(I=="onCuepoint"){$f(q).getCommonClip().onCuepoint(H[I][0],H[I][1])}}});w.setPlaylist([H]);return w},getIndex:function(){return p},bufferAnimate:function(H){v.fp_bufferAnimate(H===undefined||H);return w},_swfHeight:function(){return v.clientHeight}});m(("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,ClipAdd,Fullscreen*,FullscreenExit,Error,MouseOver,MouseOut").split(","),function(){var H="on"+this;if(H.indexOf("*")!=-1){H=H.slice(0,H.length-1);var I="onBefore"+H.slice(2);w[I]=function(J){j(x,I,J);return w}}w[H]=function(J){j(x,H,J);return w}});m(("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,toggleFullscreen,reset,close,setPlaylist,addClip,playFeed,setKeyboardShortcutsEnabled,isKeyboardShortcutsEnabled").split(","),function(){var H=this;w[H]=function(J,I){if(!w.isLoaded()){return w}var K=null;if(J!==undefined&&I!==undefined){K=v["fp_"+H](J,I)}else{K=(J===undefined)?v["fp_"+H]():v["fp_"+H](J)}return K==="undefined"||K===undefined?w:K}});w._fireEvent=function(Q){if(typeof Q=="string"){Q=[Q]}var R=Q[0],O=Q[1],M=Q[2],L=Q[3],K=0;if(t.debug){g(Q)}if(!w.isLoaded()&&R=="onLoad"&&O=="player"){v=v||c(r);o=w._swfHeight();m(F,function(){this._fireEvent("onLoad")});m(y,function(S,T){T._fireEvent("onUpdate")});s._fireEvent("onLoad")}if(R=="onLoad"&&O!="player"){return}if(R=="onError"){if(typeof O=="string"||(typeof O=="number"&&typeof M=="number")){O=M;M=L}}if(R=="onContextMenu"){m(t.contextMenu[O],function(S,T){T.call(w)});return}if(R=="onPluginEvent"||R=="onBeforePluginEvent"){var H=O.name||O;var I=y[H];if(I){I._fireEvent("onUpdate",O);return I._fireEvent(M,Q.slice(3))}return}if(R=="onPlaylistReplace"){F=[];var N=0;m(O,function(){F.push(new h(this,N++,w))})}if(R=="onClipAdd"){if(O.isInStream){return}O=new h(O,M,w);F.splice(M,0,O);for(K=M+1;K<F.length;K++){F[K].index++}}var P=true;if(typeof O=="number"&&O<F.length){C=O;var J=F[O];if(J){P=J._fireEvent(R,M,L)}if(!J||P!==false){P=s._fireEvent(R,M,L,J)}}m(x[R],function(){P=this.call(w,O,M);if(this.cached){x[R].splice(K,1)}if(P===false){return false}K++});return P};function B(){if($f(q)){$f(q).getParent().innerHTML="";p=$f(q).getIndex();a[p]=w}else{a.push(w);p=a.length-1}A=parseInt(q.style.height,10)||q.clientHeight;E=q.id||"fp"+e();r=G.id||E+"_api";G.id=r;u=q.innerHTML;if(typeof t=="string"){t={clip:{url:t}}}t.playerId=E;t.clip=t.clip||{};if(q.getAttribute("href",2)&&!t.clip.url){t.clip.url=q.getAttribute("href",2)}s=new h(t.clip,-1,w);t.playlist=t.playlist||[t.clip];var I=0;m(t.playlist,function(){var L=this;if(typeof L=="object"&&L.length){L={url:""+L}}m(t.clip,function(M,N){if(N!==undefined&&L[M]===undefined&&typeof N!="function"){L[M]=N}});t.playlist[I]=L;L=new h(L,I,w);F.push(L);I++});m(t,function(L,M){if(typeof M=="function"){if(s[L]){s[L](M)}else{j(x,L,M)}delete t[L]}});m(t.plugins,function(L,M){if(M){y[L]=new l(L,M,w)}});if(!t.plugins||t.plugins.controls===undefined){y.controls=new l("controls",null,w)}y.canvas=new l("canvas",null,w);u=q.innerHTML;function K(L){if(/iPad|iPhone|iPod/i.test(navigator.userAgent)&&!/.flv$/i.test(F[0].url)&&!J()){return true}if(!w.isLoaded()&&w._fireEvent("onBeforeClick")!==false){w.load()}return f(L)}function J(){return w.hasiPadSupport&&w.hasiPadSupport()}function H(){if(u.replace(/\s/g,"")!==""){if(q.addEventListener){q.addEventListener("click",K,false)}else{if(q.attachEvent){q.attachEvent("onclick",K)}}}else{if(q.addEventListener&&!J()){q.addEventListener("click",f,false)}w.load()}}setTimeout(H,0)}if(typeof q=="string"){var z=c(q);if(!z){throw"Flowplayer cannot access element: "+q}q=z;B()}else{B()}}var a=[];function d(o){this.length=o.length;this.each=function(q){m(o,q)};this.size=function(){return o.length};var p=this;for(name in b.prototype){p[name]=function(){var q=arguments;p.each(function(){this[name].apply(this,q)})}}}window.flowplayer=window.$f=function(){var p=null;var o=arguments[0];if(!arguments.length){m(a,function(){if(this.isLoaded()){p=this;return false}});return p||a[0]}if(arguments.length==1){if(typeof o=="number"){return a[o]}else{if(o=="*"){return new d(a)}m(a,function(){if(this.id()==o.id||this.id()==o||this.getParent()==o){p=this;return false}});return p}}if(arguments.length>1){var t=arguments[1],q=(arguments.length==3)?arguments[2]:{};if(typeof t=="string"){t={src:t}}t=i({bgcolor:"#000000",version:[10,1],expressInstall:"http://releases.flowplayer.org/swf/expressinstall.swf",cachebusting:false},t);if(typeof o=="string"){if(o.indexOf(".")!=-1){var s=[];m(n(o),function(){s.push(new b(this,k(t),k(q)))});return new d(s)}else{var r=c(o);return new b(r!==null?r:k(o),k(t),k(q))}}else{if(o){return new b(o,k(t),k(q))}}}return null};i(window.$f,{fireEvent:function(){var o=[].slice.call(arguments);var q=$f(o[0]);return q?q._fireEvent(o.slice(1)):null},addPlugin:function(o,p){b.prototype[o]=p;return $f},each:m,extend:i});if(typeof jQuery=="function"){jQuery.fn.flowplayer=function(q,p){if(!arguments.length||typeof arguments[0]=="number"){var o=[];this.each(function(){var r=$f(this);if(r){o.push(r)}});return arguments.length?o[arguments[0]]:new d(o)}return this.each(function(){$f(this,k(q),p?k(p):{})})}}})();(function(){var h=document.all,j="http://get.adobe.com/flashplayer",c=typeof jQuery=="function",e=/(\d+)[^\d]+(\d+)[^\d]*(\d*)/,b={width:"100%",height:"100%",id:"_"+(""+Math.random()).slice(9),allowfullscreen:true,allowscriptaccess:"always",quality:"high",version:[3,0],onFail:null,expressInstall:null,w3c:false,cachebusting:false};if(window.attachEvent){window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}})}function i(m,l){if(l){for(var f in l){if(l.hasOwnProperty(f)){m[f]=l[f]}}}return m}function a(f,n){var m=[];for(var l in f){if(f.hasOwnProperty(l)){m[l]=n(f[l])}}return m}window.flashembed=function(f,m,l){if(typeof f=="string"){f=document.getElementById(f.replace("#",""))}if(!f){return}if(typeof m=="string"){m={src:m}}return new d(f,i(i({},b),m),l)};var g=i(window.flashembed,{conf:b,getVersion:function(){var m,f;try{f=navigator.plugins["Shockwave Flash"].description.slice(16)}catch(o){try{m=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");f=m&&m.GetVariable("$version")}catch(n){try{m=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");f=m&&m.GetVariable("$version")}catch(l){}}}f=e.exec(f);return f?[1*f[1],1*f[(f[1]*1>9?2:3)]*1]:[0,0]},asString:function(l){if(l===null||l===undefined){return null}var f=typeof l;if(f=="object"&&l.push){f="array"}switch(f){case"string":l=l.replace(new RegExp('(["\\\\])',"g"),"\\$1");l=l.replace(/^\s?(\d+\.?\d*)%/,"$1pct");return'"'+l+'"';case"array":return"["+a(l,function(o){return g.asString(o)}).join(",")+"]";case"function":return'"function()"';case"object":var m=[];for(var n in l){if(l.hasOwnProperty(n)){m.push('"'+n+'":'+g.asString(l[n]))}}return"{"+m.join(",")+"}"}return String(l).replace(/\s/g," ").replace(/\'/g,'"')},getHTML:function(o,l){o=i({},o);var n='<object width="'+o.width+'" height="'+o.height+'" id="'+o.id+'" name="'+o.id+'"';if(o.cachebusting){o.src+=((o.src.indexOf("?")!=-1?"&":"?")+Math.random())}if(o.w3c||!h){n+=' data="'+o.src+'" type="application/x-shockwave-flash"'}else{n+=' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'}n+=">";if(o.w3c||h){n+='<param name="movie" value="'+o.src+'" />'}o.width=o.height=o.id=o.w3c=o.src=null;o.onFail=o.version=o.expressInstall=null;for(var m in o){if(o[m]){n+='<param name="'+m+'" value="'+o[m]+'" />'}}var p="";if(l){for(var f in l){if(l[f]){var q=l[f];p+=f+"="+(/function|object/.test(typeof q)?g.asString(q):q)+"&"}}p=p.slice(0,-1);n+='<param name="flashvars" value=\''+p+"' />"}n+="</object>";return n},isSupported:function(f){return k[0]>f[0]||k[0]==f[0]&&k[1]>=f[1]}});var k=g.getVersion();function d(f,n,m){if(g.isSupported(n.version)){f.innerHTML=g.getHTML(n,m)}else{if(n.expressInstall&&g.isSupported([6,65])){f.innerHTML=g.getHTML(i(n,{src:n.expressInstall}),{MMredirectURL:encodeURIComponent(location.href),MMplayerType:"PlugIn",MMdoctitle:document.title})}else{if(!f.innerHTML.replace(/\s/g,"")){f.innerHTML="<h2>Flash version "+n.version+" or greater is required</h2><h3>"+(k[0]>0?"Your version is "+k:"You have no flash plugin installed")+"</h3>"+(f.tagName=="A"?"<p>Click here to download latest version</p>":"<p>Download latest version from <a href='"+j+"'>here</a></p>");if(f.tagName=="A"||f.tagName=="DIV"){f.onclick=function(){location.href=j}}}if(n.onFail){var l=n.onFail.call(this);if(typeof l=="string"){f.innerHTML=l}}}}if(h){window[n.id]=document.getElementById(n.id)}i(this,{getRoot:function(){return f},getOptions:function(){return n},getConf:function(){return m},getApi:function(){return f.firstChild}})}if(c){jQuery.tools=jQuery.tools||{version:"3.2.11"};jQuery.tools.flashembed={conf:b};jQuery.fn.flashembed=function(l,f){return this.each(function(){$(this).data("flashembed",flashembed(this,l,f))})}}})();


// http://www.tutorialspoint.com/javascript/array_foreach.htm
if (!Array.forEach) {
  Array.prototype.forEach = function(fun /*, thisp*/) {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();
      
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this)
        fun.call(thisp, this[i], i, this);
    }
  };
}

// http://stellapower.net/content/javascript-support-and-arrayindexof-ie
if (!Array.indexOf) {
  Array.prototype.indexOf = function (obj, start) {
    for (var i = (start || 0); i < this.length; i++) {
      if (this[i] == obj) {
        return i;
      }
    }
    return -1;
  }
}

(function() {
  if( !window.laut ){ window.laut = {}; };
  if( !window.laut.fm ){
    // actual code block begins here =======================================================
    
    function setCookie(name,value,seconds) {
      var expires;
      
      if (seconds) {
        var date = new Date();
        date.setTime(date.getTime()+(seconds*1000));
        expires = "; expires="+date.toGMTString();
      } else{
        expires = "";
      }
      document.cookie = name+"="+value+expires+"; path=/";
    }
    
    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }
    
    var with_lautfm_time_offset = function(callback){
      var offset;
      if(offset = parseInt(getCookie('__lautfm__offset__'), 10)){
        callback(offset);
      }else{
        getTime(function(t){
          offset = parseInt(new Date - t, 10); // positive means, we're ahead of the server
          setCookie('__lautfm__offset__',offset,60*60*24);
          callback(offset);
        });
      }
    };
    
    var humanTimeLong = function(){
      var h = this.getHours();
      var m = this.getMinutes();
      var s = this.getSeconds();
      m = m < 10 ? '0'+m : m;
      s = s < 10 ? '0'+s : s;
      return h + ':' + m + ':' + s;
    };
    
    var humanTimeShort = function(){
      var h = this.getHours();
      var m = this.getMinutes();
      m = m < 10 ? '0'+m : m;
      return h + ':' + m;
    };
    
    // parsing API dates:
    var reviver = function(key, value){
      var a;
      var at_key = /.+_at$/.exec(key);
      if( key=='' || at_key ){ // started_at or toplevel (for getTime)
        if (typeof value === 'string') {
          // 2011-07-07 22:03:29 +0200          // 2011-07-07 22:03:29 -0600
          a = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}) ([+-])\d(\d)\d\d$/.exec(value);
          if(a){
            var date = new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], (a[7]=='+' ? +a[4]-a[8] : +a[4]+a[8]), +a[5], +a[6]));
                  
            date.humanTimeLong = humanTimeLong;
            date.humanTimeShort = humanTimeShort;
                  
            return date;
          }
        }
      }
      return value;
    };
    
    var parseJSON = function(string){
      try{
        return JSON.parse(string, reviver);
      } catch(err) {
        err.message = 'JSON parsing error: '+err.message;
        throw err;
      }
    };
    
    var next_full_hour = function(){
      d = new Date;
      d.setHours( d.getHours() + 1 );
      d.setMinutes(0);
      d.setSeconds(0);
      return d;
    };
    
    var expiration_by_content = function(result){
      return (typeof result.ends_at != 'undefined' && result.ends_at) ||
                    (typeof result[0] !='undefined' && result[0].ends_at !='undefined' && result[0].ends_at) ||
                    next_full_hour();
    };
    
    // Idea: http://ejohn.org/blog/javascript-micro-templating/
    // Adopted: http://www.west-wind.com/weblog/posts/2008/Oct/13/Client-Templating-with-jQuery
    var __tmplCache__ = {};
    var parseTemplate = function(templ, data) {
      try {
        var func = __tmplCache__[templ];
        if (!func) {
          var strFunc =
          "var p=[];\n"+
          "var print = function(){p.push.apply(p,arguments);};\n" +
          "p.push('" +
          templ.replace(/[\r\t\n]/g, " ")
          .replace(/'(?=[^%]*%>)/g, "\t")
          .split("'").join("\\'")
          .split("\t").join("'")
          .replace(/<%=(.+?)%>/g, "',$1,'")
          .split("<%").join("');")
          .split("%>").join("\n p.push('")
          + "');return p.join('');";
          
          // alert(strFunc);
          func = new Function(strFunc);
          __tmplCache__[templ] = func;
        }
        return func.call(data);
      } catch (e) {
        return "< # ERROR: " + e.message + ': ' + e.stack + " # >";
      }
    };
    
    // begin private functions =======================================================
    var apiget = function (url, callback_or_opts, watch, self) {
      var apiurl = laut.fm.apiServer + '/' + url;
      var callback;
      
      if(typeof callback_or_opts == 'function'){
        callback = callback_or_opts;
      } else {
        var template = callback_or_opts.template;
        var container = callback_or_opts.container;
        
        callback = function(api_result){
          if(template && container){
            if(typeof container == 'string'){ container = document.getElementById(container) ; }
            if(typeof template == 'string' && document.getElementById(template) != null){ template = document.getElementById(template).innerHTML }
          };
          
          if(callback_or_opts.callback){
            if(container){ container.innerHTML = parseTemplate(template, api_result); }
            return callback_or_opts.callback(api_result);
          } else {
            return (!!container) && (container.innerHTML = parseTemplate(template, api_result));
          }
        };
      }
      
      if (window.XDomainRequest) { // For IEs
        var xdr = new XDomainRequest();
        xdr.open("GET", apiurl);
        
        xdr.timeout = 10000;
        xdr.onprogress = function(){};
        xdr.onerror = function(e){};
        xdr.ontimeout = function(){};
        xdr.onload = function(){
          var result = parseJSON(this.responseText);
          var outcome = callback(result);
          
          // IEs XDR request doesn't support extracting the headers.
          // a bad hack, extracting the expiration info in some cases out of the
          // json content. for now, we only handle .current_song and .last_songs:
          if(outcome !== false && typeof(watch)!='undefined' && watch){
            var expires = expiration_by_content(result);
            if(expires){
              // The absolute difference between now and the expiration, at least 5 seconds.
              with_lautfm_time_offset(function(offset){
                var expires_in = Math.max(5000, expires - new Date + offset);
                var to = setTimeout(function(){ apiget(url, callback, true, self); }, expires_in);
                if(self.timers){ self.timers.push(to) };
              });
            }
          }
        
        };
        setTimeout(function(){ xdr.send(''); }, 0);
      } else { // for browsers
        try {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", apiurl, true);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4){
              if( parseInt(xhr.status, 10) >= 200 && parseInt(xhr.status, 10) < 300){
                var result = parseJSON(this.responseText);
                var outcome = callback(result);
                if(outcome !== false && typeof(watch)!='undefined' && watch){
                  // The absolute difference between now and the expiration, at least 5 seconds.
                  // Adds the offset of the local computer to the lautfm server.
                  with_lautfm_time_offset(function(offset){
                    var expires_in = Math.max(5000, Date.parse(xhr.getResponseHeader('Expires')) - new Date + offset);
                    var to = setTimeout(function(){ apiget(url, callback, true, self); }, expires_in);
                    if(self.timers){ self.timers.push(to) };
                  });
                }
              
              } else {
                if(typeof self.errorcallback == 'function')
                  self.errorcallback('Not a 200-ish response: '+xhr.status);
              }
            }
          };
          xhr.send();
                
        } catch(e) {
          if(typeof self.errorcallback == 'function')
            self.errorcallback(e.message);
        }
      }
    };
    
    // The general API calls:
    var getTime         = function(callback       ){ apiget('time'          , callback, false, this); return this; };
    var getStatus       = function(callback       ){ apiget('server_status' , callback, false, this); return this; };
    var getLetters      = function(callback, watch){ apiget('letters'       , callback, watch, this); return this; };
    var getGenres       = function(callback, watch){ apiget('genres'        , callback, watch, this); return this; };
    var getStationNames = function(callback, watch){ apiget('station_names' , callback, watch, this); return this; };
    var getAllListeners = function(callback, watch){ apiget('listeners'     , callback, watch, this); return this; };
    
    // The single station API calls:
    var getInfo         = function(callback, watch){ apiget('station/' + this.station                  , callback, watch, this); return this; };
    var getCurrentSong  = function(callback, watch){ apiget('station/' + this.station + '/current_song', callback, watch, this); return this; };
    var getLastSongs    = function(callback, watch){ apiget('station/' + this.station + '/last_songs'  , callback, watch, this); return this; };
    var getPlaylists    = function(callback, watch){ apiget('station/' + this.station + '/playlists'   , callback, watch, this); return this; };
    var getSchedule     = function(callback, watch){ apiget('station/' + this.station + '/schedule'    , callback, watch, this); return this; };
    var getNetwork      = function(callback, watch){ apiget('station/' + this.station + '/network'     , callback, watch, this); return this; };
    var getListeners    = function(callback, watch){ apiget('station/' + this.station + '/listeners'   , callback, watch, this); return this; };
    var getNextArtists  = function(callback, watch){ apiget('station/' + this.station + '/next_artists', callback, watch, this); return this; };
    
    var unwatchTimers   = function(){
      for(var i in this.timers) {
        clearTimeout(this.timers[i]);
      }
      this.timers = [];
    };
    
    var query_string_for = function(params) {
      var str = [];
      for(var p in params) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
      }
      return str.join("&");
    };
    
    // The station index API calls:
    var getStationIndex = function(url, callback, params){
      url = url=='' ? 'stations' : 'stations/' + url;
      if(params){ url = url + '?' + query_string_for(params); }
      apiget(url, callback, false, this);
    };
    
    // The station search API calls:
    var getSearch = function(what, query, callback, params){
      url = 'search/'+what+'?query='+encodeURIComponent(query);
      if(params){ url = url + '&' + query_string_for(params); }
      apiget(url, callback, false, this);
    };
    
    var getAll     = function(        callback, params){ getStationIndex('',                                           callback, params); return this; };
    var getLetter  = function(letter, callback, params){ getStationIndex((letter=='#' ? 'numbers' : 'letter/'+letter), callback, params); return this; };
    var getNumbers = function(        callback, params){ getStationIndex('numbers',                                    callback, params); return this; };
    var getGenre   = function(genre,  callback, params){ getStationIndex('genre/'+genre,                               callback, params); return this; };
    var getNames   = function(names,  callback, params){
                if(names.length==0) return callback([]); getStationIndex(names.toString(),                             callback, params); return this; };
    
    var getStationSearch = function(query, callback, params){ getSearch('stations', query, callback, params); return this; };
    
    function Player(opts){
      var current_station, current_timer;
      var player_self = this;
      var last_progress, progress_state, progress_tracker;
      
      // ============================================================================
      // === Public interface =======================================================
      this.volUp = function(){
        if( !this.isPlaying() ){ return false ; }
        this.setVol(this.getVol()+0.1);
      }
      this.volDown = function(){
        if( !this.isPlaying() ){ return false ; }
        this.setVol(this.getVol()-0.1);
      }
      
      this.isPlaying = function(){ return the_player().isPlaying() ; }
      this.getVol = function(){ return the_player().getVol(); }
      this.setVol = function(v){
        if( !this.isPlaying() ){ return false ; }
        the_player().setVol(v);
        player_self.onStateChange('volchange', this.getVol());
        laut.fm.player.volume = this.getVol();
      }
      
      this.getStation = function(){ return current_station ; }
      this.setStation = function(station){
        if(current_timer) current_timer.unwatch();
        
        current_timer = laut.fm.station(station).current_song(function(song){ player_self.onStateChange('songchange', song, current_station) }, true);
        current_station = station;
      };
      
      var trackProgress = function(player, callb){
        progress_tracker = setInterval(function(){
          if(!player.isPlaying()) return false;
          var progress = player.progress();
                
          if(progress==last_progress && progress_state!='stalled'){
            player_self.onStateChange('stalled');
            progress_state = 'stalled';
          }
          if(progress!=last_progress && progress_state=='stalled'){
            player_self.onStateChange('play', player.isPlaying());
            progress_state = 'playing';
          }
          
          last_progress = progress;
        }, 1000);
      };
      var untrackProgress = function(){ clearInterval(progress_tracker); };
      
      this.play = function(station){
        if(typeof(station)=='undefined' || station==null){ station = current_station ; };
        // if(current_station == station){ return false ; };
        if(current_timer) current_timer.unwatch();
        current_station = station;
        
        if(!progress_tracker) trackProgress(the_player());
        
        the_player().play(station);
      };
      this.stop = function(){
        untrackProgress();
        the_player().stop();
      };
      this.toggle_play = function(){
        if(this.isPlaying()){
          this.stop();
        } else {
          this.play();
        }
      };
      
      // ============================================================================
      // === Private interface ======================================================
      //
      // find the player
      var the_player = function(){
        var a = document.createElement("audio");
        var audio_mp3_support = a && a.canPlayType && a.canPlayType('audio/mp3') != '';
        var flash_support = flashembed.isSupported([9, 0]);
        
        if(flash_support){
          return the_flow_player(player_self.onStateChange);
        } else if(audio_mp3_support) {
          return the_fallback_player(player_self.onStateChange);
        } else {
          //
        }
      };
      
      var the_flow_player = function(onStateChange){
        var get_player = function(){
          
          var l = $f('*').length;
          // iterate over all instances and return the first with correct id.
          for (p=0; p<l; p++){
            var fp = $f(p);
            if( fp.getParent().id=='the_lautfm_player' )
              return fp && fp.getState()!= -1 && fp;
          }
        }
        
        return {
          play: function(station){
            if(this.isPlaying() && this.isPlaying()==station)
              return false;
            
            var player_id = 'the_lautfm_player';
            var stream_url = window.location.protocol+'//stream.laut.fm/'+station+'?type=.flv';
            onStateChange('buffering', station);
            
            var player = get_player();
            if(player) return player.play({title: station, url: stream_url });
            
            var container = document.createElement("a");
            container.setAttribute('id', player_id);
            container.setAttribute('style', 'display:block;width:0px;height:0px;overflow:hidden;');
            document.body.appendChild(container);
            
            var player = $f(container, {
              src: "//api.laut.fm/js_tools/flowplayer-3.2.15.swf",
              onFail: function(){ the_fallback_player(player_self.onStateChange).play(station); }
            }, {
              clip: {
                title: station,
                url: stream_url,
                onBegin: function(){ remove_fallback_player(); }, // flash seems to work, don't need this any more
                onStart: function(){ onStateChange('play', this.getClip(0)['title']); },
                onMetaData: function(){
                  var s = this.getClip(0)['title'];
                  laut.fm.station(s).current_song(function(song){ onStateChange('songchange', song, s); })
                }
              },
              plugins: { controls: null }
            });
          },
          
          isPlaying: function(){
            var this_player = get_player();
            
            if(this_player && this_player.getState()==3){
              return this_player.getClip().url.replace(/.*laut.fm\//,'').replace('?type=.flv','');;
            }else{
              return false;
            }
          },
          progress: function(){
            var this_player = get_player();
            return this_player && this_player.getState()==3 && this_player.getStatus().time;
          },
          
          stop: function(){
            var this_player = get_player();
            this_player.stop();
            this_player.close();
            onStateChange('stop', this_player.getClip(0)['title']);
          },
          
          volUp: function(){
            var new_vol = this.getVol() + 0.1;
            this.setVol(new_vol);
          },
          volDown: function(){
            var new_vol = this.getVol() - 0.1;
            this.setVol(new_vol);
          },
          setVol: function(vol){
            vol = Math.max(Math.min(vol,1),0); // box vol between 0 and 1
            var new_vol = vol*100;
            get_player().setVolume(new_vol);
          },
          getVol: function(){ return Math.round(get_player().getVolume())/100 ; }
        }
        
      };
      
      var the_fallback_player = function(onStateChange){
        var this_player = document.getElementById('the_lautfm_fallback_player');
        
        if(this_player.canPlayType && this_player.canPlayType('audio/mpeg') == '')
          return alert('kein flash & kein html5-audio mit mp3-support? kein stream!')
        
        var onload = function(callb){
          var playing = this_player.played && this_player.played.length > 0;// && typeof this_player.played.end(0) != 'undefined';
          if(playing) return callb();
          setTimeout(function(){ onload(callb) }, 100);
        }
        
        return {
          play: function(station){
            // if(this.isPlaying() && this.isPlaying()==station)
            //   return false;
            
            // if(this.isPlaying() && this.isPlaying()!=station)
            //   laut.fm.station(this.isPlaying()).unwatch();
            
            this_player.setAttribute('src', window.location.protocol+'//stream.laut.fm/'+station);
            this_player.play();
            
            onStateChange('buffering', station);
            
            onload(function(){
              laut.fm.station(station).current_song(function(song){ onStateChange('songchange', song, station) }, true);
              onStateChange('play', station);
            })
          },
          isPlaying: function(){
            if(this_player.buffered.length==0) return false;
            if(this_player.getAttribute('src')==null) return false;
            return this_player.getAttribute('src').replace(window.location.protocol+'//stream.laut.fm/','');
          },
          progress: function(){
            if(this_player.buffered.length==0) return false;
            if(this_player.played.length==0) return false;
            if(this_player.getAttribute('src')==null) return false;
            return this_player.played.end(0);
          },
          stop: function(){
            this_player.pause();
            this_player.setAttribute('src', '');
            onStateChange('stop', current_station);
          },
          volUp: function(){
            this.setVol(Math.round(this.getVol()*10)/10 + 0.1);
          },
          volDown: function(){
            this.setVol(Math.round(this.getVol()*10)/10 - 0.1);
          },
          setVol: function(vol){
            this_player.volume = Math.max(Math.min(vol,1),0); // box vol between 0 and 1
          },
          getVol: function(){ return Math.round(this_player.volume*100)/100 ; }
        }
      };
      
      var remove_fallback_player = function(){
        if(p = document.getElementById('the_lautfm_fallback_player')){ p.parentNode.removeChild(p) }
      };
      var create_fallback_player = function(){
        var fallback_player = document.createElement("audio");
        fallback_player.setAttribute('id', 'the_lautfm_fallback_player');
        fallback_player.setAttribute('style', 'display:block;width:0px;height:0px;');
        document.body.appendChild(fallback_player);
        return fallback_player;
      };
      
      // ============================================================================
      // === Setup ==================================================================
      create_fallback_player();
      
      if(opts){
        var available_elements = [];
        for(var button in opts.buttons){
          elm = document.getElementById(opts.buttons[button]);
          if(elm){
            available_elements.push(elm);
            var arg = elm.getAttribute('data-argument');
            (function(_button, _arg){ elm.onclick = function(){ player_self[_button](_arg) ; }; })(button, arg);
          }
        };
        
        this.onStateChange = function(state, arg, arg2){
          if(opts.onStateChange   && opts.onStateChange){ opts.onStateChange(state, arg) ; }
          if(state=='songchange'  && opts.onSongChange){  opts.onSongChange(arg, arg2) ; }
          if(state=='play'        && opts.onPlay){        opts.onPlay(arg) ; }
          if(state=='stop'        && opts.onStop){        opts.onStop(arg) ; }
          if(state=='buffering'   && opts.onBuffering){   opts.onBuffering(arg) ; }
          if(state=='volchange'   && opts.onVolChange){   opts.onVolChange(arg) ; }
          if(state=='stalled'     && opts.onStall){       opts.onStall(arg) ; }
          
          if(opts.buttonsReflectStateChange && opts.buttonsReflectStateChange.indexOf(state)!=-1 && opts.buttonsReflectStateChangeOn)
            document.getElementById(opts.buttonsReflectStateChangeOn).setAttribute('class', state);
        }
        
        if(opts.station){ this.setStation(opts.station); }
      }; // end if(opts)
      
    };
    
    var playerSingleton;
    
    // The actual laut.fm object:
    window.laut.fm = {
      errorcallback : function(msg){},
      apiServer     : '//api.laut.fm',
      time          : getTime,
      server_status : getStatus,
      letters       : getLetters,
      genres        : getGenres,
      station_names : getStationNames,
      listeners     : getAllListeners,
      stations      : {
        all     : getAll,
        letter  : getLetter,
        numbers : getNumbers,
        genre   : getGenre,
        names   : getNames
      },
      station : function(station){
        return {
          errorcallback : window.laut.fm.errorcallback,
          station       : station,
          info          : getInfo,
          current_song  : getCurrentSong,
          last_songs    : getLastSongs,
          playlists     : getPlaylists,
          schedule      : getSchedule,
          network       : getNetwork,
          listeners     : getListeners,
          next_artists  : getNextArtists,
          unwatch       : unwatchTimers,
          timers        : []
        };
      },
      player : function(opts){
        return typeof playerSingleton=='undefined' ?
            playerSingleton=(new Player(opts)) :
            playerSingleton;
      },
      search : {
        stations : getStationSearch
      },
      parseTemplate: parseTemplate
    };
  
  // actual code block ends here =======================================================
  };
})();
