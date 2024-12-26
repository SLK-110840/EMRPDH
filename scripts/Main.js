// require.config({
//     paths: {
//         vue: "./ETOWorkflow/Dependencies/vue/vue"
//     }
// });


define("PDH/scripts/Main", [
    "DS/PlatformAPI/PlatformAPI",
    "DS/WAFData/WAFData",
	"DS/DataDragAndDrop/DataDragAndDrop",	
    "css!PDH/Dependencies/bootstrap/css/bootstrap.css",
	"DS/WebappsUtils/WebappsUtils"],
    function (PlatformAPI, WAFData, DataDragAndDrop,dropIMG,util) {
		

        var myWidget = {
			ctx: "VPLMProjectLeader.0000000001.Micro Motion",
        caUrl:
            "https://oi000186152-us1-space.3dexperience.3ds.com/enovia/resources/v1/modeler/dslc/changeaction/",
        csrfURL:
            "https://oi000186152-us1-space.3dexperience.3ds.com/enovia/resources/v1/application/CSRF?tenant=OI000186152",
            
			
            onLoad: function () {
				
                myWidget.getData();   


                widget.setTitle("");

            },
			
			onRefresh: function() {
                        alert("Inside refresh");
						myWidget.getData(); 
                    },
            
            getData: function () {
				var appUrl = properties.applicationurl;
				alert("From prop file appUrl - "+appUrl);
				
				var iconUrl = widget.getUrl();
                iconUrl = iconUrl.substring(0, iconUrl.lastIndexOf("/"));
                var  dropIconUrl = iconUrl + "/assets/icons/I_DropZone.png";
                //let templateUrl = iconUrl+"/assets/BOM_Imports.xlsx";
				
				alert("heyyyyyyyyyyyyyyyyyy"+dropIconUrl);
				
                widget.body.innerHTML = "<div class='droppableFrame'><img id='dropImage' alt='Drop Here' src='"+dropIconUrl+"'></div><div class='droppedFrame'></div><iframe src='"+appUrl+"' title='description' style='width: 100vw; height: 100vh;'></iframe>";
				
				
				var theDropElt = widget.body.querySelector('.droppableFrame');		
				var theDroppedElt = widget.body.querySelector('.droppedFrame');
				
				
				
				DataDragAndDrop.droppable( theDropElt , {  
                drop : function(data) {
				    theDropElt.style.border = "none";
					var obj = JSON.parse(data);					
                    
                    var draggedObjType = obj["data"]["items"][0]["displayType"];
					var draggedObjName = obj["data"]["items"][0]["displayName"];
					var draggedObjId = obj["data"]["items"][0]["objectId"];
				   //alert("Inside Drop Type "+draggedObjType);
				   //alert("Inside Drop Name "+draggedObjName);
				   alert("Inside DropId "+draggedObjId);
				   alert("Inside data "+data);
				   console.log("----------------data---------",data);
				   WAFData.authenticatedRequest(myWidget.csrfURL, {
					method: "Get",
					timeout: 150000,
					type: "json",
					onComplete: function (res, headerRes) {
						const csrfTokenName = res.csrf.name;
						const csrfTokenValue = res.csrf.value;
						alert("csrfTokenValue 11data "+res);
						const securityContextHeader = "SecurityContext";
						const myHeaders = new Object();
						myHeaders[csrfTokenName] = csrfTokenValue;
						myHeaders[securityContextHeader] = myWidget.ctx;
						myHeaders["Content-Type"] = "application/json";
						alert("myHeaders myHeaders "+myHeaders);
						alert("myHeaders myHeaders "+myWidget.caUrl);
						alert("myHeaders myHeaders "+draggedObjId);
						var changeActionUrl = myWidget.caUrl + draggedObjId;
						alert("changeActionUrl 11data "+changeActionUrl);
						WAFData.authenticatedRequest(changeActionUrl, {
						method: "Get",
						timeout: 150000,
						type: "json",
						onComplete: function (finalres, headerResponse) {
							alert("csrfTokenValue data "+csrfTokenValue);
							alert("response 11data "+finalres.data);
							/* var fetchedData = finalres.data;
							alert("Fetched Data: " + JSON.stringify(fetchedData)); */
						}
						});		
alert("csrfTokenValue data "+csrfTokenValue);						
						}
            });
					
				   if(draggedObjType==="Change Action"){
					   alert("object type is Change Action............");
					   
					   //var iUrl = "https://emr-product-datahub-dev.azurewebsites.net/Dev/mcolist/";
					   //var fUrl = properties.devcaurl+draggedObjId;
					   
					   //theDroppedElt.innerHTML = "<iframe src='"+fUrl+"' title='description' style='width: 100vw; height: 100vh;'></iframe>";
					   
					   /*widget.body.innerHTML = "<div class='droppableFrame'>Drop Here </div><iframe src='"+fUrl+"' title='description' style='width: 100vw; height: 100vh;'></iframe>";*/
				   }
				   else {
					   alert("This functionality is not available for selected type");
				   }
				   
				   
				   
				   
                },
				enter: function() {	
                   theDropElt.style.border = "thick dotted #78befa";
				   
                },
                over: function() {	
                    theDropElt.style.border = "thick dotted #78befa";
					
                }, 
                leave: function() {
                   theDropElt.style.border = "none";
                }
            }) ;
            }
			

        }
		
        widget.myWidget = myWidget;
		widget.addEvent('onRefresh',  myWidget.onRefresh);
        return myWidget;
    });