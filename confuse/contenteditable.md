var p = document.getElementById('contentEditableElementId'),
s = window.getSelection(),
r = document.createRange();
r.setStart(p, 0);
r.setEnd(p, 0);
s.removeAllRanges();
s.addRange(r);

<div contenteditable=true placeholder="添加描述符">
  
</div>

div[contenteditable]:empty:not(:focus):before {
content: attr(placeholder);
color: #aaa ;
}

<div contenteditable="true" v-text="content" @input="handleInput">
  
</div>

export default {
data() {
return {
content: ''
}
},
methods: {
handleInput($event){
this.content = $event.target.innerText;

      // 拓展 如果想要只需要前100位数据
      this.content = this.content.substring(0,100)
    }

}
}

# issue

当 vue3 contenteditable 时父组件的点击事件会让可编辑区 focus。

## 解决方案

使用 div 包裹可编辑区。
再为可编辑区增加兄弟元素包裹它。
目的是阻止被父元素被点击。
