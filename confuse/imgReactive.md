# 响应式图片

## 像素密度 `srcset`

```html
<img
  src="https://picsum.photos/id/237/200/300"
  srcset="
    https://picsum.photos/id/237/200/300 1x,
    https://picsum.photos/id/237/400/600 2x
  "
/>
```

1x 表示 1 倍
2x 表示 2 倍
3x 表示 3 倍

## 设备尺寸 `sizes`

sizes 必须与 srcset 一起使用。单独使用 sizes 无效。

```html
<img
  srcset="
    foo-160.jpg   160w,
    foo-320.jpg   320w,
    foo-640.jpg   640w,
    foo-1280.jpg 1280w
  "
  sizes="(max-width: 440px) 100vw,
            (max-width: 900px) 33vw,
            254px"
  src="foo-1280.jpg"
/>
```

1. 在 srcset 属性中，将图片链接及的宽度
2. 在 sizes 属性中。上例表示：在 440px 以下时，图片显示宽广为 100%。在 441-900px 时，图片显示宽度为 33vw。900px 以上时，图片显示宽度为 254px。
3. 浏览器根据设置尺寸加载相应图片，并渲染为相应尺寸。

## `<picture>` & `<source>`

picture 标签是一个容器标签。内部使用 source/img 标签。指定不同情况使用的图片。

```html
<picture>
  <source media="(max-width: 500px)" srcset="cat-vertical.jpg" />
  <source media="(min-width: 501px)" srcset="cat-horizontal.jpg" />
  <img src="cat.jpg" alt="cat" />
</picture>
```

- media 与 sizes 属性，互斥使用。
- 浏览器依次执行。渲染最先符合条件的。最后的 img 标签是兜底的。

## 图片格式 `<source type>`

```html
<picture>
  <source type="image/svg+xml" srcset="logo.xml" />
  <source type="image/webp" srcset="logo.webp" />
  <img src="logo.png" alt="ACME Corp" />
</picture>
```

- 浏览器依次使用这些图片格式。渲染最先得到支持的。
