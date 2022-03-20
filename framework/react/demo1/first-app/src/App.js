import ArticleTitle from './ArticleTitle'
// 也可以使用require('./ArticleTitle').default
import ArticleBody from './ArticleBody'
import ArticleFooter from './ArticleFooter'

import './app.css' // 引入样式后该文件的后代组件都可以使用相应的类。

let contList = [
    'string',
    'value'
]
let App = () => {
    return (<div>
        <ArticleTitle/>
        <ArticleBody contList={contList}/>
        <ArticleFooter cont='footer cont'></ArticleFooter>
        </div>)
}
export default App