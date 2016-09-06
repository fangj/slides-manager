require('./Customform.less');

class Customform extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.formData?{
            value:props.formData.value
        }:{};
    }

    render() {
        let me = this;
        return (
           <form className="html_editor" onSubmit={this.submit.bind(this)}>
                <textarea name="message" rows="10" cols="30" onChange={this.onChange.bind(this)} value={this.state.value}>
                </textarea>
                {this.props.children}
            </form>
        );
    }

    onChange(e){
        this.setState({value:e.target.value})
    }

    submit(e){
        e.preventDefault();
        // console.log(this.state.value);
        this.props.onSubmit({formData:{value:this.state.value}})
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        var state=nextProps.formData?{
            value:nextProps.formData.value
        }:{};
        this.setState(state);
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

module.exports = Customform;
