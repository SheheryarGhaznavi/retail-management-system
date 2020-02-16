import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import _ from 'lodash';

var totalPage = 1;
var perPage = 10;
var searchNoValue;
var searchNameValue;
var searchSupplierValue;
var searchRetailValue;
var searchSaleValue;
var searchSizeValue;
var searchDateValue;
var newFinalData = [];
var tempData = [];
var deleteImages = [];

class Manage extends Component {
    constructor() {
        super();
        this.state={
            query:'',
            finalData:[],
            rawData:[],
            searchData:[],
            paginate:[],
            suppliers:[],
            images:[],
            imagesCount:'',
            tempImages:[],
            currentPage:1,
            order:"no",
            currentOrder:"no",
            asc:true,
            prev:null,
            next:null,
            currentImage:'',

            id:'',
            name:'',
            manufacture:'',
            supplier:'',
            retail:'',
            sale:'',
            size:'',
            detail:''
            
        }
        this.search = this.search.bind(this);
        this.main = this.main.bind(this);
        this.image = this.image.bind(this);
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
        if(searchSupplierValue){
            var result=[];
            tempData.forEach(function(person){
                if(person.supplier.toString().toLowerCase().indexOf(searchSupplierValue)!=-1)
                result.push(person);
            });
            tempData = result ;
        }
        if(searchRetailValue){
            var result=[];
            tempData.forEach(function(person){
                if(person.retail.toString().toLowerCase().indexOf(searchRetailValue)!=-1)
                result.push(person);
            });
            tempData = result ;
        }
        if(searchSaleValue){
            var result=[];
            tempData.forEach(function(person){
                if(person.sale.toString().toLowerCase().indexOf(searchSaleValue)!=-1)
                result.push(person);
            });
            tempData = result ;
        }
        if(searchSizeValue){
            var result=[];
            tempData.forEach(function(person){
                if(person.size.toString().toLowerCase().indexOf(searchSizeValue)!=-1)
                result.push(person);
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
    searchNo(value){
        searchNoValue = value;
        console.log(searchNoValue);
        this.search();
    }
    searchName(value){
        searchNameValue = value;
        this.search();
    }
    searchSupplier(value){
        searchSupplierValue = value;
        this.search();
    }
    searchRetail(value){
        searchRetailValue = value;
        this.search();
    }
    searchSale(value){
        searchSaleValue = value;
        this.search();
    }
    searchSize(value){
        searchSizeValue = value;
        this.search();
    }
    searchDate(value){
        searchDateValue = value;
        this.search();
    }
    retail(value){
        if (parseInt(value) > 9999999999) {
            $(ReactDOM.findDOMNode(this.refs.updateProduct)).attr( "disabled", "disabled" );
            NotificationManager.error('Retail Price Not Valid', 'Error');
        }
        else if (parseInt(value) > parseInt(this.state.sale)) {
            $(ReactDOM.findDOMNode(this.refs.updateProduct)).attr( "disabled", "disabled" );
            NotificationManager.error('Retail Price Cannot be greater than Sale Price', 'Error');
        }
        else {
            $(ReactDOM.findDOMNode(this.refs.updateProduct)).removeAttr( "disabled", "disabled" );
        }
    }
    sale(value){
        if (parseInt(value) > 9999999999) {
            $(ReactDOM.findDOMNode(this.refs.updateProduct)).attr( "disabled", "disabled" );
            NotificationManager.error('Sale Price Not Valid', 'Error');
        }
        else if (parseInt(this.state.retail) > parseInt(value)) {
            $(ReactDOM.findDOMNode(this.refs.updateProduct)).attr( "disabled", "disabled" );
            NotificationManager.error('Retail Price Cannot be greater than Sale Price', 'Error');
        } 
        else {
            $(ReactDOM.findDOMNode(this.refs.updateProduct)).removeAttr( "disabled", "disabled" );
        }
    }
    perPage(value){
        totalPage = 1;
        perPage = value;
        this.main();
    }
    main(){
        axios.get('/api/product/get').then(res => {
            if(res.status === 200){
                newFinalData = res.data; tempData = res.data;
                this.setState({searchData: res.data, rawData: res.data});
            }
            if (newFinalData.length < perPage) {
                var paginate=[];
                paginate.push(1);
                this.setState({ paginate: paginate });
            } else {
                totalPage = Math.ceil(this.state.rawData.length / perPage);
                var abc = [];
                for (let index = 0; index < perPage; index++) {
                    abc.push(this.state.rawData[index]);
                }
                newFinalData = abc ;
                var paginate=[];
                for (let index = 0; index < totalPage; index++) {
                    paginate.push(index+1);
                    if (index+1 == 5) {
                        break;
                    }
                }
                this.setState({ paginate: paginate });
                if (this.state.currentPage > 1) {
                    this.pagination(this.state.currentPage);
                }
            }
        });
    }
    updateGet(id){
        this.setState({id:id});
        axios.get('/api/product/getSingle/'+id).then(res => {
            if(res.status === 200){
                this.setState({name: res.data.name,manufacture: res.data.manufacture,supplier:res.data.supplier,
                                retail:res.data.retail,sale:res.data.sale,size:res.data.size, detail:res.data.detail});
                if(res.data.supplier == "Shoe Club"){
                    var temp = [];
                    temp.push("Shoe Club");temp.push("Gift Shop");
                    this.setState({suppliers:temp});
                }
                else{
                    var temp = [];
                    temp.push("Gift Shop");temp.push("Shoe Club");
                    this.setState({suppliers:temp});
                }
            }
        });
        $(ReactDOM.findDOMNode(this.refs.updateModal)).modal('show');
    }
    updateAdd(){
        $(ReactDOM.findDOMNode(this.refs.add)).attr( "disabled", "disabled" );
        $(ReactDOM.findDOMNode(this.refs.load)).addClass("icon-spinner4 spinner" );
        if (!this.state.name) {
            NotificationManager.error('Insert Name', 'Error');
            $(ReactDOM.findDOMNode(this.refs.add)).removeAttr( "disabled", "disabled" );
            $(ReactDOM.findDOMNode(this.refs.load)).removeClass("icon-spinner4 spinner" );
        } else if (!this.state.manufacture) {
            NotificationManager.error('Insert Manufacture', 'Error');
            $(ReactDOM.findDOMNode(this.refs.add)).removeAttr( "disabled", "disabled" );
            $(ReactDOM.findDOMNode(this.refs.load)).removeClass("icon-spinner4 spinner" );
        } else if (!this.state.supplier) {
            NotificationManager.error('Insert Suppier', 'Error');
            $(ReactDOM.findDOMNode(this.refs.add)).removeAttr( "disabled", "disabled" );
            $(ReactDOM.findDOMNode(this.refs.load)).removeClass("icon-spinner4 spinner" );
        } else if (!this.state.retail) {
            NotificationManager.error('Insert Retail', 'Error');
            $(ReactDOM.findDOMNode(this.refs.add)).removeAttr( "disabled", "disabled" );
            $(ReactDOM.findDOMNode(this.refs.load)).removeClass("icon-spinner4 spinner" );
        } else if (!this.state.sale) {
            NotificationManager.error('Insert Sale', 'Error');
            $(ReactDOM.findDOMNode(this.refs.add)).removeAttr( "disabled", "disabled" );
            $(ReactDOM.findDOMNode(this.refs.load)).removeClass("icon-spinner4 spinner" );
        } else if (!this.state.size) {
            NotificationManager.error('Insert Size', 'Error');
            $(ReactDOM.findDOMNode(this.refs.add)).removeAttr( "disabled", "disabled" );
            $(ReactDOM.findDOMNode(this.refs.load)).removeClass("icon-spinner4 spinner" );
        } else if (!this.state.detail) {
            NotificationManager.error('Insert Detail', 'Error');
            $(ReactDOM.findDOMNode(this.refs.add)).removeAttr( "disabled", "disabled" );
            $(ReactDOM.findDOMNode(this.refs.load)).removeClass("icon-spinner4 spinner" );
        } else {
            var post = new URLSearchParams();
            post.append('name', this.state.name);
            post.append('manufacture', this.state.manufacture);
            post.append('supplier', this.state.supplier);
            post.append('retail', this.state.retail);
            post.append('sale', this.state.sale);
            post.append('size', this.state.size);
            post.append('detail', this.state.detail);
            axios.post('/api/product/update/'+this.state.id,post).then(res => {
                if(res.status === 200){
                    NotificationManager.success('Product has been update', 'Updated');
                    $(ReactDOM.findDOMNode(this.refs.add)).removeAttr( "disabled", "disabled" );
                    $(ReactDOM.findDOMNode(this.refs.load)).removeClass("icon-spinner4 spinner" );
                    setTimeout(()=> { $(ReactDOM.findDOMNode(this.refs.updateModal)).modal('hide'); },1000);
                    this.main();
                }
            });
        }
    }
    imageUpdate(id){
        deleteImages = [];
        this.setState({id,id});
        axios.get('/api/product/getAllImage/'+id).then(res => {
            if(res.status === 200){
                this.setState({images: res.data,imagesCount:res.data.length});
            }
        });
        $(ReactDOM.findDOMNode(this.refs.imageUpdateModal)).modal('show');
    }
    imageUpdateAdd(){
        var post = new URLSearchParams();
        console.log(this.state.imagesCount);
        console.log(deleteImages.length);
        if (this.state.imagesCount == deleteImages.length && this.state.tempImages.length < 1) {
            NotificationManager.error('Insert Atleast 1 image', 'Warning');
        } else {
            post.append('images', this.state.tempImages);
            post.append('deleteImages',deleteImages);
            axios.post('/api/product/updateImage/'+this.state.id,post).then(res => {
                if(res.status === 200){
                    NotificationManager.success('Product Images has been update', 'Updated');
                    $(ReactDOM.findDOMNode(this.refs.add)).removeAttr( "disabled", "disabled" );
                    $(ReactDOM.findDOMNode(this.refs.load)).removeClass("icon-spinner4 spinner" );
                    setTimeout(()=> { $(ReactDOM.findDOMNode(this.refs.updateModal)).modal('hide'); },1000);
                    this.main();
                }
            });
        }
    }
    deleteImage(id,index){
        var temp = this.state.images;
        temp.splice(index,1);
        this.setState({images:temp});
        deleteImages.push(id);
        console.log(deleteImages);
    }
    deleteTempImage(index){
        var temp = this.state.tempImages;
        temp.splice(index,1);
        this.setState({tempImages:temp});
    }
    nonActive(id){
        axios.get('/api/product/nonActive/'+id).then(res => {
            if(res.status === 200){
                NotificationManager.success('Product has been non-active', 'Non-Activated');
                this.main();
            }
        });
    }
    active(id){
        axios.get('/api/product/active/'+id).then(res => {
            if(res.status === 200){
                NotificationManager.success('Product has been active', 'Activated');
                this.main();
            }
        });
    }
    delete(id){
        axios.get('/api/product/delete/'+id).then(res => {
            if(res.status === 200){
                NotificationManager.success('Product has been deleted', 'Deleted');
                //$(ReactDOM.findDOMNode(this.refs.productTable)).hide('slow');
                this.main();
            }
        });
    }
    componentDidMount(){
        $(ReactDOM.findDOMNode(this.refs.media)).fancybox({
        padding: 3
        });
        $(ReactDOM.findDOMNode(this.refs.switch)).uniform({
            radioClass: 'choice'
        });
        // $(ReactDOM.findDOMNode(this.refs.file)).uniform({
        //     fileButtonClass: 'action btn bg-blue'
        // });
        // $(function() {
            
        //         // Switchery toggles
        //         var elems = Array.prototype.slice.call(document.querySelectorAll($(ReactDOM.findDOMNode(this.refs.switch))));
            
        //         elems.forEach(function(html) {
        //             var switchery = new Switchery(html);
        //         });
        //     });
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
    file() {
        $(ReactDOM.findDOMNode(this.refs.file)).click(); 
    }
    image(evt) {
        var self = this;
        var file = evt.target.files[0];
        var reader  = new FileReader();
        var temp = self.state.tempImages;
        self.setState({imageName:file.name});
        reader.onload = function(upload) {
            temp.push(upload.target.result);
            self.setState({tempImages:temp});
        };
        reader.readAsDataURL(file);
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

                    {this.state.currentOrder == "supplier" ? this.state.asc ? <th onClick={this.sort.bind(this,"supplier")} ><a>Suppier</a><i style={{float:"right",marginTop:5}} className="icon-arrow-down15"></i></th>
                    : <th onClick={this.sort.bind(this,"supplier")} ><a>Suppier</a><i style={{float:"right",marginTop:5}} className="icon-arrow-up15"></i></th>
                    : <th onClick={this.sort.bind(this,"supplier")} ><a>Suppier</a></th>}

                    {this.state.currentOrder == "retail" ? this.state.asc ? <th onClick={this.sort.bind(this,"retail")} ><a>Retail</a><i style={{float:"right",marginTop:5}} className="icon-arrow-down15"></i></th>
                    : <th onClick={this.sort.bind(this,"retail")} ><a>Retail</a><i style={{float:"right",marginTop:5}} className="icon-arrow-up15"></i></th>
                    : <th onClick={this.sort.bind(this,"retail")} ><a>Retail</a></th>}

                    {this.state.currentOrder == "sale" ? this.state.asc ? <th onClick={this.sort.bind(this,"sale")} ><a>Sale</a><i style={{float:"right",marginTop:5}} className="icon-arrow-down15"></i></th>
                    : <th onClick={this.sort.bind(this,"sale")} ><a>Sale</a><i style={{float:"right",marginTop:5}} className="icon-arrow-up15"></i></th>
                    : <th onClick={this.sort.bind(this,"sale")} ><a>Sale</a></th>}

                    {this.state.currentOrder == "stock" ? this.state.asc ? <th onClick={this.sort.bind(this,"stock")} ><a>Stock</a><i style={{float:"right",marginTop:5}} className="icon-arrow-down15"></i></th>
                    : <th onClick={this.sort.bind(this,"stock")} ><a>Stock</a><i style={{float:"right",marginTop:5}} className="icon-arrow-up15"></i></th>
                    : <th onClick={this.sort.bind(this,"stock")} ><a>Stock</a></th>}
                    
                    {this.state.currentOrder == "size" ? this.state.asc ? <th onClick={this.sort.bind(this,"size")} ><a>Size</a><i style={{float:"right",marginTop:5}} className="icon-arrow-down15"></i></th>
                    : <th onClick={this.sort.bind(this,"size")} ><a>Size</a><i style={{float:"right",marginTop:5}} className="icon-arrow-up15"></i></th>
                    : <th onClick={this.sort.bind(this,"size")} ><a>Size</a></th>}

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
                    <td><input type="text"  onChange={(e) => this.searchSupplier(e.target.value)}  className="form-control" /></td>
                    <td><input type="number"  onChange={(e) => this.searchRetail(e.target.value)}  className="form-control" /></td>
                    <td><input type="number"  onChange={(e) => this.searchSale(e.target.value)}  className="form-control" /></td>
                    <td></td>
                    <td><input type="text"  onChange={(e) => this.searchSize(e.target.value)}  className="form-control" /></td>
                    <td><input type="text"  onChange={(e) => this.searchDate(e.target.value)}  className="form-control" /></td>
                </tr>
            </thead>
            <tbody>
            { newFinalData.map((c,i) => {
                         return(
                <tr ref={"productTable"} key={i}>
                    <td>PD{c.no}</td>
                    <td>{c.name}</td>
                    <td>{c.supplier}</td>
                    <td>{c.retail}</td>
                    <td>{c.sale}</td>
                    <td>{c.stock}</td>
                    <td>{c.size}</td>
                    <td>{c.created_on}</td>
                    <td><a onClick={this.imageUpdate.bind(this,c.id)}><img src={"/product/"+c.manufacture} className="img-circle"  style={{height: 50,width: 50}} /></a></td>
                    { c.status == '0' ? <td><span className="label label-danger">Non-Active</span></td>
                    : <td><span className="label label-success">Active</span></td> }
                    <td className="text-center">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>

                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={this.updateGet.bind(this,c.id)}><i className="icon-pencil7"></i> Update Product</a></li>
                                    {c.status ? <li><a onClick={this.nonActive.bind(this,c.id)}><i className="icon-cross2"></i> Non-Active</a></li>
                                    : <li><a onClick={this.active.bind(this,c.id)}><i className="icon-checkmark4"></i> Active</a></li> }
                                    
                                    <li><a onClick={this.delete.bind(this,c.id)}><i className="icon-trash"></i> Delete</a></li>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>
            )})}
            </tbody>
            {/* <tfoot>
                <tr>
                    <td><input type="number"  onChange={(e) => this.searchNo(e.target.value)}  className="form-control" /></td>
                    <td><input type="text"  onChange={(e) => this.searchName(e.target.value)}  className="form-control" /></td>
                    <td><input type="text"  onChange={(e) => this.searchSupplier(e.target.value)}  className="form-control" /></td>
                    <td><input type="number"  onChange={(e) => this.searchManufacture(e.target.value)}  className="form-control" /></td>
                    <td><input type="number"  onChange={(e) => this.searchRetail(e.target.value)}  className="form-control" /></td>
                    <td><input type="text"  onChange={(e) => this.searchSale(e.target.value)}  className="form-control" /></td>
                    <td><input type="text"  onChange={(e) => this.searchSize(e.target.value)}  className="form-control" /></td>
                    <td><input type="text"  onChange={(e) => this.searchDate(e.target.value)}  className="form-control" /></td>
                </tr>
            </tfoot> */}
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





                    <div ref={"updateModal"} className="modal fade">
						<div className="modal-dialog modal-full">
							<div className="modal-content">
								<div className="modal-header bg-primary">
									<button type="button" className="close" data-dismiss="modal">&times;</button>
									<h5 className="modal-title">Product Update</h5>
								</div>

								<div className="modal-body">
                                        <div className="form-group">
											<div className="row">
												<div className="col-sm-4">
													<label>Name</label>
													<input type="text" maxLength="200" value={this.state.name} onChange={(e) => this.setState({name : e.target.value})} placeholder="Enter product name" className="form-control"/>
												</div>

												<div className="col-sm-4">
													<label>Manufacture</label>
													<input type="text" maxLength="200" value={this.state.manufacture} onChange={(e) => this.setState({manufacture : e.target.value})} placeholder="Enter Product Manufacture Country " className="form-control"/>
												</div>

                                                <div className="col-sm-4">
													<label>Supplier</label>
													<select className="form-control" onChange={(e) => this.setState({supplier : e.target.value})}  data-live-search="true" data-width="100%">
                                                            { this.state.suppliers.map((c,i) => {
                                                            return(
															<option  value={c}>{c}</option>
                                                            )})}
													</select>
												</div>
											</div>
										</div>

										<div className="form-group">
											<div className="row">
												<div className="col-sm-4">
													<label>Retail Price</label>
													<input type="number" maxLength="11" value={this.state.retail} onChange={(e) => {this.setState({retail : e.target.value}) ; this.retail(e.target.value)}} placeholder="Enter Retail Price" className="form-control"/>
												</div>

												<div className="col-sm-4">
													<label>Sale Price</label>
													<input type="number" maxLength="11" value={this.state.sale} onChange={(e) => {this.setState({sale : e.target.value}); this.sale(e.target.value)}} placeholder="Enter Sale Price" className="form-control"/>
												</div>

                                                <div className="col-sm-4">
													<label>Size</label>
													<input type="text" maxLength="200" value={this.state.size} onChange={(e) => this.setState({size : e.target.value})} placeholder="Enter Product Size" className="form-control"/>
												</div>
											</div>
										</div>

										<div className="form-group">
											<div className="row">
												<div className="col-sm-12">
													<label>Detail</label>
                                                        <textarea rows="5" cols="5" maxLength="5000" value={this.state.detail} onChange={(e) => this.setState({detail : e.target.value})} className="form-control" id="detail" placeholder="Enter Product Details"></textarea>
												</div>
											</div>
										</div>
								</div>

								<div className="modal-footer">
									<button type="button" className="btn btn-link" data-dismiss="modal">Close</button>
									<button type="button" ref={"updateProduct"} onClick={this.updateAdd.bind(this)} className="btn btn-primary">Update<i ref={"load"} className="position-right"></i></button>
								</div>
							</div>
						</div>
					</div>

                    <div ref={"imageUpdateModal"} className="modal fade">
						<div className="modal-dialog modal-full">
							<div className="modal-content">
								<div className="modal-header bg-primary">
									<button type="button" className="close" data-dismiss="modal">&times;</button>
									<h5 className="modal-title">Product Image Update</h5>
								</div>

								<div className="modal-body">
                                        <div className="form-group">
                                        <div className="row">
                                        { this.state.images.map((c,i) => {
                                        return(
                                        <div className="col-md-3">
                                            <div className="thumbnail">
                                                <div className="thumb">
                                                    <img style={{height:300}} src={"/product/"+c.image} alt=""/>
                                                    <div className="caption-overflow">
                                                        <span>
                                                            <a href={"/product/"+c.image} className="btn btn-flat border-white text-white btn-rounded btn-icon" data-popup="lightbox"><i className="icon-zoomin3"></i></a>
                                                            <a onClick={this.deleteImage.bind(this,c.id,i)} className="btn btn-flat border-white text-white btn-rounded btn-icon"><i className="icon-trash"></i></a>
                                                        </span>
                                                    </div>
                                                </div>
                
                                                <div className="panel-footer panel-footer-transparent">
                                                </div>
                                            </div>
                                        </div>
                                        )})}
                                        { this.state.tempImages.map((c,i) => {
                                        return(
                                        <div className="col-md-3">
                                            <div className="thumbnail">
                                                <div className="thumb">
                                                    <img style={{height:300}} src={c} alt=""/>
                                                    <div className="caption-overflow">
                                                        <span>
                                                            <a href={c} className="btn btn-flat border-white text-white btn-rounded btn-icon" data-popup="lightbox"><i className="icon-zoomin3"></i></a>
                                                            <a onClick={this.deleteTempImage.bind(this,i)} className="btn btn-flat border-white text-white btn-rounded btn-icon"><i className="icon-trash"></i></a>
                                                        </span>
                                                    </div>
                                                </div>
                
                                                <div className="panel-footer panel-footer-transparent">
                                                </div>
                                            </div>
                                        </div>
                                        )})}
                                        
                                    </div>
										</div>
								</div>

								<div className="modal-footer">
                                    <button type="button" style={{float:"left"}} onClick={this.file.bind(this)}  className="btn btn-primary">Browse</button>
                                    <input type="file" style={{display: 'none'}} ref={'file'} onChange={this.image} className="file-styled"/>
									<button type="button" className="btn btn-link" data-dismiss="modal">Close</button>
									<button type="button" ref={"add"} onClick={this.imageUpdateAdd.bind(this)} className="btn btn-primary">Update<i ref={"load"} className="position-right"></i></button>
								</div>
							</div>
						</div>
					</div>










        </div>
               );

    }
}
export default Manage

