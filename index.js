
function tpl2js(content) {
    return new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
        // Convert the template into pure JavaScript
        content
            .replace(/[\r\t\n]/g, " ")
            .split("<%").join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join("p.push('")
            .split("\r").join("\\'") +
        "');}return p.join('');");
}

module.exports = function(content, file, settings) {
    try {
        content = tpl2js(content);
    } catch (e) {
        fis.log.warn('Got error: %s while parsing `%s`.%s', e.message.red, file.subpath, e.detail || '');
        fis.log.debug(e.stack);
    }

    return "define('" + (file.id).replace(/\.tpl$/i, '') + "', function(require, exports, module) { module.exports = " + content.toString() + "});";
};

