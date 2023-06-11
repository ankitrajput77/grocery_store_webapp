var productModal = $("#productModal");
    $(function () {

        //JSON data by API call
        $.get(productListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, product) {
                    table += '<tr data-id="'+ product.product_id +'" data-name="'+ product.name +'" data-unit="'+ product.uom_id +'" data-price="'+ product.price_per_unit +'">' +
                        
                        '<td>'+ product.name +'</td>'+
                        '<td>'+ product.uom_name +'</td>'+
                        '<td>'+ product.price_per_unit +'</td>'+
                        '<td><span class="btn btn-xs btn-danger delete-product">Delete</span> <span class="btn btn-xs btn-primary edit-product">Edit</span></td></tr>';
                });
                $("table").find('tbody').empty().html(table);
            }
        });
    });

        $(document).on("click", ".edit-product", function () {
        var productId = $(this).closest("tr").data("id");
        var productName = $(this).closest("tr").data("name");
        var productUnit = $(this).closest("tr").data("unit");
        var productPrice = $(this).closest("tr").data("price");
    
        // Populate the form fields with the retrieved data
        $("#id").val(productId);
        $("#name").val(productName);
        $("#uoms").val(productUnit);
        $("#price").val(productPrice);
    
        // Open the modal using its ID
        $("#productModal").modal("show");
        });


    // Save Product
    $("#saveProduct").on("click", function () {
        var data = $("#productForm").serializeArray();
        var requestPayload = {
            product_id: null,
            product_name: null,
            uom_id: null,
            price_per_unit: null
        };
    
        for (var i=0; i < data.length; ++i) {
            var element = data[i];
            switch(element.name) {
                case 'id':
                    requestPayload.product_id = element.value;
                    break;
                case 'name':
                    requestPayload.product_name = element.value;
                    break;
                case 'uoms':
                    requestPayload.uom_id = element.value;
                    break;
                case 'price':
                    requestPayload.price_per_unit = element.value;
                    break;
            }
        }
        if (requestPayload.product_id) {
            // If product_id exists, it means we have an existing product and we want to update it
            callApi("POST", productUpdateApiUrl, {
                'data': JSON.stringify(requestPayload)
            });
        } else {
            // If product_id is null, it means it's a new product and we want to save it
            callApi("POST", productSaveApiUrl, {
                'data': JSON.stringify(requestPayload)
            });
        }
    });
    
    $(document).on("click", ".delete-product", function (){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete "+ tr.data('name') +" item?");
        if (isDelete) {
            callApi("POST", productDeleteApiUrl, data);
        }
    });

    productModal.on('hide.bs.modal', function(){
        $("#id").val('0');
        $("#name, #unit, #price").val('');
        productModal.find('.modal-title').text('Add New Product');
    });


    productModal.on('show.bs.modal', function(){
        //JSON data by API call
        $.get(uomListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, uom) {
                    options += '<option value="'+ uom.uom_id +'">'+ uom.uom_name +'</option>';
                });
                $("#uoms").empty().html(options);
            }
        });
    });


    