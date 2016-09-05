require('./ImageEditor.less');
import ImageUploader from "../../components/image_uploader";
import Browser from '../browser';
var agent = require('superagent-promise')(require('superagent'),Promise);
import PubSub from 'pubsub-js';

const ThumbView=(props)=>props.data?<img src={props.data.url} onClick={_=>agent.del('/api/image/'+props.data._id).then(_=>PubSub.publish('updated'))}/>:<div></div>

class ImageEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let me = this;
        return (
            <div className="image_editor">
                 <ImageUploader/>
                  <Browser url="/api/image"
                    thumbView={ThumbView}
                    keyField="_id"/>
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

module.exports = ImageEditor;
