

        $(document).ready(function() {
        
           
             myFunction('personnel');
           

            $(document).on('click', '.btn_edit', function(event) {
                var id = $(this).data('id');

                $.ajax({
                    type: 'POST',
                    url: 'libs/php/getPersonnelByID.php',
                    data: {
                        id: id
                    },
                    dataType: 'json',
                    success: function(response) {

                        //console.log(response.data.personnel[0]);
                        $('#per_id').val(response.data.personnel[0].id);
                        $('#first_name').val(response.data.personnel[0].firstName);
                        $('#last_name').val(response.data.personnel[0].lastName);
                        $('#exampleInputEmail1').val(response.data.personnel[0].email);
                        getallDepartment(response.data.personnel[0].departmentID);
                      //  $('#department_id').val(response.data.personnel[0].departmentID).trigger('change');
                        $('#job_title').val(response.data.personnel[0].jobTitle);
                        
                       

                    }
                });

            });

            $(document).on('click', '.btn_dept_edit', function(event) {
                var id = $(this).data('id');
               
                $.ajax({
                    type: 'POST',
                    url: 'libs/php/getDepartmentByID.php',
                    data: {
                        id: id
                    },
                    dataType: 'json',
                    success: function(response) {
                       
                        console.log(response.data);
                        $('#dep_id').val(response.data[0].id);
                        $('#dep_name').val(response.data[0].name);
                       
                      //  $('#location_id').val(response.data[0].locationID).trigger('change');
                      getallLocation(response.data[0].locationID);
                    }
                });

            });

            $(document).on('click', '.btn_location_edit', function(event) {
                var id = $(this).data('id');

                $.ajax({
                    type: 'POST',
                    url: 'libs/php/getLocationByID.php',
                    data: {
                        id: id
                    },
                    dataType: 'json',
                    success: function(response) {

                        //  console.log(response.data);
                        $('#loc_id').val(response.data[0].id);
                        $('#loc_name').val(response.data[0].name);

                    }
                });

            });

            $("#uploadForm_location").on('submit', function(e) {
                e.preventDefault();

                $.ajax({
                    type: 'POST',
                    url: "libs/php/insertLocation.php",
                    data: new FormData(this),
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(data) {

                       

                        swal("success", "Records Saved / update", "success");
                        if (data.status.code == '200') {
                            
                            setTimeout(function(){
                            
                                $("#uploadForm_location")[0].reset();
                                $('#location_modal').modal('hide');
                                myFunction('location');
                               
                             
                              
                            },1000);

                        }
                    },
                    error: function(data) {
                        alert("not Save!");
                    }
                });

            });


            $("#uploadForm_department").on('submit', function(e) {
                e.preventDefault();
                $.ajax({
                    type: 'POST',
                    url: "libs/php/insertDepartment.php",
                    data: new FormData(this),
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(data) {

                        swal("success", "Records Saved / update", "success");
                        if (data.status.code == '200') {
                            
                            setTimeout(function(){
                            
                                $("#uploadForm_department")[0].reset();
                                $('#department_modal').modal('hide');
                                myFunction('department');
                               
                             
                              
                            },1000);
                        }


                    },
                    error: function(data) {
                        swal("Cancelled", "Records not Saved / updated", "error");
                    }
                });

            });


            $("#uploadForm_personnel").on('submit', function(e) {
                e.preventDefault();

                $.ajax({
                    type: 'POST',
                    url: "libs/php/inserpersonnel.php",
                    data: new FormData(this),
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(data) {

                        swal("success", "Records Saved / update", "success");
                        if (data.status.code == '200') {
                            
                            setTimeout(function(){
                            
                                $("#uploadForm_personnel")[0].reset();
                                $('#exampleModal').modal('hide');
                                myFunction('personnel');
                               
                             
                              
                            },1000);
                        }

                    },
                    error: function(data) {
                        alert("not Save!");
                    }
                });

            });

          


          



        });

       

        function myFunction(ele, table_name) {
          
       
            $('#perosnnel_act').removeClass('active');
            $('#department_act').removeClass('active');
            $('#location_act').removeClass('active');
            
            
            
             $('#personnel_div').removeClass('d-inline').addClass('d-none');
             $('#department_div').removeClass('d-inline').addClass('d-none');
             $('#location_div').removeClass('d-inline').addClass('d-none');


             $('.myInput_firstname').removeClass('d-inline').addClass('d-none');
             $('.myInput_last_name').removeClass('d-inline').addClass('d-none');
             $('.myInput_dept_name').removeClass('d-inline').addClass('d-none');
             $('.myInput_loc_name').removeClass('d-inline').addClass('d-none');
          
             $('#reset_personnel').removeClass('d-inline').addClass('d-none');
             $('#reset_department').removeClass('d-inline').addClass('d-none');
             $('#reset_location').removeClass('d-inline').addClass('d-none');


             $('#table_name').val('');
             
            if (ele == 'personnel') {

                $('#perosnnel_act').addClass('active');

                $('#personnel_div').removeClass('d-none').addClass('d-inline');

                $('.myInput_firstname').removeClass('d-none').addClass('d-inline');
                $('.myInput_last_name').removeClass('d-none').addClass('d-inline');
                $('.myInput_dept_name').removeClass('d-none').addClass('d-inline');
                $('.myInput_loc_name').removeClass('d-none').addClass('d-inline');

                $('#reset_personnel').removeClass('d-none').addClass('d-inline');
                $('#table_name').val('personnel');
           
                  html = "";
                $.ajax({
                    url: "libs/php/getAll.php",
                    dataType: 'json',
                    success: function(data) {
                        const data_values = data.data;
                        var count = 1;
                        for (var i = 0; i < data.data.length; i++) {
                            //console.log(data_values[i].lastName);
                            html += "<tr><td>"+ data_values[i].lastName +" , " + data_values[i].firstName + "<td>" + (data_values[i].department ? data_values[i].department : '-') + "</td><td>" +(data_values[i].location ? data_values[i].location : '-') + "</td><td>" + "<button type='button' class='btn btn-success btn_edit' data-id=" + data_values[i].id + " data-toggle='modal' data-target='#exampleModal'>Edit</button><button type='button' class='btn btn-danger btn_delete name_id_" + data_values[i].id + "' data-name='"+data_values[i].firstName+"'  onclick='myConfirm_disabled(" + data_values[i].id + ")' type='button'  data-id=" + data_values[i].id + " >Delete</button>" + "</td></tr>";
    
    
                        }
    
                        $('#personnel_table').html(html);
                      
                html_department_option = "";
                 $.ajax({
                url: "libs/php/getAllDepartments.php",
                dataType: 'json',
                success: function(data) {
                    console.log('data')
                    const data_values_department = data.data;
                    var count_dept = 1;
                    html_department_option +="<option value=''>Select Department</option>";
                    for (var d = 0; d < data.data.length; d++) {
                        //console.log(data_values_department[d].locationID);
                      
                        html_department_option += "<option value='" + data_values_department[d].dep_id + "'>" + data_values_department[d].dep_name + "</option>";

                    }
                    $('#myInput_dept_name').html(html_department_option);
                    
                }
            });
            html_location_option='';
            $.ajax({
                url: "libs/php/getAllLocations.php",
                dataType: 'json',
                success: function(data) {
                    const data_values_location = data.data;
                    var count_loc = 1;
                    html_location_option +="<option value=''>Select Location</option>";
                    for (var l = 0; l < data.data.length; l++) {
                       
                     
                        html_location_option += "<option value='" + data_values_location[l].id + "'>" + data_values_location[l].name + "</option>";

                    }

                   
                    $('#myInput_loc_name').html(html_location_option);
                   
                }
            });



                        
                    }
                });
                
            }

            if (ele == 'department') {

                $('#department_act').addClass('active');
                $('#department_div').removeClass('d-none').addClass('d-inline');
              
                $('.myInput_firstname').removeClass('d-none').addClass('d-inline');
                $('.myInput_loc_name').removeClass('d-none').addClass('d-inline');

               
                $('#reset_department').removeClass('d-none').addClass('d-inline');
               
                $('#table_name').val('department');
                
                html_department = "";
                
                $.ajax({
                    url: "libs/php/getAllDepartments.php",
                    dataType: 'json',
                    success: function(data) {
                        console.log('data')
                        const data_values_department = data.data;
                        var count_dept = 1;
                        for (var d = 0; d < data.data.length; d++) {
                            //console.log(data_values_department[d].locationID);
                            html_department += "<tr><td>" + data_values_department[d].dep_name + "</td><td>" + (data_values_department[d].loc_name ?data_values_department[d].loc_name:'-' ) + "</td><td>" + "<button type='button' class='btn btn-success btn_dept_edit' data-id=" + data_values_department[d].dep_id + " data-toggle='modal' data-target='#department_modal'>Edit</button><button type='button' class='btn btn-danger btn_delete departement_id"+data_values_department[d].dep_id +"' data-name="+data_values_department[d].dep_name+" onclick='myConfirm_dep(" + data_values_department[d].dep_id + ")' type='button'  data-id=" + data_values_department[d].dep_id + " >Delete</button>" + "</td></tr>";
                           
    
                        }
    
                        $('#department_table_data').html(html_department);
            
                        
                      
    
                    }
                });

            }

            if (ele == 'location') {


                $('#location_act').addClass('active');
                $('#location_div').removeClass('d-none').addClass('d-inline');
                $('.myInput_firstname').removeClass('d-none').addClass('d-inline');
                $('#table_name').val('location');
                

                $('#reset_location').removeClass('d-none').addClass('d-inline');
                  html_location = "";
           

            $.ajax({
                url: "libs/php/getAllLocations.php",
                dataType: 'json',
                success: function(data) {
                    const data_values_location = data.data;
                    var count_loc = 1;
                    for (var l = 0; l < data.data.length; l++) {
                        //console.log(data_values_location[l]);
                        html_location += "<tr><td>" + data_values_location[l].name + "</td><td><button type='button' class='btn btn-success btn_location_edit' data-id=" + data_values_location[l].id + " data-toggle='modal' data-target='#location_modal'>Edit</button><button type='button' class='btn btn-danger btn_delete location_id"+ data_values_location[l].id +"' data-name="+data_values_location[l].name+" onclick='myConfirm_loc(" + data_values_location[l].id + ")' type='button'  data-id=" + data_values_location[l].id + " >Delete</button>" + "</td></tr>";

                    }

                    $('#locaton_table_data').html(html_location);
                  

                }
            });
            }

        }
        
       
        
function myConfirm(e){
    var id = e;
         
         
         
        var first_name =  $('.name_id_'+e).attr('data-name');
         
         
    swal({
        title: "Are you sure?",
        text: 'Do you want to delete the record for '+first_name,
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false,
            customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-secondary',
        }
      },
      function(isConfirm){
 
        if (isConfirm) {
             
            $.ajax({

                type: "POST",
        
                url: 'libs/php/deletePersonnelByID.php',
                       data: {
                         id: id
                       },
        
                dataType: "json",
        
                success:function(response){

                    if (response.status.code == '200') {

                        swal('Delete!', "Record Deleted");

                        setTimeout(function(){
                            
                            $("#uploadForm_department")[0].reset();
                               
                                myFunction('personnel');

                           

                        },1000);

                    }
                  
                }
        
            });

        } else {
          swal("Cancelled", "Task Not Aassigned", "error");
        }
    });

}
function myConfirm_loc(e){
    var id = e;
    
       var location_name =  $('.location_id'+e).attr('data-name');
         
    swal({
        title: "Are you sure?",
        text: 'Do you want to delete the record for '+location_name,
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false,
            customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-secondary',
        }
      },
      function(isConfirm){
 
        if (isConfirm) {
             
            $.ajax({

                type: "POST",
        
                url: 'libs/php/deleteLocationByID.php',
                       data: {
                         id: id
                       },
        
                dataType: "json",
        
                success:function(response){

                    if (response.status.description == 'success') {
                        swal('Delete!', "Roecord Deleted");

                        setTimeout(function(){
                            
                            $("#uploadForm_location")[0].reset();
                               
                                myFunction('location');

                           

                        },1000);

                    }

                    else if(response.status.description == 'Location Already Used in Department table')
                    {
                     swal("Cancelled", response.status.description , "error");
 
                    }
                  
                }
        
            });

        } else {
          swal("Cancelled", "Task Not Aassigned", "error");
        }
    });

}

      
function myConfirm_dep(e){
    var id = e;
    
       var department_name =  $('.departement_id'+e).attr('data-name');
         
    swal({
        title: "Are you sure?",
        text: 'Do you want to delete the record for '+department_name,
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false,
            customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-secondary',
        }
      },
      function(isConfirm){
 
        if (isConfirm) {
             
            $.ajax({

                type: "POST",
        
                url: 'libs/php/deleteDepartmentByID.php',
                       data: {
                         id: id
                       },
        
                dataType: "json",
        
                success:function(response){

                    if (response.status.description == 'success') {

                        swal('Delete!', "Roecord Deleted");

                        setTimeout(function(){
                            
                            $("#uploadForm_personnel")[0].reset();
                               
                                myFunction('department');

                           

                        },1000);



                    }

                   else if(response.status.description == 'Department Already Used in Personnel table')
                   {
                    swal("Cancelled", response.status.description , "error");

                   }
                  
                }
        
            });

        } else {
          swal("Cancelled", "Task Not Aassigned", "error");
        }
    });

}


        function mymodal_relod(ele) {

            $("#uploadForm_personnel")[0].reset();
            $('#per_id').val('');
            $("#uploadForm_department")[0].reset();
            $('#dep_id').val('');
            $("#uploadForm_location")[0].reset();
            $('#loc_id').val('');
            if(ele == 'personnel'){
                getallDepartment();
               
            }
           else if(ele == 'department'){
                
                getallLocation();
            }

        }



        $(document).on('click','#filter',function(){

            var  filter_array={};

            var first_name = '';
        
            var last_name = '';
        
            var dept_name = '';
        
            var location_name = '';
           
            var table_name ='';
            
           
            if($('#table_name').val() !=""){
                
                table_name = $('#table_name').val();
        
                filter_array.table_name = table_name.trim();
        
            }else{
        
                filter_array.table_name = '';
        
            }
          
        
            // if($('#myInput_firstname').val() !=""){
                
            //     first_name = $('#myInput_firstname').val();
        
            //     filter_array.first_name = first_name.trim();
        
            // }else{
        
            //     filter_array.first_name = '';
        
            // }
        
            if($('#myInput_last_name').val() !=""){
                
                last_name = $('#myInput_last_name').val();
        
                //filter
                filter_array.last_name = last_name.trim();
            
            }else{
            
                filter_array.last_name = '';
        
            }
        
            if($('#myInput_dept_name').val() !=""){
                
                dept_name = $('#myInput_dept_name').val();
        
                filter_array.dept_name = dept_name;
            
            }else{
            
                filter_array.dept_name = '';
        
            }
        
        
            if($('#myInput_loc_name').val() !=""){
                

                
                location_name = $('#myInput_loc_name').val();
        
                filter_array.location_name = location_name;
            
            }else{
            
                filter_array.location_name = '';
        
            }
        
            const u = new URLSearchParams(filter_array).toString();

            $.ajax({
                type: 'GET',
                url: 'libs/php/getsearchData.php?'+u,
                dataType: 'json',
                success: function(data) {
                   
                   if(table_name=='personnel')
                   {
                    var html='';
                    // console.log(data);
                    for (var i = 0; i < data.data.personnel.length; i++) {
                     //console.log(data_values[i].lastName);
                     html += "<tr><td>" + data.data.personnel[i].lastName + " , " + data.data.personnel[i].firstName + "</td><td>" + data.data.personnel[i].dept_name + "</td><td>" + data.data.personnel[i].loc_name + "</td><td>" + "<button type='button' class='btn btn-success btn_edit' data-id=" + data.data.personnel[i].id + " data-toggle='modal' data-target='#exampleModal'>Edit</button><button type='button' class='btn btn-danger btn_delete name_id_" + data.data.personnel[i].id + "' data-name='"+data.data.personnel[i].firstName+"' onclick='myConfirm_disabled(" + data.data.personnel[i].id + ")' type='button'  data-id=" + data.data.personnel[i].id + " >Delete</button> " + "</td></tr>";
 
 
                 }
 
                 $('#personnel_table').html(html);
                 }
                
                 else if (table_name=='department')
                 {
                    
                    
                    var html_department='';
                    for (var i = 0; i < data.data.personnel.length; i++) {
                       
                       

                    html_department += "<tr><td>" + data.data.personnel[i].name + "</td><td>" + data.data.personnel[i].loc_name + "</td><td>" + "<button type='button' class='btn btn-success btn_dept_edit' data-id=" + data.data.personnel[i].id + " data-toggle='modal' data-target='#department_modal'>Edit</button><button type='button' class='btn btn-danger btn_delete' onclick='myConfirm_dep(" + data.data.personnel[i].id + ")' type='button'  data-id=" + data.data.personnel[i].id + " >Delete</button>" + "</td></tr>";

                    }
                  

                    $('#department_table_data').html(html_department);
                   
                 }
                 else if(table_name =='location')
                 {
                    var html_location='';
                    for (var l = 0; l < data.data.personnel.length; l++) {
                        //console.log(data_values_location[l]);
                        html_location += "<tr><td>" + data.data.personnel[l].name + "</td><td><button type='button' class='btn btn-success btn_location_edit' data-id=" + data.data.personnel[l].id + " data-toggle='modal' data-target='#location_modal'>Edit</button><button type='button' class='btn btn-danger btn_delete' onclick='myConfirm_loc(" + data.data.personnel[l].id + ")' type='button'  data-id=" + data.data.personnel[l].id + " >Delete</button>" + "</td></tr>";

                    }

                    $('#locaton_table_data').html(html_location);
                  
                 }

                   }

                 
                   
            });

            
           
        
           
        })

        function getallDepartment(id=null)
        {

            html_department_option = "";
            $.ajax({
                url: "libs/php/getAllDepartments.php",
                dataType: 'json',
                success: function(data) {
                    console.log('data')
                    const data_values_department = data.data;
                    var count_dept = 1;
                    for (var d = 0; d < data.data.length; d++) {
                        //console.log(data_values_department[d].locationID);
                      
                        html_department_option += "<option value='" + data_values_department[d].dep_id + "'>" + data_values_department[d].dep_name + "</option>";

                    }
                    $('#department_id').html(html_department_option);
                    if(id)
                    {
                    $('#department_id').val(id).trigger('change');
                    }

                }
            });


        }

        function getallLocation(id=null)
        {

            html_location_option = "";

            $.ajax({
                url: "libs/php/getAllLocations.php",
                dataType: 'json',
                success: function(data) {
                    const data_values_location = data.data;
                    var count_loc = 1;
                    for (var l = 0; l < data.data.length; l++) {
                        //console.log(data_values_location[l]);
                     
                        html_location_option += "<option value='" + data_values_location[l].id + "'>" + data_values_location[l].name + "</option>";

                    }

                   
                    $('#location_id').html(html_location_option);
                    if(id)
                    {
                    $('#location_id').val(id).trigger('change');
                    }
                }
            });

        }
       function resetttt(ele){
            $('#myInput_firstname').val("");
            $('#myInput_last_name').val("");
            $("option:selected").prop("selected", false);

           

            if(ele == 'personnel'){
                myFunction('personnel');
            }
           
           else if(ele == 'department')
           {
            myFunction('department');

           }
           else if(ele == 'location')
           {
            myFunction('location');
           }
           
        }