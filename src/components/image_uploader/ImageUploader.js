require('./ImageUploader.less');
import UploadZone from "../../components/upload_zone";
var agent = require('superagent-promise')(require('superagent'),Promise);

class ImageUploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let me = this;
        const {url}=this.state;
        return (
            <div className="image_uploader">
                 <UploadZone url="/upload" onUploaded={this.onUploaded.bind(this)} accept="image/*"/>
                 {!url?null:<img src={url}/>}
            </div>
        );
    }

    onUploaded(files){
        console.log(files[0])
        this.setState({url:files[0].url});
        agent.post('/api/image',{url:files[0].url}).end();

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

module.exports = ImageUploader;
