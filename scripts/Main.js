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
                   
            myWidget.getData();
                    },
            getData: function () {
        var appUrl = properties.applicationurl;
       
       
        var iconUrl = widget.getUrl();
                iconUrl = iconUrl.substring(0, iconUrl.lastIndexOf("/"));
                var  dropIconUrl = "https://thewhitechamaleon.github.io/testrapp/images/drag.png";
                //let templateUrl = iconUrl+"/assets/BOM_Imports.xlsx";
       
     
                widget.body.innerHTML = "<div class='droppableFrame'><img id='dropImage' alt='Drop Here' src='"+dropIconUrl+"'></div><div class='droppedFrame'></div><iframe src='' title='description' ></iframe>";
       
        var theDropElt = widget.body.querySelector('.droppableFrame');    
        var theDroppedElt = widget.body.querySelector('.droppedFrame');
       
        var droppableContainer = widget.body.querySelector('.droppableContainer');
       
        DataDragAndDrop.droppable( theDropElt , {  
                drop : function(data) {
      //droppableContainer.classList.remove("drag-over");
     
      widget.body.innerHTML = "<div class='droppableFrame'></div><div class='droppedFrame'></div><iframe src='"+appUrl+"' title='description' style='width: 100vw; height: 100vh;'></iframe>";
          var obj = JSON.parse(data);        
                   
                    var draggedObjType = obj["data"]["items"][0]["objectType"];
     
          var draggedObjName = obj["data"]["items"][0]["displayName"];
          var draggedObjId = obj["data"]["items"][0]["objectId"];
     
           if(draggedObjType==="Change Action"){
           // var draggedObjId = "1220006CL2";
             
       
           console.log("----------------data---------",data);
           WAFData.authenticatedRequest(myWidget.csrfURL, {
          method: "Get",
          timeout: 150000,
          type: "json",
          onComplete: function (res, headerRes) {
            const csrfTokenName = res.csrf.name;
            const csrfTokenValue = res.csrf.value;
           
            const securityContextHeader = "SecurityContext";
            const myHeaders = new Object();
            myHeaders[csrfTokenName] = csrfTokenValue;
            myHeaders[securityContextHeader] = myWidget.ctx;
            myHeaders["Content-Type"] = "application/json";
            console.log(myWidget.ctx);
         
            var changeActionUrl = myWidget.caUrl + draggedObjId+"?$fields=flowDown";
         
            WAFData.authenticatedRequest(changeActionUrl, {
            method: "Get",
            timeout: 15000000,
            headers: myHeaders,
            type: "json",
            onComplete: function (finalres, headerResponse) {
           
              //var fetchedData = finalres.data;
             
             
              var flowDown=JSON.stringify(finalres);
           
              var flowdownObj = JSON.parse(flowDown);
              var flowDownnew= flowdownObj["isFlowDownOf"];
              var finalresofflow=JSON.stringify(flowDownnew)
const  targetId = flowDownnew[0].identifier;
             alert(targetId);
              if(finalresofflow=="[]"){
              finalresofflow="";  
              }
              if (finalresofflow) {
              
 
                  var iUrl="https://emr-product-datahub-qa.azurewebsites.net/caDetails/"+targetId;
               
  widget.body.innerHTML = "<div class='droppedFrame'></div><iframe src='"+iUrl+"' title='description' style='width: 100vw; height: 100vh;'></iframe>";
          theDroppedElt.innerHTML = "<iframe srcdoc='<pre>" + iUrl + "</pre>' title='description' style='width: 100vw; height: 100vh;'></iframe>";
   
     } else {
 
var fetchedData = JSON.stringify(finalres, null, 2); // Pretty-print JSON data
 
 
 var iUrl1="https://plmpdh-qa.emerson.com/caDetails/"+draggedObjId;
             
  widget.body.innerHTML = "<div class='droppedFrame'></div><iframe src='"+iUrl1+"' title='description' style='width: 100vw; height: 100vh;'></iframe>";
          theDroppedElt.innerHTML = "<iframe srcdoc='<pre>" + iUrl1 + "</pre>' title='description' style='width: 100vw; height: 100vh;'></iframe>";
         
 
 
               
       
     }
            }
            });  
         
            }
            });
       
           }
           else {
             alert("This functionality is not available for selected type");
 
                 myWidget.getData();
 
           }
           
           
           
           
                },
        enter: function() {
                    console.log("Enter");
        //                 droppableContainer.classList.add("drag-over");
           
                },
                over: function() {  
                    theDropElt.style.border = "thick dotted #78befa";
         
                },
                leave: function() {
                     console.log("leave");
        //                 droppableContainer.classList.remove("drag-over");
                }
            }) ;
            }
     
 
        }
   
        widget.myWidget = myWidget;
    widget.addEvent('onRefresh',  myWidget.onRefresh);
        return myWidget;
    });
