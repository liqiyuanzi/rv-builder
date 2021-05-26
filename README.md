# rv-builder

## 编译vue，react，ts

**编译后代码可直接使用**

## 使用（执行rvb --options）

**rvb --esm -> esmodule**

**rvb --cjs -> commonjs**

## 配置

**项目根目录rv.config.js或rv.config.json传入配置项**
```
{
    "src": './tmp',
    "dist": './dist',
    "alias": {
        "source": "'target'"
    }
}
```

## style支持

**目前只支持less**