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
      search : {
        stations : getStationSearch
      },
      parseTemplate: parseTemplate
    };
  
  // actual code block ends here =======================================================
  };
})();
