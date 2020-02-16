<!DOCTYPE html>
<html lang="en">

<!-- Mirrored from demo.interface.club/limitless/layout_1/LTR/material/animations_velocity_examples.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 28 Nov 2017 17:53:44 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Add Product</title>

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

	<script type="text/javascript" src="/assets/js/plugins/forms/styling/uniform.min.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/forms/styling/switchery.min.js"></script>

	<script type="text/javascript" src="/assets/js/pages/components_media.js"></script>


	<script type="text/javascript" src="/assets/js/plugins/forms/selects/bootstrap_select.min.js"></script>
	<script type="text/javascript" src="/assets/js/core/app.js"></script>
	<script type="text/javascript" src="/assets/js/pages/form_bootstrap_select.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/ui/ripple.min.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/notifications/pnotify.min.js"></script>
	<script type="text/javascript" src="/assets/js/pages/components_notifications_pnotify.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/uploaders/fileinput/fileinput.min.js"></script>
	<script type="text/javascript" src="/assets/js/pages/uploader_bootstrap.js"></script>

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
					<li><a href="#">Product</a></li>
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
											<legend class="text-semibold"><i class="icon-menu6 position-left"></i> Product Details</legend>

											<div class="form-group">
												<label class="col-lg-2 control-label">Name * :</label>
												<div class="col-lg-4">
													<input type="text" id="name" maxlength="200" class="form-control" placeholder="Enter product name">
													<input type="hidden" id="token" value="{{ csrf_token() }}"> 
												</div>

												<label class="col-lg-2 control-label">Manufacture * :</label>
												<div class="col-lg-4">
													<input type="text" maxlength="200" id="manufacture" class="form-control" placeholder="Enter Product Manufacture Country ">
												</div>
											</div>
											<div class="form-group">
												<label class="col-lg-2 control-label">Retail Price * :</label>
												<div class="col-lg-4">
													<input type="number" maxlength="11" id="retail" class="form-control" placeholder="Enter Retail Price">
												</div>

												<label class="col-lg-2 control-label">Sale Price * :</label>
												<div class="col-lg-4">
													<input type="number" maxlength="11" id="sale" class="form-control" placeholder="Enter Sale Price">
												</div>
											</div>
											<div class="form-group">
												<label class="col-lg-2 control-label">Select Supplier * :</label>
												<div class="col-lg-4">
													<select class="bootstrap-select" id="supplier" data-live-search="true" data-width="100%">
														<option></option>
															<option  value="Shoe Club">Shoe Club</option>
															<option  value="Gift Shop">Gift Shop</option>
													</select>
												</div>

												<label class="col-lg-2 control-label">Size * :</label>
												<div class="col-lg-4">
													<input type="number" maxlength="200" id="size" class="form-control" placeholder="Enter Product Size">
												</div>
											</div>

											<div class="form-group">
												<label class="col-lg-2 control-label">Details * :</label>
												<div class="col-lg-10">
													<textarea rows="8" cols="5" class="form-control" id="detail" placeholder="Enter Product Details"></textarea>
												</div>
											</div>
											<!-- <div class="form-group">
													<input type="checkbox" class="switch" checked="checked">
											</div> -->
										</fieldset>
									</div>

									<div class="col-md-12">
										<fieldset>
						                	<legend class="text-semibold"><i class="icon-images2 position-left"></i> Product Images *</legend>

											<div class="form-group">
												<div class="col-lg-12">
													<input type="file" id="fileUpload" accept="image/*" class="file-input-ajax" multiple="multiple">
													<span class="help-block">Uploads Product images here maximum 10.</span>
												</div>
											</div>
										</fieldset>
									</div>

								<div class="text-right">
									<button type="submit"  class="btn btn-primary  add">Submit form <i class="position-right  load"></i></button>
								</div>
							</div>
						</div>
					</form>
					<!-- /2 columns form -->


                    @include('footer')

				</div>
				<!-- /content area -->

			</div>
			<!-- /main content -->

		</div>
		<!-- /page content -->

	</div>
	<!-- /page container -->

<script type="text/javascript">
var imageData = [];

$('#fileUpload').on('fileremoved', function(event, id, index) {
	console.log('id = ' + id + ', index = ' + index);
	for (let index = 0; index < imageData.length; index++) {
		if (imageData[index] == id) {
			imageData.splice(index,3);
		}
	}
	console.log(imageData);
});
$('#fileUpload').on('filecleared', function(event) {
//	console.log("filecleared");
	imageData = [];
	console.log(imageData);
});
$('#fileUpload').on('fileloaded', function(event, file, previewId, index, reader) {
	//console.log('Pid = ' + previewId + ', index = ' + index);
	imageData.push(previewId);
	imageData.push(file.name);
	imageData.push(reader.result);
	console.log(imageData);
});











$('.add').on('click',function(){
	$('.load').addClass("icon-spinner4 spinner");
	$(".add").attr( "disabled", "disabled" );

	if (!$('#name').val()) {
		new PNotify({
    		title:'Error',
    		text:'Enter Product Name',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );  
	} else if (!$('#manufacture').val()) {
		new PNotify({
    		title:'Error',
    		text:'Enter Manufacture Name',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else if (!$('#retail').val()) {
		new PNotify({
    		title:'Error',
    		text:'Enter Retail Price',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else if ($('#retail').val() > 9999999999) {
		new PNotify({
    		title:'Error',
    		text:'Retail Price Not Valid',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else if (!$('#sale').val()) {
		new PNotify({
    		title:'Error',
    		text:'Enter Sale Price',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else if ($('#sale').val() > 9999999999) {
		new PNotify({
    		title:'Error',
    		text:'Sale Price Not Valid',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else if ($('#retail').val() > $('#sale').val()) {
		new PNotify({
    		title:'Error',
    		text:'Retail Price Cannot Be Greater then Sale Price',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else if (!$('#size').val()) {
		new PNotify({
    		title:'Error',
    		text:'Enter Product Size',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else if (!$('#supplier').val()) {
		new PNotify({
    		title:'Error',
    		text:'Select Supplier',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else if (!$('#detail').val()) {
		new PNotify({
    		title:'Error',
    		text:'Enter Detail',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else if (imageData == ' ' || imageData == "") {
		new PNotify({
    		title:'Error',
    		text:'Select Atlest One Image',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else {
    var data = new Object();
    data.name = $('#name').val();
    data.manufacture = $('#manufacture').val();
    data.retail = $('#retail').val();	
    data.sale = $('#sale').val();	
    data.size = $('#size').val();	
    data.supplier = $('#supplier').val();	
    data.detail = $('#detail').val();	
    data._token = $('#token').val();
	data.image = imageData;



    var url = '/api/product/add';

    $.ajax({
        url: url,
        data: data,
        type: 'post',
        success: function(response){
			new PNotify({
    		title:'Successfull',
    		text:'Product Added',
    		addclass:'bg-success'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" ); 
            
        }
           
});
	}

});

</script>



</body>


<!-- Mirrored from demo.interface.club/limitless/layout_1/LTR/material/animations_velocity_examples.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 28 Nov 2017 17:53:44 GMT -->
</html>
