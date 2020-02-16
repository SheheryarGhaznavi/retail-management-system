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
            <div>

                    {/* <!-- Detached content --> */}
                    <div className="container-detached">
                        <div className="content-detached">

                            {/* <!-- Grid --> */}
                            <div className="row">
                                <div className="panel panel-flat">

                                    <div className="category-content">
                                        <div className="has-feedback has-feedback-left form-group">
                                            <input type="search" className="form-control" placeholder="Search Product..."/>
                                            <div className="form-control-feedback">
                                                <i className="icon-search4 text-size-small text-muted"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">

                                    <div className="panel">
                                        <div className="panel-body">
                                            <div className="thumb thumb-fixed">
                                                <img src="/assets/images/demo/products/1.jpg" alt=""/>
                                            </div>
                                        </div>

                                        <div className="panel-body panel-body-accent text-center">
                                            <h6 className="text-semibold no-margin"><a href="#" className="text-default">Fathom Backpack</a></h6>

                                            <ul className="list-inline list-inline-separate mb-10">
                                                <li><a href="#" className="text-muted">Men's Accessories</a></li>
                                            </ul>

                                            <h3 className="no-margin text-semibold">$49.99</h3>
                                            <button type="button" className="btn bg-teal-400">Add to Purchase</button>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            {/* <!-- /grid --> */}

                        </div>
                    </div>
                    {/* <!-- /detached content --> */}

                    {/* <!-- Detached sidebar --> */}
                    <div className="sidebar-detached">
                        <div className="sidebar sidebar-default sidebar-separate">
                            <div className="sidebar-content">

                                {/* <!-- Categories --> */}
                                <div className="sidebar-category">
                                    <div className="category-title">
                                        <i className="icon-cart-add position-left"></i> <span>Purchase Products</span>
                                        <ul className="icons-list">
                                            <li>
                                                <a href="#" data-action="collapse"></a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="category-content no-padding">
                                    <div className="table-responsive">
							<table className="table table-hover">
								<thead>
									<tr>
										<th>#</th>
										<th>First Name</th>
										<th>Last Name</th>
										<th>Username</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>Eugene</td>
										<td>Kopyov</td>
										<td>@Kopyov</td>
									</tr>
									<tr>
										<td>2</td>
										<td>Victoria</td>
										<td>Baker</td>
										<td>@Vicky</td>
									</tr>
									<tr>
										<td>3</td>
										<td>James</td>
										<td>Alexander</td>
										<td>@Alex</td>
									</tr>
									<tr>
										<td>4</td>
										<td>Franklin</td>
										<td>Morrison</td>
										<td>@Frank</td>
									</tr>
								</tbody>
							</table>
						</div>
                                        <button type="submit" className="btn bg-blue btn-block"><i className="icon-cart-add position-left"></i> Confirm Purchase</button>
                                    </div>
                                </div>
                                {/* <!-- /categories --> */}

                            </div>
                        </div>
                    </div>
                    {/* <!-- /detached sidebar --> */}
        </div>
               );

    }
}
export default Manage

