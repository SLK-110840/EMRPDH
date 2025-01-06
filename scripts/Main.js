// require.config({
//     paths: {
//         vue: "./ETOWorkflow/Dependencies/vue/vue"
//     }
// });


define("EMRPDH/scripts/Main", [
    "DS/PlatformAPI/PlatformAPI",
    "DS/WAFData/WAFData",
	"DS/DataDragAndDrop/DataDragAndDrop",	
    "css!EMRPDH/Dependencies/bootstrap/css/bootstrap.css",
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
                    alert(data);
                   // var draggedObjType = obj["data"]["items"][0]["displayType"];
			var draggedObjType="Change Action";
			 alert(draggedObjType);
					var draggedObjName = obj["data"]["items"][0]["displayName"];
			 alert(draggedObjName);
					//var draggedObjId = obj["data"]["items"][0]["objectId"];
				   if(draggedObjType==="Change Action"){
					  var draggedObjId = "1220006CL2";
					   alert("object type is Change Action............");
				   alert("Inside DropId "+draggedObjId);
				   alert("Inside data "+data);
				   console.log("----------------data---------",data);
/* 				   WAFData.authenticatedRequest(myWidget.csrfURL, {
					method: "Get",
					timeout: 150000,
					type: "json",
					onComplete: function (res, headerRes) {
						const csrfTokenName = res.csrf.name;
						const csrfTokenValue = res.csrf.value;
						alert("csrfTokenValue 11data "+csrfTokenName);
						const securityContextHeader = "SecurityContext";
						const myHeaders = new Object();
						myHeaders[csrfTokenName] = csrfTokenValue;
						myHeaders[securityContextHeader] = myWidget.ctx;
						myHeaders["Content-Type"] = "application/json";
						console.log(myWidget.ctx);
						alert("myHeaders myHeaders "+myWidget.ctx);
						alert("myHeaders myHeaders "+myWidget.caUrl);
						alert("myHeaders myHeaders "+draggedObjId);
						var changeActionUrl = myWidget.caUrl + draggedObjId;
						alert("changeActionUrl 11data "+changeActionUrl);
						WAFData.authenticatedRequest(changeActionUrl, {
						method: "Get",
						timeout: 150000,
						headers: myHeaders,
						type: "json",
						onComplete: function (finalres, headerResponse) {
							alert("csrfTokenValue data "+csrfTokenValue);
							alert("response 11data "+finalres.data);
							//var fetchedData = finalres.data;
							alert("Fetched Data: " + JSON.stringify(finalres));
							if (finalres) {
            var fetchedData = JSON.stringify(finalres, null, 2); // Pretty-print JSON data
            alert("Fetched Data: " + fetchedData);
            theDroppedElt.innerHTML = "<iframe srcdoc='<pre>" + fetchedData + "</pre>' title='description' style='width: 100vw; height: 100vh;'></iframe>";
        } else {
            alert("No data found in the response.");
        }
						}
						});		
alert("csrfTokenValue data "+csrfTokenValue);						
						}
            }); */
					   
					   //var iUrl = "https://emr-product-datahub-dev.azurewebsites.net/Dev/mcolist/";
					   var fUrl = properties.caDetailurl+draggedObjId;
					   
					   //theDroppedElt.innerHTML = "<iframe src='"+JSON.stringify(finalres)+"' title='description' style='width: 100vw; height: 100vh;'></iframe>";
					   
					   widget.body.innerHTML = "<div class='droppableFrame'><img id='dropImage' alt='Drop Here' src='"+dropIconUrl+"'></div><div class='droppedFrame'></div><iframe src='"+fUrl+"' title='description' style='width: 100vw; height: 100vh;'></iframe>";
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
