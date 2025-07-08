//工具函数
var game_util = {};
game_util.bind = function (domobj, event_name, call_fun) {
    if (event_name.substring(0, 2) == "on") {
        event_name = event_name.substring(2);
    }
    if (domobj.addEventListener) {
        return domobj.addEventListener(event_name, call_fun, false);
    }
    if (domobj.attachEvent) {
        try {
            return domobj.attachEvent("on" + event_name, call_fun);
        }
        catch (e) {
        }
    }
    return domobj[event_name] = call_fun;
}
game_util.debug = function (s, level) {
    if (!window.is_debug) {
        return;
    }
    if (!level) {
        level = 'debug';
    }
    if (!game_util.debug_div) {
        game_util.debug.id = 0;
        game_util.debug_clear = function () {
            game_util.debug_div.innerHTML = '';
        }
        var div = document.createElement('div');
        div.style.cssText = "clear:both; background-color:#cccccc;";

        var s2 = '<input type=button onclick="game_util.debug_clear()" value="clear" style="clear:both">';
        div.innerHTML = s2;

        var div2 = document.createElement('div');
        div2.innerHTML = '&nbsp;';
        div2.style.cssText = "clear:both;width:800px;overflow:scroll;height:400px;";
        div.appendChild(div2);
        document.body.appendChild(div);
        game_util.debug_div = div2;
    }
    game_util.debug.id++;
    var t = new Date();
    s = '<font color=red>' + game_util.debug.id + '.</font>&nbsp;[' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds() + ']&nbsp;[' + level + ']' + '&nbsp;' + s;
    var div = document.createElement('div');
    div.style.cssText = "clear:both;width:98%;margin-top:4px;border:1px solid green;";
    div.innerHTML = s;
    game_util.debug_div.insertBefore(div, game_util.debug_div.firstChild);

// game_util.debug_div.appendChild(div);
}
game_util.queue = function () {
    this.data = [];
}
game_util.queue.prototype.get_data = function (not_copy) {
    var t = [];
    if (!not_copy) {
        for (var i = 0; i < this.data.length; i++) {
            t.push(this.data[i]);
        }
    } else {
        //引用传递
        t = this.data;
    }
    return t;
}
game_util.queue.prototype.push = function (v) {
    this.data.push(v);
}
game_util.queue.prototype.clear = function (v) {
    this.data = [];
}
game_util.queue.prototype.get_head = function () {
    var t = [];
    if (this.data.length == 0) {
        return false;
    }
    var v = this.data[0];
    for (var i = 1; i < this.data.length; i++) {
        t.push(this.data[i]);
    }
    this.data = t;
    return v;
}

//格式化时间
game_util.format_time = function (t) {
    var s = '';

    function f_0(t) {
        if (t < 10) {
            return '0' + t;
        }
        return t;
    }

    if (t < 60) {
        //mm:ss
        return '00:' + f_0(t);
    } else {
        //mm:ss
        if (t < 3600) {
            return f_0((t - t % 60) / 60) + ':' + f_0(t % 60);
        } else {
            return f_0((t - t % 3600) / 3600) + ':' + f_0((t % 3600 - t % 3600 % 60) / 60) + ':' + f_0(t % 60);
        }
    }

}
//是否在数组中
game_util.in_array = function (array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) {
            return 1;
        }
    }
    return 0;
}
//一维坐标到二维
game_util.d1tod2 = function (d, w) {
    var x1 = d % w, y1 = (d - d % w) / w;
    return [x1, y1];
}
//二维坐标到一维
game_util.d2tod1 = function (x, y, w) {
    return x + y * w;
}

game_util.rand_id = function () {
    var id = 'game_' + Math.random().toString().substring(2, 12);
    return id;
}
//得到控件的绝对位置
game_util.pos = function (e) {
    var x = 0;
    var y = 0;
    var w = e.offsetWidth;
    var h = e.offsetHeight;
    while (e != null) {
        x += e.offsetLeft;
        y += e.offsetTop
        e = e.offsetParent;
    }
    var obj = {
        x: x,
        y: y,
        0: x,
        1: y,
        'left': x,
        'top': y,
        'w': w,
        'h': h
    };
    obj.toString = function () {
        return "{x:" + x + ",y:" + y + "}";
    }
    return obj;
}

//复制数据 深拷贝 注意 仅仅拷贝值 没有原型
game_util.copy = function (d) {
    if (typeof(d) != 'object') {
        return d;
    }
    var t;
    if (d instanceof Array) {
        t = [];
    } else {
        t = {};
    }
    for (var i in d) {
        t[i] = game_util.copy(d[i]);
    }
    return t;
}
//打乱一个数组
game_util.rand_array = function (arr) {
    var t = game_util.copy(arr);

    var t2 = [];
    var max_len = t.length;
    for (var i = 0; i < max_len; i++) {
        var t_len = t.length;
        var k = parseInt(Math.random() * t_len);
        t2.push(t[k]);
        for (var j = k; j < t_len - 1; j++) {
            t[j] = t[j + 1];
        }
        t.length = t_len - 1;
    }
    return t2;
}
game_util.xmlHttp = function () {
    return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
}
/**一个对象的透明
 //i  透明度 1-100
 // filter:alpha(opacity=12);
 -moz-opacity:0.12;
 opacity:0.12;
 **/
game_util.opacity = function (obj, i) {
    //firefox,opera css3
    //todo
    obj.style.opacity = i / 100;
    if (document.all) {
        //ie
        if (/filter:alpha\(opacity=[0-9]+\)/.test(obj.style.cssText)) {

        }

    }

}
//打开一个图层对话框
//返回一个对象
game_util.dlg_cache = {};
game_util.zindex = 100;
//可以拖动的div
game_util.drag = function (o, target, obj) {

    o.onmousedown = function (a) {
        //visibility:hidden,visible
        var div = document.createElement('div');
        div.innerHTML = '&nbsp;';
        div.style.cssText = ' filter: Alpha(opacity=20);  -moz-opacity:.2;  opacity:0.2;  background-color:#EEEEEE;visibility:hidden;position:absolute;z-index:' + (game_util.zindex++) + ';left:0px;top:0px;border:1px solid #EEEEEE;width:100%;height:100%';
        div.style.width = target.offsetWidth + 'px';
        div.style.height = target.offsetHeight + 'px';
        var offset_x = 0;
        var offset_y = 0;
        //ie
        if (document.all) {
            // offset_x=document.documentElement.scrollLeft;
            // offset_y=document.documentElement.scrollTop;
            //   alert([offset_x,offset_y]);;
        }
        div.style.top = target.offsetTop + offset_y + 'px';
        div.style.left = target.offsetLeft + offset_x + 'px';
        document.body.appendChild(div);
        div.style.visibility = 'visible';
        var d = document;
        if (!a)a = window.event;
        var x = a.layerX ? a.layerX : a.offsetX, y = a.layerY ? a.layerY : a.offsetY;

        if (o.setCapture)
            o.setCapture();
        else if (window.captureEvents)
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);

        d.onmousemove = function (a) {

            if (!a)a = window.event;
            if (!a.pageX)a.pageX = a.clientX;
            if (!a.pageY)a.pageY = a.clientY;
            var tx = a.pageX - x, ty = a.pageY - y;
            var offset_x = 0;
            var offset_y = 0;
            //ie
            if (document.all) {
                offset_x = document.documentElement.scrollLeft;
                offset_y = document.documentElement.scrollTop;
                //   alert([offset_x,offset_y]);;
            }

            div.style.left = offset_x + tx + 'px';
            div.style.top = offset_y + ty + 'px';
        };

        d.onmouseup = function () {

            if (o.releaseCapture)
                o.releaseCapture();
            else if (window.captureEvents)
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            d.onmousemove = null;
            d.onmouseup = null;
            //visibility:hidden,visible
            target.style.visibility = 'hidden';
            if (obj) {
                obj.left = div.offsetLeft;
                obj.top = div.offsetTop;
                obj.set_show(1);
            } else {

                target.style.left = div.offsetLeft + 'px';
                target.style.top = div.offsetTop + 'px';
            }
            target.style.visibility = 'visible';
            document.body.removeChild(div);
        };
    };
}

game_util.opendlg = function (w, h, t) {
    this.width = w;
    this.height = h;
    this.title = t;
    this.is_dlg = 0;
    //自动滚动
    this.scroll = 0;
    this.html = '&nbsp;';
    //对话框模式背景
    var bg = document.createElement('div');
    bg.style.cssText = ' filter: Alpha(opacity=40);  -moz-opacity:.4;  opacity:0.4;  background-color:#ADADAD;display:none;position:absolute;z-index:' + (game_util.zindex++) + ';left:0px;top:0px;border:1px solid #EEEEEE;width:100%;height:100%';
    bg.innerHTML = '<iframe width="100%" height="100%"  frameborder=0  style=" filter: Alpha(opacity=10);  -moz-opacity:0.2;  opacity:0.2;" ></iframe>';
    bg.style.width = document.body.scrollWidth + 'px';
    bg.style.height = document.body.scrollHeight + 'px';
    bg.setAttribute("class",'inquiry-bg-dlg');
    this.bg = bg;
    //影子背景
    var bg2 = document.createElement('div');
    bg2.style.cssText = ' filter: Alpha(opacity=50);  -moz-opacity:0.2;  opacity:0.2;  background-color:#ADADAD;display:none;position:absolute;z-index:' + (game_util.zindex++) + ';left:0px;top:0px;border:1px solid #EEEEEE;width:100px;height:100px;padding:0px;';
    bg2.innerHTML = '<iframe style=" filter: Alpha(opacity=50);  -moz-opacity:0.2;  opacity:0.2;" width=100% height=100% frameborder=0 ></iframe>';
    bg2.setAttribute("class",'inquiry-bg-dlg-shadow');
    this.bg2 = bg2;
    this.div = document.createElement('div');
    this.div.style.cssText = 'background-color:#FAFAFA;display:none;position:absolute;z-index:' + (game_util.zindex++) + ';left:0px;top:0px;border:1px solid #EEEEEE;margin:0px;';
    document.body.appendChild(this.bg);
    document.body.appendChild(this.bg2);
    document.body.appendChild(this.div);

    this.id = 'game_' + (Math.random().toString().substring(2, 12));
    game_util.dlg_cache[this.id] = this;
    this.div.id = this.id;
    var host = document.location.host;
    close2ImgPath = (host == 'www.maoyt.net' || host == 'www.maoyt.com') ? '/test' : ''
    var html = '<div class="fill_more_wrap">' +
        '<div class="title">' +
        '<div class="title_con">' + this.title + '</div>' +
        '<a href="#" onclick="game_util.dlg_cache[\'' + this.id + '\'].close();return false;" class="close_box"> <img src="' + close2ImgPath + '/images/close2.gif"> </a> ' +
        '</div>' +
        '<table width=100% height=100%>'
    /*          '<tr>' +
     '<td height=15 style="border-bottom:1px solid #EEEEEE;" >' +
     '<table id="table_title_' + this.id + '" border=0 width=100% height=15>' +
     '<tr>';
     if(host == 'www.maoyt.net' || host == 'www.maoyt.com') {
     html+='<td  style="font-falimy:Arial,Helvetica;font-size:18px;padding-left:27px;text-align:left" id="title_'+this.id+'">'+this.title+'</td><td width=20 height=15><a style="cursor:pointer;" onclick="game_util.dlg_cache[\''+this.id+'\'].close();return false;" ><img height=15 width=15 src="/test/themes/model2_3/style/images/close2.gif" border=0></a></td></table></td></tr>';
     }else{
     html+='<td  style="font-falimy:Arial,Helvetica;font-size:18px;padding-left:27px;text-align:left" id="title_'+this.id+'">'+this.title+'</td><td width=20 height=15><a style="cursor:pointer;"  ><img height=15 width=15 src="/themes/model2_3/style/images/close2.gif" border=0></a></td></table></td></tr>';
     }*/

    html += '<tr><td id="content_' + this.id + '" style="overflow:hidden;height:' + (parseInt(h) - 60) + 'px" >' + this.html + '</td></tr></table>';
    this.div.innerHTML = html;
    // TODO:sy开启拖动报错
    //game_util.drag(document.getElementById('title_'+this.id),this.div,this);
    //game_util.drag(bg2,this.div,this);
    this.set_title = function (t) {
        this.title = t;
        document.getElementById('title_' + this.id).innerHTML = t;
    };
    this.set_html = function (t) {
        this.html = t;
        document.getElementById('content_' + this.id).innerHTML = t;
    };

    this.set_top = function (v) {
        this.bg.style.zIndex = 100000;
        this.bg2.style.zIndex = 100001;
        this.div.style.zIndex = 100002;

    }

    //任务栏点击的时候通知
    this.ontaskclick = function (e) {
        var body = document.documentElement;
        this.scroll_offset_left = this.left - body.scrollLeft;
        this.scroll_offset_top = this.top - body.scrollTop;
        //让它处于可见状态

        if (this.scroll_offset_top < 30) {
            this.scroll_offset_top = 30;
        }
        if (this.scroll_offset_left < 2) {
            this.scroll_offset_left = 2;
        }
        this.set_pos(this.scroll_offset_left + body.scrollLeft, this.scroll_offset_top + body.scrollTop);
    }

    this.set_scroll = function (v) {
        this.scroll = v;
        //记住相对位置
        var body = document.documentElement;
        this.scroll_offset_left = this.left - body.scrollLeft;
        this.scroll_offset_top = this.top - body.scrollTop;
        if (this.scroll_tp) {
            try {
                window.clearInterval(this.scroll_tp);
            } catch (e) {
            }
        }
        this.scroll_tp = window.setInterval(" game_util.dlg_cache['" + this.id + "']._autoscroll()", 2000);
    }
    this._autoscroll = function () {
        if (!this.scroll) {
            return;
        }
        var body = document.documentElement;
        var is_move = 0;
        if (!this._last_scoll_body_left || this._last_scoll_body_left != body.scrollLeft || !this._last_scoll_body_top || this._last_scoll_body_top != body.scrollTop) {
            is_move = 1;
        }

        if (!is_move) {
            return;
        }
        this._last_scoll_body_left = body.scrollLeft;
        this._last_scoll_body_top = body.scrollTop;
        this.set_pos(this.scroll_offset_left + body.scrollLeft, this.scroll_offset_top + body.scrollTop);
        this.flush_pos(1);
    }
    this.get_id = function () {
        return this.id;
    }
    this.set_pos = function (left, top, right, bottom) {
        var body = document.documentElement;
        if (left) {
            this.left = left;
        }
        if (top) {
            this.top = top;
        }
        if (right) {

            this.left = body.scrollLeft + (body.clientWidth - right);
        }

        this.set_show(1);
    }

    this.show = function () {
        var body = document.documentElement;
        var l = body.scrollLeft + (body.clientWidth - this.width) / 2;
        var t = body.scrollTop + (body.clientHeight - this.height) / 2;
        this.left = l;
        this.top = t;
        this.set_show(1);
    };
    //刷新位置
    this.flush_pos = function (is_show) {
        var div = this.div;
        var bg = this.bg;
        var bg2 = this.bg2;
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.top = this.top + 'px';
        div.style.left = this.left + 'px';
        div.style.display = '';
        bg2.style.top = (parseInt(div.style.top) - 2) + 'px';
        bg2.style.left = (parseInt(div.style.left) - 2) + 'px';
        bg2.style.width = (this.width) + 'px';
        bg2.style.height = (this.height) + 'px';
        if (this.is_dlg) {
            bg.style.display = is_show ? '' : 'none';
        }
        bg2.style.display = is_show ? '' : 'none';
    }

    this.set_show = function (is_show) {
        var div = this.div;
        var bg = this.bg;
        var bg2 = this.bg2;
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.top = this.top + 'px';
        div.style.left = this.left + 'px';
        div.style.display = '';
        bg2.style.top = (parseInt(div.style.top) - 2) + 'px';
        bg2.style.left = (parseInt(div.style.left) - 2) + 'px';
        bg2.style.width = (this.width) + 'px';
        bg2.style.height = (this.height) + 'px';
        if (this.is_dlg) {
            bg.style.display = is_show ? '' : 'none';
        }
        bg2.style.display = is_show ? '' : 'none';
        if (toolbar) {
            toolbar.task.add(this.title, this);
        }
        this.set_scroll(this.scroll);
    }
    this.onclose = function () {
    };

    this.close = function () {
        if (toolbar && toolbar.task) {
            toolbar.task.remove(this);
        }
        //移出监听滚动
        if (this.scroll_tp) {
            try {
                window.clearInterval(this.scroll_tp);
            } catch (e) {
            }
        }

        try {
            this.onclose();
        } catch (e) {
            alert(e)
        }
        if (this.div) {
            this.div.style.display = 'none';
            document.body.removeChild(this.div);
            delete this.div;
        }
        //delete
        if (this.bg) {
            document.body.removeChild(this.bg);
            delete this.bg;
        }
        if (this.bg2) {
            document.body.removeChild(this.bg2);
            delete this.bg2;
        }


    };
}

game_util.show_top_msg_cache = {};
/**
 * 顶部消息提示框
 */
game_util.show_top_msg = function (msg) {
    var cache = game_util.show_top_msg_cache;
    var div;
    if (!cache['div']) {
        div = document.createElement('div');
        div.style.cssText = 'background-color:#FAFAFA;display:none;position:absolute;z-index:' + (9999) + ';left:0px;top:0px;border:1px solid #EEEEEE;margin:0px;';
        document.body.appendChild(div);
        cache['div'] = div;
    } else {
        div = cache['div'];
    }

}
game_util.add_fav = function (url, title) {

    function getOs() {
        if (navigator.userAgent.indexOf("MSIE") > 0)return 1;
        if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0)return 2;
        if (isSafari = navigator.userAgent.indexOf("Safari") > 0)return 3;
        if (isCamino = navigator.userAgent.indexOf("Camino") > 0)return 4;
        if (isMozilla = navigator.userAgent.indexOf("Gecko/index.html") > 0)return 5;
        return 0;
    }

    switch (getOs()) {
        case 1:
            window.external.addFavorite(url, title);
            break;
        case 2:
            window.sidebar.addPanel(title, url, "w96");
            break;
    }
}

game_util.setHomepage = function (url) {
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(url);

    }
    else if (window.sidebar) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', url);
    }
}
//test
//alert(game_util.format_time(9));
//alert(game_util.format_time(90));
//alert(game_util.format_time(9000));


var toolbar = {};

toolbar.task = {
    'id': 'toolbar_task'
};

toolbar.task.add = function (title, task_obj) {
    var task = document.getElementById(this.id);
    if (!task) {
        return;
    }
    if (document.getElementById('task_item_' + task_obj.get_id())) {
        //已经存在
        return;
    }
    var div = document.createElement('div');
    div.style.cssText = 'width:100px;height:23px;float:left;background-color:#FAFAFA';
    div.title = title;
    div.innerHTML = '<button style="width:100%;overflow:hidden;line-height:23px;height:23px;font-size:12px;" onclick="game_util.dlg_cache[\'' + task_obj.get_id() + '\'].ontaskclick(event)">' + title + '</button>';
    div.id = 'task_item_' + task_obj.get_id();


    task.appendChild(div);
}
toolbar.task.remove = function (task_obj) {
    var task = document.getElementById(this.id);
    if (!task) {
        return;
    }

    var div = document.getElementById('task_item_' + task_obj.get_id());
    if (div) {
        //已经存在

        var task = document.getElementById(this.id);
        task.removeChild(div)
        return;
    }
}
toolbar.msg = {
    'id': 'toolbar_msg'
}
toolbar.msg.add = function (id, html) {

    var task = document.getElementById(this.id);
    task.innerHTML = html + '&nbsp;';
}

toolbar.msg.remove = function (id) {


    var task = document.getElementById(this.id);
    task.innerHTML = '&nbsp;';
}


function getCookie(name) {

    var start = document.cookie.indexOf(name + "=");

    var len = start + name.length + 1;

    if (( !start ) && ( name != document.cookie.substring(0, name.length) )) {

        return null;

    }

    if (start == -1) return null;

    var end = document.cookie.indexOf(';', len);

    if (end == -1) end = document.cookie.length;

    return unescape(document.cookie.substring(len, end));

}


function setCookie(name, value, expires, path, domain, secure) {

    var today = new Date();

    today.setTime(today.getTime());

    if (expires) {

        expires = expires * 1000 * 60 * 60 * 24;

    }

    var expires_date = new Date(today.getTime() + (expires));

    var c = '';
    c = name + '=' + escape(value) + ( ( expires ) ? ';expires=' + expires_date.toGMTString() : '' );

    c += ( ( path ) ? ';path=' + path : '' );

    c += ( ( domain ) ? ';domain=' + domain : ';domain=w96.cn' );

    c += ( ( secure ) ? ';secure' : '' );

    document.cookie = c;
}


function deleteCookie(name, path, domain) {

    if (getCookie(name)) document.cookie = name + '=' +

    ( ( path ) ? ';path=' + path : '') +

    ( ( domain ) ? ';domain=' + domain : ';domain=w96.cn' ) +

    ';expires=Thu, 01-Jan-1970 00:00:01 GMT';

} 