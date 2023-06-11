var orderId = parseInt(localStorage.getItem('orderId'));

$(function () {
    // Json data by API call for order table
    $.get(orderDetailsApiUrl, function (response) {
        if (response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function(index, order) {
                if(order.order_id === orderId){
                totalCost += parseFloat(order.total_price);
                table += '<tr>' +
                    '<td>'+ order.product_name +'</td>'+
                    '<td>'+ order.quantity +'</td>'+
                    '<td>'+ order.total_price +'</td></tr>';
                }
            });
            table += '<tr><td colspan="2" style="text-align: end"><b>Total</b></td><td><b>'+ totalCost.toFixed(2) +' Rs</b></td></tr>';
            $("table").find('tbody').empty().html(table);
        }
    });
});