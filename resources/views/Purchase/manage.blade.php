<!DOCTYPE html>
<html lang="en">

<!-- Mirrored from demo.interface.club/limitless/layout_1/LTR/material/animations_velocity_examples.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 28 Nov 2017 17:53:44 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Manage Purchase</title>

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
	<script type="text/javascript" src="/assets/js/plugins/tables/datatables/datatables.min.js"></script>
	<script type="text/javascript" src="/assets/js/plugins/forms/selects/select2.min.js"></script>

	<script type="text/javascript" src="/assets/js/core/app.js"></script>
	<script type="text/javascript" src="/assets/js/pages/datatables_api.js"></script>

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
								<li><a href="#">Purchase</a></li>
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
							<h5 class="panel-title">Purchase Data</h5>
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

						<table class="table datatable-column-search-inputs">
							<thead>
								<tr>
					                <th>Name</th>
					                <th>Position</th>
					                <th>Age</th>
					                <th>Start date</th>
					                <th>Salary</th>
					                <th class="text-center">Actions</th>
					            </tr>
							</thead>
							<tbody>
								<tr>
					                <td>Tiger Nixon</td>
					                <td>System Architect</td>
					                <td>61</td>
					                <td><a href="#">2011/04/25</a></td>
					                <td><span class="label label-info">$320,800</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Garrett Winters</td>
					                <td>Accountant</td>
					                <td>63</td>
					                <td><a href="#">2011/07/25</a></td>
					                <td><span class="label label-danger">$170,750</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Ashton Cox</td>
					                <td>Junior Technical Author</td>
					                <td>66</td>
					                <td><a href="#">2009/01/12</a></td>
					                <td><span class="label label-default">$86,000</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Cedric Kelly</td>
					                <td>Senior Javascript Developer</td>
					                <td>22</td>
					                <td><a href="#">2012/03/29</a></td>
					                <td><span class="label label-success">$433,060</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Airi Satou</td>
					                <td>Accountant</td>
					                <td>33</td>
					                <td><a href="#">2008/11/28</a></td>
					                <td><span class="label label-danger">$162,700</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Brielle Williamson</td>
					                <td>Integration Specialist</td>
					                <td>61</td>
					                <td><a href="#">2012/12/02</a></td>
					                <td><span class="label label-info">$372,000</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Herrod Chandler</td>
					                <td>Sales Assistant</td>
					                <td>59</td>
					                <td><a href="#">2012/08/06</a></td>
					                <td><span class="label label-danger">$137,500</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Rhona Davidson</td>
					                <td>Integration Specialist</td>
					                <td>55</td>
					                <td><a href="#">2010/10/14</a></td>
					                <td><span class="label label-default">$97,900</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Colleen Hurst</td>
					                <td>Javascript Developer</td>
					                <td>39</td>
					                <td><a href="#">2009/09/15</a></td>
					                <td><span class="label label-success">$405,500</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Sonya Frost</td>
					                <td>Software Engineer</td>
					                <td>23</td>
					                <td><a href="#">2008/12/13</a></td>
					                <td><span class="label label-danger">$103,600</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Jena Gaines</td>
					                <td>Office Manager</td>
					                <td>30</td>
					                <td><a href="#">2008/12/19</a></td>
					                <td><span class="label label-danger">$90,560</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Quinn Flynn</td>
					                <td>Support Lead</td>
					                <td>22</td>
					                <td><a href="#">2013/03/03</a></td>
					                <td><span class="label label-info">$342,000</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Charde Marshall</td>
					                <td>Regional Director</td>
					                <td>36</td>
					                <td><a href="#">2008/10/16</a></td>
					                <td><span class="label label-success">$470,600</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Haley Kennedy</td>
					                <td>Senior Marketing Designer</td>
					                <td>43</td>
					                <td><a href="#">2012/12/18</a></td>
					                <td><span class="label label-danger">$113,500</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
					            <tr>
					                <td>Tatyana Fitzpatrick</td>
					                <td>Regional Director</td>
					                <td>19</td>
					                <td><a href="#">2010/03/17</a></td>
					                <td><span class="label label-info">$385,750</span></td>
									<td class="text-center">
										<ul class="icons-list">
											<li class="dropdown">
												<a href="#" class="dropdown-toggle" data-toggle="dropdown">
													<i class="icon-menu9"></i>
												</a>

												<ul class="dropdown-menu dropdown-menu-right">
													<li><a href="#"><i class="icon-file-pdf"></i> Export to .pdf</a></li>
													<li><a href="#"><i class="icon-file-excel"></i> Export to .csv</a></li>
													<li><a href="#"><i class="icon-file-word"></i> Export to .doc</a></li>
												</ul>
											</li>
										</ul>
									</td>
					            </tr>
							</tbody>
							<tfoot>
								<tr>
					                <td>Name</td>
					                <td>Position</td>
					                <td>Age</td>
					                <td>Start date</td>
					                <td>Salary</td>
					                <td></td>
					            </tr>
							</tfoot>
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

</body>

<!-- Mirrored from demo.interface.club/limitless/layout_1/LTR/material/animations_velocity_examples.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 28 Nov 2017 17:53:44 GMT -->
</html>
