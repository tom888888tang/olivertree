sap.ui
		.define(
				[ 'jquery.sap.global', 'sap/m/MessageToast',
						'sap/ui/core/Fragment', 'sap/ui/core/mvc/Controller' ],
				function(jQuery, MessageToast, Fragment, Controller) {
					"use strict";

					var CController = Controller
							.extend(
									"ui5TileTrial.controller.Stock",
									{
										onInit : function() {

											var stockModel = new sap.ui.model.json.JSONModel();
											// stockModel.loadData("https://s12hanaxs.hanatrial.ondemand.com/i074178trial/stock/test/test.xsjs");  http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=AAPL&callback=
											stockModel.loadData("model/stock.json");
											$
													.ajax(
															{
																type : "POST",
																dataType : 'json',
									
																url:"http://120.27.144.171:8080/Odata/Cloud_Hr.svc/Customers",
															    //jsonpCallback: 'processJson',
															    contentType: "application/json",
															    dataType: 'json',
															    data: "Customer_id=99&Customer_name=99&Customer_status=99&Customer_type=99",
															    success: function(json) {
															       console.log("success...");
															    },
															    error: function(e) {
															       console.log(e.message);
															    }
															});
											window.processJson = function(data){
												
											console.log("processing data...");
											};
													
											
											this.getView().setModel(stockModel);
											var oTable = this
													.byId("id_stockList");
											oTable.setModel(stockModel);

											
										},
										onPressHome:function(){
											var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
											oRouter.navTo("appHome");
										}

									});
				})