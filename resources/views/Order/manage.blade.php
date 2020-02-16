<!DOCTYPE html>
<html lang="en">

<!-- Mirrored from demo.interface.club/limitless/layout_1/LTR/material/animations_velocity_examples.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 28 Nov 2017 17:53:44 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Manage Order</title>

	<!-- Global stylesheets -->
	<link href="/assets/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
	<link href="/assets/css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="/assets/css/core.css" rel="stylesheet" type="text/css">
	<link href="/assets/css/components.css" rel="stylesheet" type="text/css">
	<link href="/assets/css/colors.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="/notifications.css">
	<!-- /global stylesheets -->

	<!-- Core JS files -->
	<script type="text/javascript" src="/assets/js/plugins/loaders/pace.min.js"></script>
	<script type="text/javascript" src="/assets/js/core/libraries/jquery.min.js"></script>
	<script type="text/javascript" src="/assets/js/core/libraries/bootstrap.min.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/loaders/blockui.min.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/forms/styling/uniform.min.js"></script>
	<!-- /core JS files -->

	<!-- Theme JS files -->
	<script type="text/javascript" src="/assets/js/pages/datatables_basic.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/tables/datatables/datatables.min.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/forms/selects/select2.min.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/media/fancybox.min.js"></script>
	<script type="text/javascript" src="/assets/js/core/app.js"></script>
	<script type="text/javascript" src="/assets/js/pages/gallery_library.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/ui/ripple.min.js"></script>
	<!-- /theme JS files -->
	<script src='/dist/orderManage.js'></script>
	

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
								<li class="active">Manage</li>
							</ul>
						</div>
					</div>
					<!-- /page header -->


				<!-- Content area -->
				<div class="content">

						<!-- Individual column searching (text inputs) -->
						<div class="panel panel-flat">
						<div class="panel-heading">
							<h5 class="panel-title">Order Data</h5>
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

						<div id=Manage></div>
						
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

</body>

<!-- Mirrored from demo.interface.club/limitless/layout_1/LTR/material/animations_velocity_examples.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 28 Nov 2017 17:53:44 GMT -->
</html>
