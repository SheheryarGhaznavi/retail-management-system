import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import _ from 'lodash';

var totalPage = 1;
var perPage = 10;
var searchNoValue;
var searchNameValue;
var searchQuantityValue;
var searchProfitValue;
var searchDateValue;
var newFinalData = [];
var tempData = [];

class Manage extends Component {
    constructor() {
        super();
        this.state={
            query:'',
            finalData:[],
            rawData:[],
            searchData:[],
            paginate:[],
            currentPage:1,
            order:"no",
            currentOrder:"no",
            asc:true,
            prev:null,
            next:null,
            
        }
        this.search = this.search.bind(this);
        this.main = this.main.bind(this);
    }

    search(){
        tempData = this.state.rawData;
        if (searchNoValue) {
            var result=[];
            tempData.forEach(function(person){
                if(person.no.toString().toLowerCase().indexOf(searchNoValue)!=-1)
                result.push(person);
            });
            tempData = result ;
        }
        if(searchNameValue){
            var result=[];
            tempData.forEach(function(person){
                if(person.name.toString().toLowerCase().indexOf(searchNameValue)!=-1)
                result.push(person);
            });
            tempData = result ;
        }
        if(searchQuantityValue){
            var result=[];
            tempData.forEach(function(person){
                if(person.quantity.toString().toLowerCase().indexOf(searchQuantityValue)!=-1)
                result.push(person);
            });
            tempData = result ;
        }
        if(searchProfitValue){
            var result=[];
            tempData.forEach(function(person){
                if (person.profit) {
                    if(person.profit.toString().toLowerCase().indexOf(searchProfitValue)!=-1)
                    result.push(person);
                }
            });
            tempData = result ;
        }
        if(searchDateValue){
            var result=[];
            tempData.forEach(function(person){
                if(person.created_on.toString().toLowerCase().indexOf(searchDateValue)!=-1)
                result.push(person);
            });
            tempData = result ;
        }

        if (tempData.length < perPage) {
            newFinalData = tempData ;
            var paginate=[];
            paginate.push(1);
            totalPage = 1;
            this.setState({currentPage:'1' });
            this.setState({ paginate: paginate });
            console.log(newFinalData);
        } else {
            totalPage = Math.ceil(tempData.length / perPage);
            var abc = [];
            for (let index = 0; index < perPage; index++) {
                abc.push(tempData[index]);
            }
            newFinalData = abc ;
            this.setState({currentPage:'1' });
            var paginate=[];
            for (let index = 0; index < totalPage; index++) {
                paginate.push(index+1);
                if (index+1 == 5) {
                    break;
                }
            }
            this.setState({ paginate: paginate });
        }
    }
    searchNo(value){
        searchNoValue = value;
        this.search();
    }
    searchName(value){
        searchNameValue = value;
        this.search();
    }
    searchQuantity(value){
        searchQuantityValue = value;
        this.search();
    }
    searchProfit(value){
        searchProfitValue = value;
        this.search();
    }
    searchDate(value){
        searchDateValue = value;
        this.search();
    }
    perPage(value){
        totalPage = 1;
        perPage = value;
        this.main();
    }
    main(){
        axios.get('/api/order/get').then(res => {
            if(res.status === 200){
                newFinalData = res.data; tempData = res.data;
                this.setState({searchData: res.data, rawData: res.data});
            }
            var temp = this.state.currentPage;
            this.search();
            if (temp > 1) {
                this.setState({currentPage:temp});
                this.pagination(temp);
            }
            // if (newFinalData.length < perPage) {
            //     var paginate=[];
            //     paginate.push(1);
            //     this.setState({ paginate: paginate });
            // } else {
            //     totalPage = Math.ceil(this.state.rawData.length / perPage);
            //     var abc = [];
            //     for (let index = 0; index < perPage; index++) {
            //         abc.push(this.state.rawData[index]);
            //     }
            //     newFinalData = abc ;
            //     var paginate=[];
            //     for (let index = 0; index < totalPage; index++) {
            //         paginate.push(index+1);
            //         if (index+1 == 5) {
            //             break;
            //         }
            //     }
            //     this.setState({ paginate: paginate });
            //     var temp = this.state.currentPage;
            //     this.search();
            //     if (temp > 1) {
            //         this.setState({currentPage:temp});
            //         this.pagination(temp);
            //     }
            // }
        });
    }
    notDelivered(id){
        axios.get('/api/order/notDelivered/'+id).then(res => {
            if(res.status === 200){
                NotificationManager.success('Order has been Not Delivered', 'Not Delivered');
                this.main();
            }
        });
    }
    delivered(id){
        axios.get('/api/order/delivered/'+id).then(res => {
            if(res.status === 200){
                NotificationManager.success('Order has been Delivered', 'Delivered');
                this.main();
            }
        });
    }
    delete(id){
        axios.get('/api/order/delete/'+id).then(res => {
            if(res.status === 200){
                NotificationManager.success('Order has been deleted', 'Deleted');
                this.main();
            }
        });
    }
    componentDidMount(){
	}
    componentWillMount(){
        this.main();
    }
    sort(value){
        if (this.state.order != value) {
            tempData = _.orderBy(tempData, [value],['asc']);
            this.setState({order:value,currentOrder:value,asc:true });
            if (tempData.length < perPage) {
                var paginate=[];
                paginate.push(1);
                this.setState({currentPage:'1' });
                this.setState({ paginate: paginate });
                newFinalData = tempData ;
            } else {
                totalPage = Math.round(tempData.length / perPage);
                var abc = [];
                for (let index = 0; index < perPage; index++) {
                    abc.push(tempData[index]);
                }
                newFinalData = abc ;
                this.setState({currentPage:'1' });
                var paginate=[];
                for (let index = 0; index < totalPage; index++) {
                    paginate.push(index+1);
                    if (index+1 == 5) {
                        break;
                    }
                }
                this.setState({ paginate: paginate });
            }
        } else {
            this.setState({order:"",currentOrder:value,asc:false });
            tempData = _.orderBy(tempData, [value],['desc']);
            if (tempData.length < perPage) {
                var paginate=[];
                paginate.push(1);
                this.setState({currentPage:'1' });
                this.setState({ paginate: paginate });
                newFinalData = tempData ;
            } else {
                totalPage = Math.round(tempData.length / perPage);
                var abc = [];
                for (let index = 0; index < perPage; index++) {
                    abc.push(tempData[index]);
                }
                newFinalData = abc ;
                this.setState({currentPage:'1' });
                var paginate=[];
                for (let index = 0; index < totalPage; index++) {
                    paginate.push(index+1);
                    if (index+1 == 5) {
                        break;
                    }
                }
                this.setState({ paginate: paginate });
            }
        }
        
    }
    pagination(value){
        var abc = [];
        var initial = perPage*(value-1);
        for (let index = initial; index < perPage*value; index++) {
            if (tempData[index]) {
                abc.push(tempData[index]);
            }
            else{
                break;
            }
        }
        newFinalData = abc;
        this.setState({currentPage:value });
       // console.log(this.state.currentPage+"  "+totalPage);
        if (value == this.state.paginate[this.state.paginate.length-2] || value == this.state.paginate[this.state.paginate.length-1]) {
            if (totalPage > this.state.paginate[this.state.paginate.length-1]) {
                var paginate=[];
                for (let index = this.state.paginate[this.state.paginate.length-3]; index < this.state.paginate[this.state.paginate.length-3]+5; index++) {
                    paginate.push(index);
                    if (index == totalPage) {
                        break;
                    }
                }
                this.setState({ paginate: paginate });
            }
        }
        else if(value == this.state.paginate[0]){
            if (value > 1) {
                var paginate=[];
                for (let index = this.state.paginate[1]-5; index < this.state.paginate[1]; index++) {
                    
                    if (index > 0) {
                        paginate.push(index);
                    }
                }
                this.setState({ paginate: paginate });
            }
        }
    }






    render() {
        return (
            <div className="table-responsive" style={{overflowX:"unset"}}>
                        <ul className="icons-list" style={{float:"right",padding:10,paddingRight:40}}>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                Per Page ({perPage})   <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={this.perPage.bind(this,10)} ><i className="icon-menu"></i> 10</a></li>
                                    <li><a onClick={this.perPage.bind(this,20)} ><i className="icon-menu"></i> 20</a></li>
                                    <li><a onClick={this.perPage.bind(this,50)} ><i className="icon-menu"></i> 50</a></li>
                                </ul>
                            </li>
                        </ul>
                        <NotificationContainer/>
            <table className="table">
            <thead>
                <tr style={{fontSize:12}}>
                    {this.state.currentOrder == "no" ? this.state.asc ? <th onClick={this.sort.bind(this,"no")}><a>No</a><i style={{float:"right",marginTop:5}} className="icon-arrow-down15"></i></th>
                    : <th onClick={this.sort.bind(this,"no")}><a>No</a><i style={{float:"right",marginTop:5}} className="icon-arrow-up15"></i></th>
                    : <th onClick={this.sort.bind(this,"no")}><a>No</a></th>}

                    {this.state.currentOrder == "name" ? this.state.asc ? <th onClick={this.sort.bind(this,"name")} ><a>Name</a><i style={{float:"right",marginTop:5}} className="icon-arrow-down15"></i></th>
                    : <th onClick={this.sort.bind(this,"name")} ><a>Name</a><i style={{float:"right",marginTop:5}} className="icon-arrow-up15"></i></th> 
                    : <th onClick={this.sort.bind(this,"name")} ><a>Name</a></th>}

                    {this.state.currentOrder == "quantity" ? this.state.asc ? <th onClick={this.sort.bind(this,"quantity")} ><a>Quantity</a><i style={{float:"right",marginTop:5}} className="icon-arrow-down15"></i></th>
                    : <th onClick={this.sort.bind(this,"quantity")} ><a>Quantity</a><i style={{float:"right",marginTop:5}} className="icon-arrow-up15"></i></th>
                    : <th onClick={this.sort.bind(this,"quantity")} ><a>Quantity</a></th>}

                    {this.state.currentOrder == "profit" ? this.state.asc ? <th onClick={this.sort.bind(this,"profit")} ><a>Profit</a><i style={{float:"right",marginTop:5}} className="icon-arrow-down15"></i></th>
                    : <th onClick={this.sort.bind(this,"profit")} ><a>Profit</a><i style={{float:"right",marginTop:5}} className="icon-arrow-up15"></i></th>
                    : <th onClick={this.sort.bind(this,"profit")} ><a>Profit</a></th>}

                    {this.state.currentOrder == "created_on" ? this.state.asc ? <th style={{paddingLeft:5,paddingRight:5}} onClick={this.sort.bind(this,"created_on")} ><a>Added Date</a><i style={{float:"right",marginTop:5}} className="icon-arrow-down15"></i></th>
                    : <th style={{paddingLeft:5,paddingRight:5}} onClick={this.sort.bind(this,"created_on")} ><a>Added Date</a><i style={{float:"right",marginTop:5}} className="icon-arrow-up15"></i></th>
                    : <th style={{paddingLeft:5,paddingRight:5}} onClick={this.sort.bind(this,"created_on")} ><a>Added Date</a></th>}
                    <th>Image</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                </tr>
                <tr>
                    <td><input type="number"  onChange={(e) => this.searchNo(e.target.value)}  className="form-control" /></td>
                    <td><input type="text"  onChange={(e) => this.searchName(e.target.value)}  className="form-control" /></td>
                    <td><input type="text"  onChange={(e) => this.searchQuantity(e.target.value)}  className="form-control" /></td>
                    <td><input type="number"  onChange={(e) => this.searchProfit(e.target.value)}  className="form-control" /></td>
                    <td><input type="text"  onChange={(e) => this.searchDate(e.target.value)}  className="form-control" /></td>
                </tr>
            </thead>
            <tbody>
            { newFinalData.map((c,i) => {
                         return(
                <tr ref={"productTable"} key={i}>
                    <td>PD{c.no}</td>
                    <td>{c.name}</td>
                    <td>{c.quantity}</td>
                    { c.status == '2' ? <td>None</td>
                    : <td>{c.profit}</td> }
                    <td>{c.created_on}</td>
                    <td><div style={{height: 50,width: 50,marginBottom:0}} className="thumbnail">
                                                <div className="thumb">
                                                    <img src={"/product/"+c.manufacture} alt=""/>
                                                    <div className="caption-overflow">
                                                        <span>
                                                            <a href={"/product/"+c.manufacture} className="btn btn-flat" data-popup="lightbox"><i className="icon-zoomin3"></i></a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div></td>
                    { c.status == '0' ? <td><span className="label label-info">Pending</span></td>
                    : c.status == '1' ? <td><span className="label label-success">Delivered</span></td>
                    : <td><span className="label label-danger">Not-Delivered</span></td> }
                    <td className="text-center">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                { c.status == '0' ? 
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={this.delivered.bind(this,c.id)}><i className="icon-checkmark4"></i> Delivered</a></li>
                                    <li><a onClick={this.notDelivered.bind(this,c.id)}><i className="icon-cross2"></i>Not Delivered</a></li>
                                    <li><a onClick={this.delete.bind(this,c.id)}><i className="icon-trash"></i> Delete</a></li>
                                </ul>
                                : c.status == '1' ? 
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={this.notDelivered.bind(this,c.id)}><i className="icon-cross2"></i>Not Delivered</a></li>
                                    <li><a onClick={this.delete.bind(this,c.id)}><i className="icon-trash"></i> Delete</a></li>
                                </ul>
                                : <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={this.delivered.bind(this,c.id)}><i className="icon-checkmark4"></i> Delivered</a></li>
                                    <li><a onClick={this.delete.bind(this,c.id)}><i className="icon-trash"></i> Delete</a></li>
                                </ul> }
                                
                            </li>
                        </ul>
                    </td>
                </tr>
            )})}
            </tbody>
        </table>
            <div className=" panel panel-body  text-center">
               <ul className="pagination pagination-flat pagination-rounded">
               { this.state.currentPage == '1' ? <li className="disabled"><a >&lsaquo;</a></li>
                : <li><a onClick={this.pagination.bind(this,this.state.currentPage-1)} >&lsaquo;</a></li>}
                { this.state.paginate.map((c,i) => {
                         return(
                             this.state.currentPage == c ?
                <li key={i} className="active"><a onClick={this.pagination.bind(this,c)}>{c}</a></li>
                :
                <li><a onClick={this.pagination.bind(this,c)}>{c}</a></li>
                         )})}
                { this.state.currentPage == totalPage ? <li className="disabled"><a >&rsaquo;</a></li>
                : <li><a onClick={this.pagination.bind(this,this.state.currentPage-1+2)} >&rsaquo;</a></li>}
                </ul>
            </div>

        </div>
               );

    }
}
export default Manage

