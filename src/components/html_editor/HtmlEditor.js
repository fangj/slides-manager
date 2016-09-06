require('./HtmlEditor.less');
import Editor from '../editor';
import Browser from '../browser';
const ThumbView=(props)=><div>{props.data?props.data.value:"新建"}</div>

class HtmlEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value:"test"
        };
    }

    render() {
        let me = this;
        var url="/api/slide";
        var keyField="_id";
        return (
            <div className="html_editor">
                <Editor 
                    url={url}
                    keyField={keyField}/>
                <Browser url={url}
                    thumbView={ThumbView}
                    keyField={keyField}/>
            </div>
        );
    }



    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }
}

module.exports = HtmlEditor;
