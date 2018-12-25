import React from 'react';
import queryString from 'query-string';
import _get from 'lodash/get';
import Button from 'muicss/lib/react/button';
import { month, year } from '../Constants';
import RenderDropDown from './DropDown';
import CalenderGrid from './CalenderGrid';
import '../App.css';


class Calender extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            selectedMonth: new Date().getMonth(),
            selectedYear: new Date().getFullYear(),
            selectedDate: new Date().getDate()
        }
    }

    handleMonthSelection = (type) => (event) => {
        const { history } = this.props;
        this.setState({ selectedMonth: event.target.value },() => {
            history.push(`calender?month=${this.state.selectedMonth}&year=${this.state.selectedYear}`);
        })
    }

    handlerYearSelection = (type) => (event) => {
        const { history } = this.props;
        this.setState({ selectedYear: event.target.value }, () => {
            history.push(`calender?month=${this.state.selectedMonth}&year=${this.state.selectedYear}`);            
        })
    }
    
    nextMonthHandler = () => {
        const { history } = this.props;
        const { selectedMonth } = this.state;
        if (selectedMonth===11){
            this.setState({ selectedMonth: 0, selectedYear: this.state.selectedYear+1 },() => {
                history.push(`calender?month=${this.state.selectedMonth}&year=${this.state.selectedYear}`)
            })
            return
        }
        this.setState({ selectedMonth: this.state.selectedMonth+1 },() => {
            history.push(`calender?month=${this.state.selectedMonth}&year=${this.state.selectedYear}`)
        })
      };
    
    prevMonthHandler = () => {
        const { history } = this.props;
        const { selectedMonth } = this.state;
        if (selectedMonth===0){
            this.setState({ selectedMonth: 11, selectedYear: this.state.selectedYear-1 },() => {
                history.push(`calender?month=${this.state.selectedMonth}&year=${this.state.selectedYear}`)
            })
            return
        }
        this.setState({ selectedMonth: this.state.selectedMonth-1 },() => {
            history.push(`calender?month=${this.state.selectedMonth}&year=${this.state.selectedYear}`)
        })
      };

    handleDefault = () => {
        const { history } = this.props;
        const currentDate = new Date();
        this.setState({ selectedMonth: currentDate.getMonth(), 
            selectedYear: currentDate.getFullYear(), selectedDate: currentDate.getDate() },
        () => {
            history.push(`calender?month=${this.state.selectedMonth}&year=${this.state.selectedYear}`)
        })
    }

    render(){
        const { location } = this.props;
        const { selectedMonth, selectedYear, selectedDate } = this.state;
        const values = queryString.parse(location.search);
        const urlMonth = _get(values,'month',selectedMonth);
        const urlYear = _get(values,'year',selectedYear);
        return(
            <div className="App">
                <div className="year-month-selection">
                    <RenderDropDown
                        options={month}
                        type='Month'
                        selectedValue={selectedMonth}
                        onChangeHandler={this.handleMonthSelection}
                        urlSelection={urlMonth}
                    />
                    <RenderDropDown
                        options={year}
                        type='Year'
                        selectedValue={selectedYear}
                        onChangeHandler={this.handlerYearSelection}
                        urlSelection={urlYear}
                    />
                </div>
                <div>
                    <CalenderGrid
                        location={location}
                        selectedMonth={selectedMonth}
                        selectedYear={selectedYear}
                        selectedDate={selectedDate}
                        nextMonthHandler={this.nextMonthHandler}
                        prevMonthHandler={this.prevMonthHandler}

                    />
                </div>
                <div>
                    <Button variant="flat" color="primary" onClick={this.handleDefault}>
                        Current Date
                    </Button>
                </div>

            </div>
        )
    }
}

export default Calender;