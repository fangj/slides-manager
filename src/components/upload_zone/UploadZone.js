require('./UploadZone.less');
var Dropzone = require('react-dropzone');
var agent = require('superagent-promise')(require('superagent'),Promise);

const defaultView=(props)=><div style={{fontSize:"120px",textAlign:"center"}}>+</div>

class UploadZone extends React.Component {


    static propTypes  ={
        view: React.PropTypes.element,
        url: React.PropTypes.string.isRequired,
        onUploaded:React.PropTypes.func.isRequired
    };


    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let me = this;
        const {view,url,onUploaded,...others}=this.props;
        const View=view||defaultView;
        return (
            <Dropzone onDrop={this.onDrop.bind(this)} {...others}>
              <View/>
            </Dropzone>
        );
    }

    onDrop(files) {
        let me=this;
        console.log('Received files: ', files);
        var file=files[0];
        if(!file){return;}
        const {url,onUploaded}=this.props;
        if(!onUploaded||typeof onUploaded !== 'function'){return;}
        agent.post(url)
        .attach('files',file,file.name)
        .on('progress', me.onProgress.bind(me))
        .then(res => {
            var result=res.body;
            file.url=result.url;
            onUploaded([file]);
        });
    }

    onProgress(e){

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

module.exports = UploadZone;
