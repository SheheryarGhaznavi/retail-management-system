<!DOCTYPE html>
<html lang="en">

<!-- Mirrored from demo.interface.club/limitless/layout_1/LTR/material/animations_velocity_examples.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 28 Nov 2017 17:53:44 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Add Expense</title>

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

	<script type="text/javascript" src="/assets/js/plugins/notifications/pnotify.min.js"></script>
	<script type="text/javascript" src="/assets/js/pages/components_notifications_pnotify.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/forms/selects/bootstrap_select.min.js"></script>
	<script type="text/javascript" src="/assets/js/core/app.js"></script>
	<script type="text/javascript" src="/assets/js/pages/form_bootstrap_select.js"></script>
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
					<li><a href="#">Expense</a></li>
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
									<legend class="text-semibold"><i class="icon-menu6 position-left"></i> Expense Details</legend>

									<div class="form-group">
										<label class="col-lg-2 control-label">Title*:</label>
										<input type="hidden" id="token" value="{{ csrf_token() }}"> 
										<div class="col-lg-4">
											<input type="text" maxlength="200" id="title" class="form-control" placeholder="Enter Title">
										</div>

										<label class="col-lg-2 control-label">Price*:</label>
										<div class="col-lg-4">
											<input type="number" maxlength="11" id="price" class="form-control" placeholder="Enter Price">
										</div>
									</div>

									<div class="form-group">
										<label class="col-lg-2 control-label">Details*:</label>
										<div class="col-lg-10">
											<textarea rows="8" cols="5" id="detail" class="form-control" placeholder="Enter Expense Details"></textarea>
										</div>
									</div>
									<div class="form-group">
										
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
	<script>

	$('.add').on('click',function(){
	$('.load').addClass("icon-spinner4 spinner");
	$(".add").attr( "disabled", "disabled" );

	if (!$('#title').val()) {
		new PNotify({
    		title:'Error',
    		text:'Enter Expense Title',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );  
	} else if (!$('#price').val()) {
		new PNotify({
    		title:'Error',
    		text:'Enter Price',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else if ($('#price').val() > 10000000) {
		new PNotify({
    		title:'Error',
    		text:'Enter Valid Price',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else if (!$('#detail').val()) {
		new PNotify({
    		title:'Error',
    		text:'Enter Expense Details',
    		addclass:'bg-danger'
    	});
		$('.load').removeClass("icon-spinner4 spinner");
		$(".add").removeAttr( "disabled", "disabled" );
	} else {
    var data = new Object();
    data.title = $('#title').val();
    data.price = $('#price').val();	
	data.detail = $('#detail').val();	
    data._token = $('#token').val();



    var url = '/api/expense/add';

    $.ajax({
        url: url,
        data: data,
        type: 'post',
        success: function(response){
			new PNotify({
    		title:'Successfull',
    		text:'Expense Added',
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
