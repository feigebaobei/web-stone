import React from "react";

class ArticleBody extends React.Component {
    constructor(props) {
        super(props)
        // 使用props里的数据
        this.state = {
            contList: props.contList
        }
    }
    render () {
        return (<div className="body">
            {
                this.state.contList.map((item, index) => {
                    return <p key={index}>{item}</p>
                })
            }
        </div>)
    }
}
export default ArticleBody