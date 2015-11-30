# fis3-parser-tpl2js
简易js模板

```javascript
    fis3.match('*.tpl', {
        useMap: true,
        rExt: '.js',
        isJsLike: true,
        parser: fis.plugin('tpl2js')
    })
```