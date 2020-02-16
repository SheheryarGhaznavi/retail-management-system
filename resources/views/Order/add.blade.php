<!DOCTYPE html>
<html lang="en">

<!-- Mirrored from demo.interface.club/limitless/layout_1/LTR/material/animations_velocity_examples.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 28 Nov 2017 17:53:44 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Add Order</title>

	<!-- Global stylesheets -->
	<link href="/assets/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
	<link href="/assets/css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="/assets/css/core.css" rel="stylesheet" type="text/css">
	<link href="/assets/css/components.css" rel="stylesheet" type="text/css">
	<link href="/assets/css/colors.css" rel="stylesheet" type="text/css">
	<!-- /global stylesheets -->

	<!-- Core JS files -->
	<script type="text/javascript" src="/assets/js/plugins/loaders/pace.min.js"></script>
	<script type="text/javascript" src="/assets/js/core/libraries/jquery.min.js"></script>
	<script type="text/javascript" src="/assets/js/core/libraries/bootstrap.min.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/loaders/blockui.min.js"></script>
	<!-- /core JS files -->

	<!-- Theme JS files -->	
	<script type="text/javascript" src="/assets/js/plugins/media/fancybox.min.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/forms/styling/uniform.min.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/notifications/pnotify.min.js"></script>
	<script type="text/javascript" src="/assets/js/pages/components_notifications_pnotify.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/forms/selects/select2.min.js"></script>
	<script type="text/javascript" src="/assets/js/pages/datatables_basic.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/tables/datatables/datatables.min.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/forms/selects/bootstrap_select.min.js"></script>
	<script type="text/javascript" src="/assets/js/core/app.js"></script>
	<script type="text/javascript" src="/assets/js/pages/form_bootstrap_select.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/forms/styling/switchery.min.js"></script>
	<script type="text/javascript" src="/assets/js/pages/components_media.js"></script>
	<script type="text/javascript" src="/assets/js/pages/gallery_library.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/ui/ripple.min.js"></script>
	<!-- /theme JS files -->
</head>

<body>

	
@include('header')

	<!-- Page container -->
	<div class="page-container">

		<!-- Page content -->
		<div class="page-content">

			@include('nav')


			<!-- Main content -->
			<div class="content-wrapper">

			<!-- Page header -->
			<div class="page-header page-header-default">

			<div class="breadcrumb-line">
				<ul class="breadcrumb">
					<li><a href="/"><i class="icon-home2 position-left"></i> Home</a></li>
					<li><a href="#">Order</a></li>
					<li class="active">Add</li>
				</ul>
			</div>
		</div>
		<!-- /page header -->


				<!-- Content area -->
				<div class="content">

						<!-- 2 columns form -->
					<form class="form-horizontal" action="javascript:void(0);">
						<div class="panel panel-flat">
							<div class="panel-heading">
								<div class="heading-elements">
									<ul class="icons-list">
				                		<li><a data-action="collapse"></a></li>
				                		<li><a data-action="reload"></a></li>
				                		<li><a data-action="close"></a></li>
				                	</ul>
			                	</div>
							</div>

							<div class="panel-body">
									<div class="col-md-12">
										<fieldset>
											<legend class="text-semibold"><i class="icon-menu6 position-left"></i> Order Details</legend>

											<div class="form-group">
												<label class="col-lg-2 control-label">Select Product * :</label>
												<input type="hidden" id="token" value="{{ csrf_token() }}"> 
												<div class="col-lg-4">
													<select class="bootstrap-select" id="product" data-live-search="true" data-width="100%">
															<optgroup label="Select A Product">
																<option></option>
															<?php foreach($product as $value):?>
															<option  value=<?php echo  $value->id?>><?php echo $value->name?></option>
															<?php endforeach?>
															</optgroup>
													</select>
												</div>

												<label class="col-lg-2 control-label">Quantity * :</label>
												<div class="col-lg-4">
													<input type="number" id="quantity"  class="form-control" placeholder="Enter Quantity">
												</div>
											</div>
										</fieldset>
									</div>


								<div class="text-right">
									<button type="submit"  class="btn btn-primary  add">Add<i class="position-right  load"></i></button>
								</div>
							</div>
						</div>
					</form>
					<!-- /2 columns form -->

						<!-- Individual column searching (text inputs) -->
						<div class="panel panel-flat">
						<div class="panel-heading">
							<h5 class="panel-title">Today's Order</h5>
							<div class="heading-elements">
								<ul class="icons-list">
			                		<li><a data-action="collapse"></a></li>
			                		<li><a data-action="reload"></a></li>
			                		<li><a data-action="close"></a></li>
			                	</ul>
		                	</div>
						</div>

						<!-- <div class="panel-body">
							Individual columns searching with <code>text inputs</code>. The searching functionality that is provided by DataTables is very useful for quickly search through the information in the table - however the search is global, and you may wish to present controls to search on specific columns only. This examples shows text elements being used with the <code>column().search()</code> method to add input controls in the footer of the table for each column.
						</div> -->

						<table class="table datatable-basic table-hover" id="order">
							<thead>
								<tr>
					                <th>No</th>
									<th>Product Name</th>
					                <th>Quanitity</th>
									<th>Profit</th>
					                <th>Added On</th>
					                <th>Purchased</th>
									<th>Product Image</th>
					            </tr>
							</thead>
							<tbody>
								<?php foreach($order as $value):?>
								<tr>
					                <td><?php echo $value->no?></td>
					                <td><?php echo $value->name?></td>
									<td><?php echo $value->quantity?></td>
									<td><?php echo $value->profit?></td>
									<td><a href="#"><?php echo $value->created_on?></a></td>
									<?php if($value->is_purchased == '1'):?>
									<td><input type="checkbox"  onchange="check(<?php echo $value->id?>);" class="switch check" checked="checked"></td>
									<?php else:?>
									<td><input type="checkbox"  onchange="check(<?php echo $value->id?>);" class="switch check" ></td>
									<?php endif?>
					                <td><div style="height: 50px;width: 50px;margin-bottom:0px" class="thumbnail">
                                                <div class="thumb">
                                                    <img src="/product/<?php echo $value->manufacture?>" alt=""/>
                                                    <div class="caption-overflow">
                                                        <span>
                                                            <a href=/product/<?php echo $value->manufacture?> class="btn btn-flat " data-popup="lightbox"></a>
                                                        </span>
                                                    </div>
                                                </div>
											</div>
									</td>
								</tr>
								<?php endforeach?>
							</tbody>
						</table>
					</div>
					<!-- /individual column searching (text inputs) -->


                    @include('footer')

				</div>
				<!-- /content area -->

			</div>
			<!-- /main content -->

		</div>
		<!-- /page content -->

	</div>
	<!-- /page container -->
	<script>

	$('.add').on('click',function(){
	$('.load').addClass("icon-spinner4 spinner");
	$(".add").attr( "disabled", "disabled" );

	if (!$('#product').val()) {
		new PNotify({
    		title:'Error',
    		text:'Select Product',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );  
	} else if (!$('#quantity').val()) {
		new PNotify({
    		title:'Error',
    		text:'Enter Quantity',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else if ($('#quantity').val() < 1 || $('#quantity').val() > 1000 ) {
		new PNotify({
    		title:'Error',
    		text:'Quantity Not Valid',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else {
    var data = new Object();
    data.product = $('#product').val();
    data.quantity = $('#quantity').val();	
    data._token = $('#token').val();



    var url = '/api/order/add';

    $.ajax({
        url: url,
        data: data,
        type: 'post',
        success: function(response){
			new PNotify({
    		title:'Successfull',
    		text:'Order Added',
    		addclass:'bg-success'
		});
		
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" ); 
		window.location.reload();
            
        }
           
});
	}

});

function check(id) {

	$.ajax({
        url: '/api/order/checkStatus/'+id,
        success: function(response){
			if (response == 'success') {
				
			var url = '/api/order/purchased/'+id;

    		$.ajax({
       		url: url,
       		success: function(response){
			new PNotify({
    		title:'Successfull',
    		text:'Purchased',
    		addclass:'bg-success'
    		});
        	}    
			});

			} else {
			var url = '/api/order/notPurchased/'+id;

    		$.ajax({
       		url: url,
       		success: function(response){
			new PNotify({
    		title:'Successfull',
    		text:'Not Purchased',
    		addclass:'bg-success'
    		});
        	}    
			});
			}
        }    
	});

}

</script>

</body>

<!-- Mirrored from demo.interface.club/limitless/layout_1/LTR/material/animations_velocity_examples.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 28 Nov 2017 17:53:44 GMT -->
</html>
