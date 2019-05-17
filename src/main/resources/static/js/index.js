$(function(){
    /**
     * 树状结构数据加载
     * @type {Array}
     */
    const data = [];
    for(let j = 0; j < 5; j++){
        var nodes = [];
        for(let i = 0; i < 2; i++){
            var node = {
                text: 'test' +i,
                id: i,
            //  color:"#fff",
//              backColor: "rgba(0,0,0,0.95)",
//              backColor: '#223043',
                href: 'controller'+i,
            }
            nodes.push(node);
        }
        var parent = {
            text: '文件夹' + j +'<span class="glyphicon glyphicon-trash cursor" style="float: right; margin-right: 10px" onclick="delClass()"></span>',
            id: j,
            icon:'glyphicon glyphicon-folder-close',
            // color:"#fff",
            // backColor:'#29384c',
//          backColor: "rgba(0,0,0,0.95)",
            selectable:false,
            nodes:nodes
        }
        data.push(parent);
    }

    $('#collections').treeview({
        data: data,         // 数据源
        emptyIcon: '',    //没有子节点的节点图标
        multiSelect: false,    //多选
        levels: 0,
        expandIcon:"glyphicon glyphicon-triangle-right",
        collapseIcon: "glyphicon glyphicon-triangle-bottom",
        showBorder: true,
        borderColor: "#fff",
        selectedBackColor: '#f5f5f5',
//      onhoverColor: "#1f1f1f",
        onNodeChecked: function (event,data) {
            console.log("nodeId = "+data.nodeId);
            console.log("id = "+data.id);
        },
        onNodeSelected: function (event, data) {
            $('#i_content').attr("src", data.href);
            console.log("nodeId = "+data.nodeId);
            console.log("id = "+data.id);
        },
    });



    /**
     * 生成随机ID
     */
    let random = function() {
        let str = "abcdefghijklmnopqrstuvwxyz0123456789"; // 可以作为常量放到random外面
        let result = "";
        for(let i = 0; i < 5; i++) {
            result += str[parseInt(Math.random() * str.length)];
        }
        return result;
    }
    /**
     * 添加tab控制
     */
    $('#add_right_tab').click(function(){
        //生成随机字符
        let ran = random();
        let href_content = '#content_'+ran;
        let id_content = 'href_content_'+ran;
        let close_icon = 'close_icon_'+ran;
        let content = 'content_'+ran;
        let interface_url = 'interface_url_'+ran;
        let interface_desc_icon = 'interface_desc_icon_'+ran;
        let interface_desc = 'interface_desc_'+ran;
        let url_text = 'url_text_'+ran;
        let right_bottom_tab = 'right_bottom_tab_'+ran;
        let right_bottom_tab_content = 'right_bottom_tab_content_'+ran;
        let href_params = '#params_'+ran;
        let href_authorization = '#authorization_'+ran;
        let href_headers = '#headers_'+ran;
        let href_body = '#body_'+ran;
        let href_response = '#response_'+ran;
        let id_params = 'params_'+ran;
        let id_authorization = 'authorization_'+ran;
        let id_headers = 'headers_'+ran;
        let id_body = 'body_'+ran;
        let id_response = 'response_'+ran;
        let body_json_editor = 'body_json_editor_'+ran;
        let response_json_editor = 'response_json_editor_'+ran;
        //移除所有选中
        $('#right_top_tab li').removeClass('active');
        //追加tab
        $('#right_top_tab li:last').after('<li role="presentation" class="active cus-padding" suffix='+ran+'>' +
            '<a href='+href_content+' id='+id_content+' data-toggle="tab" class="cus-right-top-height">' +
            '<nobr>Untitled Request</nobr>' +
            '<span id='+close_icon+' class="glyphicon glyphicon-remove cus-close-icon cursor" style="display: none" onclick="closeTabContro()"></span>' +
            '</a></li>');
        //追加tab添加选中
        // $('#right_top_tab li:last').addClass('active');
        //移除内容选中
        $('#right_top_tab_content > div').each(function() {
            $(this).removeClass('active');
        })
        //追加内容
        $('#right_top_tab_content > div:last').after('<div class="tab-pane active" id='+content+'>'+
            '<div class="mrg div-mrg"><span id='+interface_url+'>Untitled Request</span>' +
            '<span id='+interface_desc_icon+' class="glyphicon glyphicon-triangle-left cursor" onclick="interfaceDescription()"></span>' +
            '<input id='+interface_desc+' type="text" style="display: none; margin-top: 10px" class="form-control" placeholder="接口描述"/>' +
            '</div><ul class="nav nav-list"><li class="divider"></li></ul><div class="mrg div-mrg">' +
            '<div class="row"><div class="col-md-11"><div class="input-group"><div class="input-group-btn">' +
            '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            'GET<span class="caret"></span></button><ul class="dropdown-menu">' +
            '<li><a href="#">POST</a></li>' +
            '<li><a href="#">PUT</a></li></ul></div>' +
            '<input id='+url_text+' type="text" class="form-control" aria-label="..." onkeydown="urlTextUpdate()" onkeyup="urlTextUpdate()">' +
            '</div></div>' +
            // '<div class="col-md-1"><button class="btn cus-btn">测试</button></div>btn btn-default' +
            '<div class="col-md-1">' +
            '<button class="btn cus-btn">保存</button>\</div></div></div><div class="mrg cus-right-bottom-input">'+
            '<ul id='+right_bottom_tab+' class="nav nav-pills cus-nav-right-pills mrg">' +
            '<li role="presentation" class="active"><a href='+href_params+' data-toggle="tab">params</a></li>' +
            // '<li role="presentation"><a href='+href_authorization+' data-toggle="tab">authorization</a></li>' +
            '<li role="presentation"><a href='+href_headers+' data-toggle="tab">headers</a></li>' +
            '<li role="presentation"><a href='+href_body+' data-toggle="tab">body</a></li>' +
            '<li role="presentation"><a href='+href_response+' data-toggle="tab">response</a></li></ul>'+
            '<div id='+right_bottom_tab_content+' class="tab-content mrg">' +
            '<div class="tab-pane active div-mrg" id='+id_params+'>' +
            '<table class="table table-condensed"><caption>Query Params</caption><tbody><tr flag="true">\n' +
            '<td><input class="form-control" type="text" name="name" placeholder="参数名称" onkeydown="addTrTd(this)"/></td>\n' +
            '<td><input class="form-control" type="text" name="type" placeholder="数据类型" onkeydown="addTrTd(this)"/></td>\n' +
            '<td><input class="form-control" type="text" name="description" placeholder="属性描述" onkeydown="addTrTd(this)"/></td>\n' +
            '<td><input class="form-control" type="text" name="required" placeholder="是否必填" onkeydown="addTrTd(this)"/></td>\n' +
            '<td><input class="form-control" type="text" name="max_length" placeholder="最大长度" onkeydown="addTrTd(this)"/></td>\n' +
            '<td><input class="form-control" type="text" name="remark" placeholder="备注" onkeydown="addTrTd(this)"/></td>\n' +
            '</tr></tbody></table></div>' +
            // '<div class="tab-pane div-mrg" id='+id_authorization+'><textarea class="form-control cus-textarea" rows="12">authorization</textarea></div>' +
            '<div class="tab-pane div-mrg" id='+id_headers+'>' +
            '<table class="table table-condensed"><caption>Headers</caption><tbody><tr flag="true">\n' +
            '<td><input class="form-control" type="text" name="name" placeholder="参数名称" onkeydown="addTrTd(this)"/></td>\n' +
            '<td><input class="form-control" type="text" name="type" placeholder="数据类型" onkeydown="addTrTd(this)"/></td>\n' +
            '<td><input class="form-control" type="text" name="description" placeholder="属性描述" onkeydown="addTrTd(this)"/></td>\n' +
            '<td><input class="form-control" type="text" name="required" placeholder="是否必填" onkeydown="addTrTd(this)"/></td>\n' +
            '<td><input class="form-control" type="text" name="max_length" placeholder="最大长度" onkeydown="addTrTd(this)"/></td>\n' +
            '<td><input class="form-control" type="text" name="remark" placeholder="备注" onkeydown="addTrTd(this)"/></td>\n' +
            '</tr></tbody></table></div>' +
            '<div class="tab-pane div-mrg" id='+id_body+'>' +
            '<table class="table table-condensed"><caption>Body</caption><tbody><tr flag="true">' +
            '<td><input class="form-control" type="text" name="name" disabled placeholder="参数名称" onkeydown="addBodyTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="type" placeholder="数据类型" onkeydown="addBodyTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="description" placeholder="属性描述" onkeydown="addBodyTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="required" placeholder="是否必填" onkeydown="addBodyTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="max_length" placeholder="最大长度" onkeydown="addBodyTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="remark" placeholder="备注" onkeydown="addBodyTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="parent" disabled placeholder="父级" onkeydown="addBodyTrTd(this)"/></td>' +
            '</tr></tbody></table>' +
            // '<textarea class="form-control cus-textarea" rows="12" placeholder="JSON格式数据" onkeydown="analysisJson(this)" onkeyup="analysisJson(this)"></textarea>' +
            '<div id='+body_json_editor+' class="cus-jsoneditor"></div>' +
            '</div><div class="tab-pane div-mrg" id='+id_response+'>' +
            // '<textarea class="form-control cus-textarea" rows="12" placeholder="JSON格式数据"></textarea>' +
            '<div id='+response_json_editor+' class="cus-jsoneditor"></div></div></div></div></div>');
        //判断是否显示关闭图标
        showOrHide();
        //初始化json编辑器
        initJsonEditor(ran);
    })
    //初始化json编辑器
    initJsonEditor('default');
})
let flag = false;
/**
 * 获取选择当前tab页后缀
 */
function getSelectSuffix() {
    let suffix = $('#right_top_tab .active').attr('suffix');
    return suffix;
}

/**
 * 首个tab是否显示关闭
 */
function showOrHide(){
    //获得id后缀
    let suffix = getSelectSuffix();
    //获得tab长度
    let len = $('#right_top_tab li').length;
    if(len >= 2){
        $('#close_icon_default').css('display','inline');
        $('#close_icon_'+suffix).css('display','inline');
    }else{
        $('#close_icon_default').css('display','none');
        $('#close_icon_'+suffix).css('display','none');
    }
}
/**
 * 关闭tab控制
 */
function closeTabContro(){
    //获得id后缀
    let suffix = getSelectSuffix();
    //获取上级元素长度
    let prevLen = $('#href_content_'+suffix).parent().prev().length;
    if(prevLen > 0){
        //将上一个元素置为选中
        $('#href_content_'+suffix).parent().prev().addClass('active');
        $('#content_'+suffix).prev().addClass('active');
    }else{
        //将下一个元素置为选中
        $('#href_content_'+suffix).parent().next().addClass('active');
        $('#content_'+suffix).next().addClass('active');
    }
    //删除元素
    $('#href_content_'+suffix).parent().remove();
    $('#content_'+suffix).remove();
    //判断是否显示关闭
    showOrHide();
}
/**
 * 接口描述图标点击控制
 */
function interfaceDescription() {
    //获得id后缀
    let suffix = getSelectSuffix();
    if(flag){
        $('#interface_desc_icon_'+suffix).attr('class','glyphicon glyphicon-triangle-left cursor')
        $('#interface_desc_'+suffix).css('display','none')
        flag = false;
    }else{
        $('#interface_desc_icon_'+suffix).attr('class','glyphicon glyphicon-triangle-bottom cursor')
        $('#interface_desc_'+suffix).css('display','inline');
        flag = true;
    }
}
/**
 * URL名称修改
 */
function urlTextUpdate(){
    //获得id后缀
    let suffix = getSelectSuffix();
    let url_text_val = $('#url_text_'+suffix).val();
    if(url_text_val != ""){
        $('#href_content_'+suffix+' nobr').text(url_text_val);
        $('#interface_url_'+suffix).text(url_text_val);
    }else{
        $('#href_content_'+suffix+' nobr').text('Untitled Request');
        $('#interface_url_'+suffix).text('Untitled Request');
    }
}
/**
 * 自动追加tr,td
 */
function addTrTd(obj){
    let flag = $(obj).parent().parent().attr('flag');
    if(flag == 'true'){
        $(obj).parent().parent().attr('flag','false');
        // $('#content_'+suffix+' #table_tbody tr:last')
        $(obj).parent().parent().last().after('<tr flag="true">' +
            '<td><input class="form-control" type="text" name="name" placeholder="参数名称" onkeydown="addTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="type" placeholder="数据类型" onkeydown="addTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="description" placeholder="属性描述" onkeydown="addTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="required" placeholder="是否必填" onkeydown="addTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="max_length" placeholder="最大长度" onkeydown="addTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="remark" placeholder="备注" onkeydown="addTrTd(this)"/></td></tr>');
    }
}
function addBodyTrTd(obj){
    let flag = $(obj).parent().parent().attr('flag');
    if(flag == 'true'){
        $(obj).parent().parent().attr('flag','false');
        $(obj).parent().parent().last().after('<tr flag="true">' +
            '<td><input class="form-control" type="text" name="name" disabled placeholder="参数名称" onkeydown="addBodyTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="type" placeholder="数据类型" onkeydown="addBodyTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="description" placeholder="属性描述" onkeydown="addBodyTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="required" placeholder="是否必填" onkeydown="addBodyTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="max_length" placeholder="最大长度" onkeydown="addBodyTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="remark" placeholder="备注" onkeydown="addBodyTrTd(this)"/></td>' +
            '<td><input class="form-control" type="text" name="parent" disabled placeholder="父级" onkeydown="addBodyTrTd(this)"/></td></tr>');
    }
}

/**
 * 初始化json编辑器
 */
function initJsonEditor(suffix){
    var body_container,resp_container, body_options, resp_options, json;
    body_container = document.getElementById('body_json_editor_'+suffix);
    resp_container = document.getElementById('response_json_editor_'+suffix);
    //jsoneditor支持多种模式，modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
    //jsoneditor初始化，mode为tree时，显示结构树，为text时，默认显示为纯文本
    body_options = {
        mode: 'code',
        modes: ['code', 'form', 'text', 'tree', 'view'],
        name: "jsonContent",
        onError: function (err) {
            alert(err.toString());
        },
        onEvent: function(node, event) {
            if (event.type === 'click') {
                var message = 'click on <' + node.field +
                    '> under path <' + node.path +
                    '> with pretty path: <' + prettyPrintPath(node.path) + '>';
                if (node.value) message += ' with value <' + node.value + '>';
                console.log(message);
            }
            function prettyPrintPath(path) {
                var str = '';
                for (var i=0; i<path.length; i++) {
                    var element = path[i];
                    if (typeof element === 'number') {
                        str += '[' + element + ']'
                    } else {
                        if (str.length > 0) str += ',';
                        str += element;
                    }
                }
                return str;
            }
        },
        onChange: function(){
            getJsonData(suffix);
        }
    };
    resp_options = {
        mode: 'code',
        modes: ['code', 'form', 'text', 'tree', 'view'],
        name: "jsonContent",
        onError: function (err) {
            alert(err.toString());
        },
        onEvent: function(node, event) {
            if (event.type === 'click') {
                var message = 'click on <' + node.field +
                    '> under path <' + node.path +
                    '> with pretty path: <' + prettyPrintPath(node.path) + '>';
                if (node.value) message += ' with value <' + node.value + '>';
                console.log(message);
            }
            function prettyPrintPath(path) {
                var str = '';
                for (var i=0; i<path.length; i++) {
                    var element = path[i];
                    if (typeof element === 'number') {
                        str += '[' + element + ']'
                    } else {
                        if (str.length > 0) str += ',';
                        str += element;
                    }
                }
                return str;
            }
        }
    };
    json = {};
    window['body_editor_'+suffix] = new JSONEditor(body_container, body_options, json);
    window['resp_editor_'+suffix] = new JSONEditor(resp_container, resp_options, json);
}
/**
 * 解析textarea中的json
 */
function getJsonData(suffix){
    let str = eval('body_editor_'+suffix).getText();
    let json = $.parseJSON(str); //json数据
    let i = 0; //修改索引值
    analysisJson(suffix, json, i);
}
function analysisJson(suffix, json, i, parent){
    let body = $('#body_'+suffix+' tr')
    let len = body.length;
    for(name in json){
        if(i > len - 2){
            $('#body_'+suffix+' tr:last').after('<tr flag="false">' +
                '<td><input class="form-control" type="text" name="name" disabled placeholder="参数名称" onkeydown="addBodyTrTd(this)"/></td>' +
                '<td><input class="form-control" type="text" name="type" placeholder="数据类型" onkeydown="addBodyTrTd(this)"/></td>' +
                '<td><input class="form-control" type="text" name="description" placeholder="属性描述" onkeydown="addBodyTrTd(this)"/></td>' +
                '<td><input class="form-control" type="text" name="required" placeholder="是否必填" onkeydown="addBodyTrTd(this)"/></td>' +
                '<td><input class="form-control" type="text" name="max_length" placeholder="最大长度" onkeydown="addBodyTrTd(this)"/></td>' +
                '<td><input class="form-control" type="text" name="remark" placeholder="备注" onkeydown="addBodyTrTd(this)"/></td>' +
                '<td><input class="form-control" type="text" name="parent" disabled placeholder="父级" onkeydown="addBodyTrTd(this)"/></td></tr>');
        }
        body.eq(i).find('td:first').find('input').val(name);
        body.eq(i).find('td:last').find('input').val(parent);
        i++;
        body.each(function() {$(this).attr('flag','false');}); //将所有input置为false(自动不可添加)
        body.last().attr('flag','true'); //将最后一个input置为true(可自动添加)
        if(json[name] instanceof Array){
            i = analysisJson(suffix, json[name], i, name);
        }else if(json[name] instanceof Object){
            i = analysisJson(suffix, json[name], i, name);
        }
    }
    return i;
}
function delClass(){
    alert("删除class");
}
/*//获得id后缀
    let suffix = getSelectSuffix();
    let str = $(obj).val();
    let json = $.parseJSON(str);
    let i = 0;
    let body = $('#body_'+suffix+' tr')
    let len = body.length;
    for(name in json){
        if(i > len - 2){
            $('#body_'+suffix+' tr:last').after('<tr flag="false">' +
                '<td><input class="form-control" type="text" name="name" placeholder="参数名称" onkeydown="addTrTd(this)"/></td>' +
                '<td><input class="form-control" type="text" name="type" placeholder="数据类型" onkeydown="addTrTd(this)"/></td>' +
                '<td><input class="form-control" type="text" name="description" placeholder="属性描述" onkeydown="addTrTd(this)"/></td>' +
                '<td><input class="form-control" type="text" name="required" placeholder="是否必填" onkeydown="addTrTd(this)"/></td>' +
                '<td><input class="form-control" type="text" name="max_length" placeholder="最大长度" onkeydown="addTrTd(this)"/></td>' +
                '<td><input class="form-control" type="text" name="remark" placeholder="备注" onkeydown="addTrTd(this)"/></td></tr>');
        }
        body.eq(i).find('td:first').find('input').val(name);
        i++;
        body.each(function() {
            $(this).attr('flag','false');
        })
        body.last().attr('flag','true');
    }*/