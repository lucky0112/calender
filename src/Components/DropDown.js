import React from 'react';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';


const renderDropDownItems = (options) => (
    options.map((option) => {
        return <Option value={option.value} label={option.label} key={option.value}/>
    })
)

class RenderDropDown extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            selected: ''
        }
    }

    componentWillMount(){
        const { selectedValue, urlSelection } = this.props;
        this.setState({ selected: selectedValue && urlSelection });
    }

    componentWillReceiveProps(nextProps){
        if (this.props.selectedValue!==nextProps.urlSelection){
            this.setState({ selected: nextProps.urlSelection })
        }
    }

    render(){
        const { selected } = this.state;
        const { options, type, onChangeHandler } = this.props;
        return (
            <div>
                <Select 
                    label={`Select ${type}`} 
                    onChange={onChangeHandler(type)}
                    value={selected}
                >
                    {renderDropDownItems(options)}
                </Select>
                
            </div>
          );
    }
}

export default RenderDropDown;