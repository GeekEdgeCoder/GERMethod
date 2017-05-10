Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


function cacl(arr, callback) {
    var ret;
    for (var i=0; i<arr.length;i++) {
        ret = callback(arr[i], ret);
    }
    return ret;
}

Array.prototype.max = function(){
    return Math.max.apply(null,this);
}  ;
Array.prototype.min = function () {
    return cacl(this, function (item, min) {
        if (!(min < item)) {
            return item;
        }
        else {
            return min;
        }
    });
};

Array.prototype.sum = function () {
    return cacl(this, function (item, sum) {
        if (typeof (sum) == 'undefined') {
            return item;
        }
        else {
            return sum += item;
        }
    });
};
Array.prototype.avg = function () {
    if (this.length == 0) {
        return 0;
    }
    return this.sum(this) / this.length;
};
//数组去除重复元素
Array.prototype.one = function(){
    var n = {},r=[]; //n为hash表，r为临时数组
    for(var i = 0; i < this.length; i++) //遍历当前数组
    {
        if (!n[this[i]]) //如果hash表中没有当前项
        {
            n[this[i]] = true; //存入hash表
            r.push(this[i]); //把当前数组的当前项push到临时数组里面
        }
    }
    return r;
};
//搜索json方法
function lambda( l ) {
    var fn = l.match(/\((.*)\)\s*=>\s*(.*)/) ;
    var p = [] ;
    var b = "" ;

    if ( fn.length > 0 ) fn.shift() ;
    if ( fn.length > 0 ) b = fn.pop() ;
    if ( fn.length > 0 ) p = fn.pop()
        .replace(/^\s*|\s(?=\s)|\s*$|,/g, '').split(' ') ;

    // prepend a return if not already there.
    fn = ( ( ! /\s*return\s+/.test( b ) ) ? "return " : "" ) + b ;

    p.push( fn ) ;

    try
    {
        return Function.apply( {}, p ) ;
    }
    catch(e)
    {
        return null ;
    }
}
Array.prototype.where = function(f) {
    var fn = f ;
    // if type of parameter is string
    if ( typeof f == "string" )
    // try to make it into a function
        if ( ( fn = lambda( fn ) ) == null )
        // if fail, throw exception
            throw "Syntax error in lambda string: " + f ;
    // initialize result array
    var res = [] ;
    var l = this.length;
    // set up parameters for filter function call
    var p = [ 0, 0, res ] ;
    // append any pass-through parameters to parameter array
    for (var i = 1; i < arguments.length; i++) p.push( arguments[i] );
    // for each array element, pass to filter function
    for (var i = 0; i < l ; i++)
    {
        // skip missing elements
        if ( typeof this[ i ] == "undefined" ) continue ;
        // param1 = array element
        p[ 0 ] = this[ i ] ;
        // param2 = current indeex
        p[ 1 ] = i ;
        // call filter function. if return true, copy element to results
        if ( !! fn.apply(this, p)  ) res.push(this[i]);
    }
    // return filtered result
    return res ;
};

function sop(obj) {
    console.log(obj);
}

//计算width
function getWidth(id,len,width) {
    var wid;
    (len & 1)==0?wid=len/2*width:wid=(len+1)/2*width;
    document.getElementById(id).style.width=wid+'px';
}
function getWidth1(id,len,width) {
    var wid;
    wid=(len)*width;
    document.getElementById(id).style.width=wid+'px';
}

//轮播控制器
function leftCtrl($event,width) {
    isIE(function () {
        var len=$event.target.parentNode.parentNode.nextElementSibling.firstChild.nextSibling.style.transform;
        var w=parseInt(len.substring(len.indexOf('(')+1,len.indexOf('px')))+width*2;
        if(w<=0)
            $event.target.parentNode.parentNode.nextElementSibling.firstChild.nextSibling.style.transform='translate('+w+'px, 0px)';
    },function () {
        var len=$event.target.parentNode.parentNode.nextElementSibling.childNodes[0].nextElementSibling.style.transform;
        var w=parseInt(len.substring(len.indexOf('(')+1,len.indexOf('px')))+width*2;
        if(w<=0)
            $event.target.parentNode.parentNode.nextElementSibling.childNodes[0].nextElementSibling.style.transform='translate('+w+'px, 0px)';
    });
}
function rightCtrl($event,width) {
    isIE(function () {
        var len=$event.target.parentNode.parentNode.nextElementSibling.firstChild.nextSibling.style.transform;
        var wid= $event.target.parentNode.parentNode.nextElementSibling.firstChild.nextSibling.style.width;
        var w=parseInt(len.substring(len.indexOf('(')+1,len.indexOf('px')))-width*2;
        if(wid.substring(0,wid.indexOf('px'))/width%2==1&&-(w+width)==wid.substring(0,wid.indexOf('px')))
            w=w+width;
        if(-w!=wid.substring(0,wid.indexOf('px')))
            $event.target.parentNode.parentNode.nextElementSibling.firstChild.nextSibling.style.transform='translate('+w+'px, 0px)';
    },function () {
        var len=$event.target.parentNode.parentNode.nextElementSibling.childNodes[0].nextElementSibling.style.transform;
        var wid=$event.target.parentNode.parentNode.nextElementSibling.childNodes[0].nextElementSibling.style.width;
        var w=parseInt(len.substring(len.indexOf('(')+1,len.indexOf('px')))-width*2;
        if(wid.substring(0,wid.indexOf('px'))/width%2==1&&-(w+width)==wid.substring(0,wid.indexOf('px')))
            w=w+width;

        if(-w<wid.substring(0,wid.indexOf('px')))
            $event.target.parentNode.parentNode.nextElementSibling.childNodes[0].nextElementSibling.style.transform='translate('+w+'px, 0px)';
    });
}

function leftCtrl1($event,width,fun) {
    isIE(function () {
        var len=$event.target.parentNode.parentNode.nextElementSibling.firstChild.nextSibling.style.transform;
        var w=parseInt(len.substring(len.indexOf('(')+1,len.indexOf('px')))+width;
        if(w<=0||w==width)
            $event.target.parentNode.parentNode.nextElementSibling.firstChild.nextSibling.style.transform='translate('+w+'px, 0px)';
    },function () {
        var len=$event.target.parentNode.parentNode.nextElementSibling.childNodes[0].nextElementSibling.style.transform;
        var w=parseInt(len.substring(len.indexOf('(')+1,len.indexOf('px')))+width;

        if(w<=0||w==width){
            var x=2-w/width;
            fun(x);
            // $('.credit-part:eq('+(x)+')').removeClass('active');
            // $('.credit-part:eq('+(x-1)+')').addClass('active');
            $event.target.parentNode.parentNode.nextElementSibling.childNodes[0].nextElementSibling.style.transform='translate('+w+'px, 0px)';
        }

    });
}
function rightCtrl1($event,width,fun) {
    isIE(function () {
        var len=$event.target.parentNode.parentNode.nextElementSibling.firstChild.nextSibling.style.transform;
        var wid= $event.target.parentNode.parentNode.nextElementSibling.firstChild.nextSibling.style.width;
        var w=parseInt(len.substring(len.indexOf('(')+1,len.indexOf('px')))-width;
        if(wid.substring(0,wid.indexOf('px'))/width%2==1&&-(w+width)==wid.substring(0,wid.indexOf('px')))
            w=w+width;
        if(-w!=wid.substring(0,wid.indexOf('px'))-width)
            $event.target.parentNode.parentNode.nextElementSibling.firstChild.nextSibling.style.transform='translate('+w+'px, 0px)';
    },function () {
        var len=$event.target.parentNode.parentNode.nextElementSibling.childNodes[0].nextElementSibling.style.transform;
        var wid=$event.target.parentNode.parentNode.nextElementSibling.childNodes[0].nextElementSibling.style.width;
        var w=parseInt(len.substring(len.indexOf('(')+1,len.indexOf('px')))-width;
        if(wid.substring(0,wid.indexOf('px'))/width%2==1&&-(w+width)==wid.substring(0,wid.indexOf('px')))
            w=w+width;

        if(-w<wid.substring(0,wid.indexOf('px'))-width){
            var x=2-w/width;
            fun(x);

            $event.target.parentNode.parentNode.nextElementSibling.childNodes[0].nextElementSibling.style.transform='translate('+w+'px, 0px)';
        }

    });
}

//取数组差集
function getArrayMinus(b,s) {
    var n={},r=[],sr=[];
    for(var i=0;i<b.length;i++){
        n[b[i]] = true;
        r.push(b[i]);
    }
    for(var i=0;i<s.length;i++)
        if (n[s[i]])
            sr.push(r.splice(r.indexOf(s[i]),1));
    return [r,sr];
}
//判断是否是IE浏览器，IE执行IE()，非IE执行nIE()
function isIE(IE,nIE) {
    if (!!window.ActiveXObject || "ActiveXObject" in window){
        IE();
    }else{
        nIE();
    }
}

//获取json长度
function getJsonLength(jsonData){
    var jsonLength = 0;
    for(var item in jsonData){
        jsonLength++;
    }
    return jsonLength;
}

//获取汉字字符个数
function  getStringLen(Str){
    var   i,len,code;
    if(Str==null || Str == "")   return   0;
    len   =   Str.length;
    for   (i   =   0;i   <   Str.length;i++)
    {
        code   =   Str.charCodeAt(i);
        if   (code   >   255) {len ++;}
    }
    return   len;
}

function loadjscssfile(filename, filetype){
    if (filetype=="js"){
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}
function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none";
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none";
    var allsuspects=document.getElementsByTagName(targetelement);
    for (var i=allsuspects.length; i>=0; i--){
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
            allsuspects[i].parentNode.removeChild(allsuspects[i])
    }
}

//判断浏览器类型
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//json导出到excel
function JSONToExcelConvertor(JSONData, FileName) {
    //先转化json
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var excel = '<table>';

    //设置数据

    for (var i = 0; i < arrData.length; i++) {
        var row = "<tr>";
        for (var index =0;index< arrData[i].length;index++) {
            var value = arrData[i][index].value === "." ? "" : arrData[i][index].value;
            row += '<td>' + value + '</td>';
        }
        excel += row + "</tr>";
    }
    excel += "</table>";
    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
    excelFile += '; charset=UTF-8">';
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{worksheet}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "</html>";


    var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);

    var link = document.createElement("a");
    link.href = uri;

    link.style = "visibility:hidden";
    link.download = FileName + ".xls";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
