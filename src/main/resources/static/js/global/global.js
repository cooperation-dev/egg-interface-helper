/**
 * 递归构造Body,Response 数据
 * @param suffix
 * @param json
 * @param parent
 * @param type
 */
let analysisJson = (suffix, json, parent, type) => {
    let obj = $('#'+type+'_div_'+suffix);
    $(obj).empty();
    let str = '';
    if(parent == ''){
        if(type == 'body'){
            str = '<table class="table table-condensed"><caption>Body</caption><tbody>';
        }else{
            str = '<table class="table table-condensed"><caption>Response</caption><tbody>';
        }
    }else{
        str = '<table class="table table-condensed"><caption>'+parent+'</caption><tbody>';
    };
    let i = 0;
    for(name in json){
        str += '<tr flag="false"><td><input class="form-control" type="text" name="code" disabled placeholder="参数名称" onkeydown="addBodyTrTd(this)" value="'+name+'"/></td>' +
            '      <td><input class="form-control type" type="text" name="type" placeholder="数据类型" onkeydown="addBodyTrTd(this)"/></td>' +
            '      <td><input class="form-control" type="text" name="description" placeholder="属性描述" onkeydown="addBodyTrTd(this)"/></td><td>' +
            '         <div class="input-group"><div class="input-group-btn">' +
            '            <span class="dropdown-toggle" data-toggle="dropdown" tabindex="-1">' +
            '                <input class="form-control" type="text" name="necessary" disabled placeholder="是否必填" onkeydown="addBodyTrTd(this)"/>' +
            '            </span>' +
            '            <ul class="dropdown-menu pull-right">' +
            '                <li onclick="bottomValChangeSelect(this)"><a href="#">是</a></li>' +
            '                <li onclick="bottomValChangeSelect(this)"><a href="#">否</a></li>' +
            '            </ul></div></div>\</td>' +
            '        <td><input class="form-control" type="text" name="maxLength" placeholder="最大长度" onkeydown="addBodyTrTd(this)"/></td>\n' +
            '      <td><input class="form-control" type="text" name="remark" placeholder="备注" onkeydown="addBodyTrTd(this)"/></td>\n' +
            '<td><input class="form-control" type="text" name="parent" disabled placeholder="父级" onkeydown="addBodyTrTd(this)" value="'+parent+'"/></td></tr>';
        i++;
        if(json[name] instanceof Array){
            analysisJson(suffix, json[name], name, type);
        }else if(json[name] instanceof Object){
            analysisJson(suffix, json[name], name, type);
        }
    }
    str += '</tbody></table>';
    if(i != 0){
        $(obj).prepend(str);
    }
}